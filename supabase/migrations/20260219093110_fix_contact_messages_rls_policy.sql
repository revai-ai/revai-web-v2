/*
  # Fix RLS policy: remove always-true WITH CHECK on contact_messages

  ## Problem
  The existing INSERT policy uses `WITH CHECK (true)`, which effectively bypasses
  row-level security and allows anyone to insert any data without restriction.

  ## Changes
  - Drop the existing `Allow anonymous contact form submissions` policy
  - Replace it with a policy that validates all required fields:
    - `name` must be non-empty
    - `email` must match a basic valid email format
    - `service` must be non-empty
    - `message` must be non-empty
  - This prevents spam/garbage insertions while still allowing legitimate contact form submissions

  ## Security
  - anon and authenticated roles can only insert rows where required fields are valid
  - Optional fields (phone, company) remain unrestricted as they are truly optional
*/

DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_messages;

CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL
    AND length(trim(name)) > 0
    AND email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'
    AND service IS NOT NULL
    AND length(trim(service)) > 0
    AND message IS NOT NULL
    AND length(trim(message)) > 0
  );
