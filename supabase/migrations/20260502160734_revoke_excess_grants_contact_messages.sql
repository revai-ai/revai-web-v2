/*
  # Revoke excess privileges on contact_messages

  ## Problem
  The `anon` and `authenticated` roles had full table grants (SELECT, UPDATE, DELETE,
  TRUNCATE, REFERENCES, TRIGGER) on `contact_messages`. This caused the table to appear
  in the public GraphQL schema for both unauthenticated and signed-in users, which is a
  security issue — contact submissions should never be readable or modifiable by end users.

  ## Changes
  - Revoke SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER from `anon`
  - Revoke SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER from `authenticated`
  - Both roles retain only INSERT (needed for the contact form submission flow)
  - `service_role` privileges are unchanged (server-side access remains intact)

  ## Result
  The table will no longer appear in the GraphQL schema for public or signed-in users.
  The contact form continues to work — it only inserts rows.
*/

REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON public.contact_messages
  FROM anon;

REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON public.contact_messages
  FROM authenticated;
