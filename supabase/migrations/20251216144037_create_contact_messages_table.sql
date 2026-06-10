/*
  # Create contact_messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key) - Unique identifier for each message
      - `name` (text) - Contact person's full name
      - `email` (text) - Contact person's email address
      - `phone` (text, nullable) - Contact person's phone number
      - `company` (text, nullable) - Company name
      - `service` (text) - Service they're interested in
      - `message` (text) - Their message/inquiry
      - `email_sent` (boolean) - Whether email notification was sent
      - `email_sent_at` (timestamptz, nullable) - When email was sent
      - `email_error` (text, nullable) - Any error message from email sending
      - `created_at` (timestamptz) - When the message was submitted

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for anonymous users to insert contact form submissions
    - No SELECT, UPDATE, or DELETE permissions for public users
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  service text NOT NULL,
  message text NOT NULL,
  email_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  email_error text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);