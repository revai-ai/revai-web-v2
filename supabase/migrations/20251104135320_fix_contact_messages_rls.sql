/*
  # Fix RLS policy for contact_messages table

  1. Changes
    - Drop existing RLS policy that isn't working correctly
    - Create new policy that explicitly allows anonymous users to insert contact messages
    - This allows the contact form to work without authentication

  2. Security
    - Only allows INSERT operations for anonymous and authenticated users
    - No SELECT, UPDATE, or DELETE permissions for public users
    - Data can only be inserted, not read or modified by public
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;

-- Create new policy with explicit permission for inserts
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
