# 03 — Conversion Architecture (REVAI redesign)

> Planning document. Defines CTA strategy, the three conversion flows, the Meta/analytics event taxonomy, and the **manual** demo-fulfillment process for phase 1.
> Tracking is *designed here, implemented later* (Phase 6), always consent-gated. Confidence tags throughout.

---

## Conversion priorities (from the brief)

Three primary conversions, ranked by recommended emphasis (B5 — confirm):

1. **Website-URL demo request** — *the differentiator.* "Paste your current site → get a tailored demo in a few hours." Manual fulfillment in phase 1.
2. **Book a consultation** — existing Google Calendar flow.
3. **Inquiry form** — existing contact form (→ Resend).

*(confidence: medium on ordering — B5 is a business call; the architecture below supports any ordering.)*

---

## 1. Primary CTA strategy

| Aspect | Recommendation | Confidence |
|---|---|---|
| Hero primary CTA | **"Get a free demo of your site"** → opens/links the URL-demo flow (`/demo` or homepage band #2). | medium |
| Persistent CTA | Navbar keeps a single high-contrast CTA. Default: **demo request** (swap the current "Free consultation" if B5 confirms demo as #1), with consultation one click away. | medium |
| One primary per view | Avoid competing equal-weight CTAs in a section; one dominant action, secondary as text/ghost button. | high |
| Mobile | Primary CTA reachable without the heavy pinned story; sticky bottom bar candidate (test for intrusiveness). | medium |

**Critical note (not flattery):** the current site leads every CTA with the Google Calendar consultation. If the demo is the new differentiator, **the calendar CTA must step back to secondary** or the headline conversion gets buried. *(confidence: high)*

---

## 2. Secondary CTA strategy

- **Book a consultation** — present on hero (ghost/secondary), service pages, pricing, contact, and as the final scrollytelling CTA. Reuses `CALENDAR_URL`.
- **Inquiry form** — primary entry on `/kontakt`; also reachable from service pages.
- **Pricing CTA** — on `/cenik`, routes to demo or consultation.
- **Soft conversions** — phone/email copy-to-clipboard (already built on Contact), tracked as micro-events.

*(confidence: high — these already exist; the work is consistent placement + tracking, not new mechanisms.)*

---

## 3. Website-URL demo request flow (NEW — headline conversion)

**Phase 1 = manual fulfillment.** No AI generation yet; a human builds/sends the demo.

### User-facing flow
```
[Homepage band / /demo page]
  → Field: current website URL (required, validated)
  → Field: name + email (required), company (optional), notes (optional)
  → Consent checkbox (data processing) + honeypot (anti-spam)
  → Submit
  → Success state: "We'll send your demo within a few hours (business hours)."
     + optional: offer to also book a consultation.
```

### Technical flow (proposed)
```
Client form  →  POST /.netlify/functions/demo-request
                  ├─ validate (URL format, email regex, required, honeypot)
                  ├─ spam/rate guard (basic: honeypot + simple rate limit)
                  ├─ notify team  → Resend email to a monitored inbox (subject: "DEMO REQUEST — {url}")
                  ├─ (optional) persist  → lead store (Supabase? — DECIDE in spike, see 04 / B9)
                  └─ return success
```

**Design decisions:**
| Decision | Recommendation | Confidence |
|---|---|---|
| Reuse `contact.mts` pattern | Yes — copy its structure (server-side env, honeypot, validation, Resend). Don't mutate the original. | high |
| Separate function | Yes — `demo-request.mts`, distinct subject/inbox so demo requests aren't lost among contacts. | high |
| Storage in phase 1 | **Default: email-only.** Add Supabase/lead store only if volume/reporting demands it (B9, spike). | medium |
| URL validation | Validate format + normalize; do **not** auto-fetch/scrape the URL server-side in phase 1 (SSRF/abuse risk, and it's manual anyway). | high |
| Expectation setting | "Within a few hours, business hours" — never promise instant; it's manual. | high |
| SLA tracking | Manual log (see fulfillment process below) until automation phase. | medium |

**Anti-abuse (important — this is a public form that triggers human work):** honeypot + per-IP/email rate limit + required consent. Consider lightweight CAPTCHA only if spam appears (don't pre-optimize). *(confidence: medium)*

---

## 4. Inquiry form flow (EXISTING — keep, harden)

```
/kontakt form  →  POST /.netlify/functions/contact  →  Resend → info@ inbox
```
Keep as-is functionally. Improvements (Phase 4, not pass 1):
- Inline per-field validation + `aria-live` status region (audit R14).
- Reconcile AMAI→REVAI copy.
- Tracked events: inquiry-form **start** (first field focus) + **submit success**.

*(confidence: high — small, well-scoped.)*

---

## 5. Booking flow (EXISTING — keep)

```
"Book consultation" CTA  →  Google Calendar appointment schedule (CALENDAR_URL, new tab)
```
- Keep `CALENDAR_URL` as the single source.
- **Tracking caveat:** the booking *completes off-site* on Google Calendar — we can only reliably track the **outbound click**, not the confirmed booking, unless Google sends a confirmation we can reconcile. For ad optimization this matters (see offline-conversion note in §7). *(confidence: high)*

---

## 6. Event taxonomy for Meta / analytics

> **Design only. Implemented in Phase 6, consent-gated.** Names are proposals; finalize in B8.
> Each event fires to GA4 (engagement) and, where it's a real conversion, to Meta Pixel + Conversions API (server-side, deduped).

| Event name | Trigger | GA4 | Meta Pixel | Meta CAPI | Type | Confidence |
|---|---|---|---|---|---|---|
| `consultation_click` | Click any "Book consultation" CTA (outbound to Calendar) | ✅ | ✅ (Lead/Custom) | ✅ | primary | high |
| `inquiry_start` | First focus/typing in contact form | ✅ | optional | — | micro | medium |
| `inquiry_submit` | Contact function returns success | ✅ | ✅ (Lead) | ✅ | primary | high |
| `demo_request_submit` | demo-request function returns success | ✅ | ✅ (Lead/SubmitApplication) | ✅ | **primary (hero)** | high |
| `pricing_cta_click` | Click CTA on `/cenik` | ✅ | optional | — | micro | medium |
| `demo_section_engage` | Story/demo section reaches engagement threshold (e.g. scroll depth or N seconds visible) | ✅ | — | — | micro | medium |
| `language_switch` | CZ↔EN toggle | ✅ | — | — | diagnostic | low |
| `contact_copy` | Copy phone/email click | ✅ | — | — | micro | low |

**Rules (confidence: high):**
- **No event fires before consent.** Pre-consent: zero non-essential tags.
- **CAPI events deduped** with Pixel via shared `event_id`.
- **Distinguish micro vs. primary** so ad optimization targets real leads (demo_request_submit, inquiry_submit, consultation_click), not scroll noise.
- Keep names stable and documented; renaming events post-launch breaks reporting continuity.

---

## 7. Manual fulfillment process for demo requests (phase 1)

The demo is **human-built in hours**. The system's job is to make sure no request is dropped and turnaround is measurable.

```
1. CAPTURE   demo-request function → email to monitored inbox (+ optional lead store)
2. ALERT     inbox notification (and/or chat ping) so the team sees it fast
3. TRIAGE    quick check: is the URL real / in scope? spam? language (CZ/EN)?
4. BUILD     team manually creates the tailored demo (manual in phase 1)
5. DELIVER   reply to requester with the demo + a consultation CTA
6. LOG       record: received_at, delivered_at, outcome (a sheet or the lead store)
7. MEASURE   turnaround time vs. the "few hours" promise; conversion to consultation
```

| Concern | Phase-1 answer | Confidence |
|---|---|---|
| Where do requests land? | A monitored shared inbox (Resend → info@/sales@). | high |
| How is SLA tracked? | Manual log (sheet or lead store) of received→delivered. | medium |
| Who owns it? | Assign an owner + backup (open — business decision). | low |
| Offline conversion to ads | When a demo→consultation→deal closes, **upload as an offline/CAPI conversion** so Meta can optimize toward real outcomes, not just form submits. | medium |
| Automation later | The capture/alert/log structure is the seam where automation (auto-demo generation) plugs in later — design the function to make that swap easy. | medium |

**Honest constraint:** a manual "demo in a few hours" promise is an **operational commitment, not a software feature.** The architecture can guarantee *capture and measurement*; it cannot guarantee *turnaround* — that depends on staffing. The plan should flag this as a business-process risk, not pretend code solves it. *(confidence: high)*
