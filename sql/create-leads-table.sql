-- Create Leads table for tracking customer leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  lead_source TEXT CHECK (lead_source IN ('facebook', 'google_search', 'google_pmax', 'website_direct')),
  ad_campaign TEXT,
  ad_set_keyword TEXT,
  form_type TEXT CHECK (form_type IN ('photo_upload', 'contact_form', 'furnace_issue')),
  lead_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('new', 'contacted', 'scheduled', 'completed', 'bad_lead')) DEFAULT 'new'
);

-- Create indexes for common queries
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_lead_source ON leads(lead_source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_form_type ON leads(form_type);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view all leads
CREATE POLICY "Enable read access for authenticated users" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to insert leads
CREATE POLICY "Enable insert access for authenticated users" ON leads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update leads
CREATE POLICY "Enable update access for authenticated users" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');