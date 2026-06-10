/*
  # Add email status tracking to contact_messages

  1. Changes
    - Add `email_sent` (boolean) - Whether email notification was sent
    - Add `email_sent_at` (timestamptz) - When email was sent
    - Add `email_error` (text) - Any error message from email sending
    
  2. Purpose
    - Track which messages successfully sent email notifications
    - Enable monitoring of email delivery success rate
    - Identify messages that need manual follow-up if email failed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'email_sent'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN email_sent boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'email_sent_at'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN email_sent_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_messages' AND column_name = 'email_error'
  ) THEN
    ALTER TABLE contact_messages ADD COLUMN email_error text;
  END IF;
END $$;