-- Service Providers Table
-- Run this in your Supabase SQL Editor to create the tables

CREATE TABLE IF NOT EXISTS service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Business Info
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  website TEXT,
  business_address TEXT,

  -- Service Coverage
  service_areas TEXT[] NOT NULL, -- ["Detroit", "Ann Arbor", "Grand Rapids"]
  services_offered TEXT[] NOT NULL, -- ["furnace-repair", "furnace-installation", etc.]

  -- Capacity Management
  max_leads_per_week INTEGER DEFAULT 5,
  accepting_leads BOOLEAN DEFAULT TRUE,

  -- Status
  status TEXT DEFAULT 'pending', -- pending, active, paused, rejected

  -- Optional Directory Info (for future public directory)
  logo_url TEXT,
  description TEXT,
  show_in_directory BOOLEAN DEFAULT FALSE,
  years_in_business INTEGER,
  license_number TEXT,

  -- Admin Notes
  admin_notes TEXT
);

-- Lead Assignments Table
-- Links your existing form_submissions to providers
CREATE TABLE IF NOT EXISTS lead_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,

  status TEXT DEFAULT 'sent', -- sent, contacted, completed, no-response
  notes TEXT,
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_service_providers_status ON service_providers(status);
CREATE INDEX IF NOT EXISTS idx_service_providers_email ON service_providers(email);
CREATE INDEX IF NOT EXISTS idx_lead_assignments_submission ON lead_assignments(submission_id);
CREATE INDEX IF NOT EXISTS idx_lead_assignments_provider ON lead_assignments(provider_id);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_assignments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts for signup form
CREATE POLICY "Allow public to submit provider applications"
  ON service_providers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow service role full access (for your admin operations)
CREATE POLICY "Service role has full access to providers"
  ON service_providers
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role has full access to assignments"
  ON lead_assignments
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
