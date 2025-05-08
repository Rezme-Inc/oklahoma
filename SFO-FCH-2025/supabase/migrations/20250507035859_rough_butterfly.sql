/*
  # Create documents table for Fair Chance documentation

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `name` (text) - Original filename
      - `category` (text) - Document category
      - `notes` (text) - Optional notes about the document
      - `storage_path` (text) - Path to file in Supabase storage
      - `uploader_id` (uuid) - References auth.users
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `documents` table
    - Add policies for authenticated users to:
      - Read all documents
      - Create their own documents
      - Update their own documents
*/

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  notes text,
  storage_path text NOT NULL,
  uploader_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all documents
CREATE POLICY "Users can read all documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to create documents
CREATE POLICY "Users can create documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploader_id);

-- Allow users to update their own documents
CREATE POLICY "Users can update their own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploader_id)
  WITH CHECK (auth.uid() = uploader_id);