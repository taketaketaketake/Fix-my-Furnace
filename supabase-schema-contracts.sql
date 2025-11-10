-- Service Contracts Table
-- Run this in your Supabase SQL Editor to create the contract pricing table
-- This enables homeowners to share actual service contract pricing for transparency

CREATE TABLE IF NOT EXISTS service_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Service Details
  service_type TEXT NOT NULL, -- "Furnace Repair", "Furnace Installation", "Boiler Service", etc.
  provider_name TEXT NOT NULL, -- Name of HVAC company that did the work
  total_cost DECIMAL(10, 2) NOT NULL, -- Total amount paid
  service_date DATE, -- When the service was performed

  -- Location Info
  city TEXT, -- City where service was performed
  zip_code TEXT, -- Zip code for local comparisons

  -- Contract Image
  contract_image_url TEXT NOT NULL, -- URL to uploaded contract/invoice image in Supabase Storage

  -- Submission Details
  submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submitter_email TEXT, -- Optional - for follow-up questions

  -- Moderation & Quality
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  verified BOOLEAN DEFAULT FALSE, -- Admin has verified this is legitimate

  -- Additional Context
  work_description TEXT, -- What work was actually performed
  notes TEXT, -- Any additional notes from submitter

  -- Flags & Reports
  report_count INTEGER DEFAULT 0, -- Number of times this was reported as fake/spam
  flagged BOOLEAN DEFAULT FALSE,

  -- Admin
  admin_notes TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_service_contracts_status ON service_contracts(status);
CREATE INDEX IF NOT EXISTS idx_service_contracts_service_type ON service_contracts(service_type);
CREATE INDEX IF NOT EXISTS idx_service_contracts_provider ON service_contracts(provider_name);
CREATE INDEX IF NOT EXISTS idx_service_contracts_city ON service_contracts(city);
CREATE INDEX IF NOT EXISTS idx_service_contracts_zip ON service_contracts(zip_code);
CREATE INDEX IF NOT EXISTS idx_service_contracts_created ON service_contracts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE service_contracts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to view approved contracts (for public transparency page)
CREATE POLICY "Allow public to view approved contracts"
  ON service_contracts
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

-- Policy: Allow public to submit new contracts (for upload form)
CREATE POLICY "Allow public to submit contracts"
  ON service_contracts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Service role has full access (for admin moderation)
CREATE POLICY "Service role has full access to contracts"
  ON service_contracts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create storage bucket for contract images (run this separately if needed)
-- This is handled via Supabase Dashboard or API
-- Bucket name: "contract-images"
-- Public: false (we'll serve via signed URLs for privacy)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, application/pdf
