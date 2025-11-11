-- Add last_service column to form_submissions table
-- Run this in your Supabase SQL Editor

ALTER TABLE form_submissions 
ADD COLUMN IF NOT EXISTS last_service TEXT;

-- Add a comment to the column for documentation
COMMENT ON COLUMN form_submissions.last_service IS 'When the furnace was last serviced - values like "0-6_months", "never", etc.';