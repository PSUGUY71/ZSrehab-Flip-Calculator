-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  date TEXT,
  data JSONB NOT NULL,
  lenders JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_deals_user_id ON deals(user_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);

-- Enable Row Level Security
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own deals
CREATE POLICY "Users can view their own deals"
  ON deals FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own deals
CREATE POLICY "Users can insert their own deals"
  ON deals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own deals
CREATE POLICY "Users can update their own deals"
  ON deals FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own deals
CREATE POLICY "Users can delete their own deals"
  ON deals FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

