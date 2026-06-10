# Průvodce změnou cen v kalkulačkách

Všechny kalkulačky nyní mají **nezávislé ceny pro CZ a EN verze**. Můžeš měnit ceny jednotlivě pro každý jazyk.

## 📍 Kde najdeš ceny

### 1. Voice Agent Calculator
**Soubor:** `src/components/VoiceAgentCalculator.tsx`

**Jednorázové ceny funkcí (řádky 40-58):**
```typescript
{
  id: 'base',
  priceCzk: 25400,  // Cena v CZK
  priceUsd: 1100,   // Cena v USD
  ...
},
{
  id: 'booking',
  priceCzk: 36900,  // Cena v CZK
  priceUsd: 1600,   // Cena v USD
  ...
}
```

**Další konstanty (řádky 12-16):**
- `MINUTA_CENA_CZK = 5` - cena za minutu hovoru v CZK
- `MINUTA_CENA_USD = 0.22` - cena za minutu hovoru v USD
- `TRANSFER_LINE_CZK = 1940` - cena za přepojení v CZK
- `TRANSFER_LINE_USD = 85` - cena za přepojení v USD
- `PROCENT_PAUŠÁL = 0.15` - 15% paušál (platí pro obě měny)

---

### 2. Internal Agent Calculator
**Soubor:** `src/components/InternalAgentCalculator.tsx`

**Jednorázové ceny setup (řádky 7-21):**
```typescript
const CENA_ANALYZA_SETUP_CZK = 15000;
const CENA_AGENT_SETUP_CZK = 20000;
const CENA_INTEGRACE_SETUP_CZK = 10000;
const CENA_KOLEKCE_SETUP_CZK = 3000;
const CENA_SKILL_SETUP_CZK = 5000;
const CENA_SSO_SETUP_CZK = 8000;
const CENA_ONPREM_SETUP_CZK = 25000;
const CENA_AUDIT_SETUP_CZK = 15000;

const CENA_ANALYZA_SETUP_USD = 650;
const CENA_AGENT_SETUP_USD = 870;
const CENA_INTEGRACE_SETUP_USD = 435;
const CENA_KOLEKCE_SETUP_USD = 130;
const CENA_SKILL_SETUP_USD = 220;
const CENA_SSO_SETUP_USD = 350;
const CENA_ONPREM_SETUP_USD = 1090;
const CENA_AUDIT_SETUP_USD = 650;
```

**Měsíční ceny (řádky 23-37):**
```typescript
const CENA_AGENT_MES_CZK = 2000;
const CENA_INTEGRACE_MES_CZK = 800;
const CENA_KOLEKCE_MES_CZK = 200;
const CENA_SKILL_MES_CZK = 400;
const CENA_SSO_MES_CZK = 1500;
const CENA_ONPREM_MES_CZK = 4000;
const CENA_MONITORING_MES_CZK = 2000;
const CENA_PLATFORM_BASE_MES_CZK = 3000;

const CENA_AGENT_MES_USD = 87;
const CENA_INTEGRACE_MES_USD = 35;
const CENA_KOLEKCE_MES_USD = 9;
const CENA_SKILL_MES_USD = 17;
const CENA_SSO_MES_USD = 65;
const CENA_ONPREM_MES_USD = 174;
const CENA_MONITORING_MES_USD = 87;
const CENA_PLATFORM_BASE_MES_USD = 130;
```

---

### 3. Email Automation Calculator
**Soubor:** `src/components/EmailAutomationCalculator.tsx`

**Jednorázové ceny setup (řádky 5-17):**
```typescript
const CENA_ANALYZA_SETUP_CZK = 5000;
const CENA_KAMPAN_SETUP_CZK = 5000;
const CENA_SABLONA_SETUP_CZK = 2000;
const CENA_MODUL_SETUP_CZK = 1000;
const CENA_AI_SETUP_CZK = 3000;
const CENA_CRM_SETUP_CZK = 5000;

const CENA_ANALYZA_SETUP_USD = 220;
const CENA_KAMPAN_SETUP_USD = 220;
const CENA_SABLONA_SETUP_USD = 87;
const CENA_MODUL_SETUP_USD = 43;
const CENA_AI_SETUP_USD = 130;
const CENA_CRM_SETUP_USD = 220;
```

**Měsíční ceny (řádky 19-31):**
```typescript
const CENA_KAMPAN_MES_CZK = 1000;
const CENA_SABLONA_MES_CZK = 500;
const CENA_MODUL_MES_CZK = 300;
const CENA_AI_MES_CZK = 800;
const CENA_CRM_MES_CZK = 1500;
const CENA_PLATFORM_BASE_MES_CZK = 2000;

const CENA_KAMPAN_MES_USD = 43;
const CENA_SABLONA_MES_USD = 22;
const CENA_MODUL_MES_USD = 13;
const CENA_AI_MES_USD = 35;
const CENA_CRM_MES_USD = 65;
const CENA_PLATFORM_BASE_MES_USD = 87;
```

---

## 🎯 Jak změnit ceny

1. **Otevři příslušný soubor** v editoru
2. **Najdi konstantu**, kterou chceš změnit (použij Ctrl+F)
3. **Změň číslo** na novou cenu
4. **Ulož soubor**
5. **Zkontroluj výsledek** v aplikaci - ceny se automaticky přepočítají

### Příklad změny:
```typescript
// PŘED
const CENA_AGENT_SETUP_CZK = 20000;
const CENA_AGENT_SETUP_USD = 870;

// PO změně (zvýšení cen)
const CENA_AGENT_SETUP_CZK = 25000;
const CENA_AGENT_SETUP_USD = 1100;
```

---

## ⚠️ Důležité poznámky

- **Každá kalkulačka má vlastní konstanty** - pokud chceš změnit cenu ve více kalkulačkách, musíš upravit všechny soubory
- **CZK a USD jsou nezávislé** - můžeš nastavit jakékoliv ceny, nemusí odpovídat přesnému kurzu
- **Všechny ceny jsou bez DPH**
- **Po změně běží vše automaticky** - žádné další úpravy nejsou potřeba
- **Build aplikace** po změnách: `npm run build`

---

## 📝 Tipy

- Udržuj ceny v rozumném poměru mezi CZK a USD (i když nemusí být přesný kurz)
- Pro rychlé hromadné změny použij "Find & Replace" v editoru
- Vždy zkontroluj výsledek v aplikaci po změnách
