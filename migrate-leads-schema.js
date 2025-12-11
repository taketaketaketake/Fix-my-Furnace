#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');

// Load environment variables
config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

async function migrateLeadsSchema() {
  console.log('🔧 Migrating leads table schema...\n');

  if (!supabaseUrl || !supabaseServiceRole) {
    console.error('❌ Missing required Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRole);

  try {
    console.log('📊 Adding columns to leads table...');
    
    // Execute the schema migration using Supabase RPC or direct SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `
        -- Add missing columns to leads table to match form_submissions structure
        ALTER TABLE leads 
        ADD COLUMN IF NOT EXISTS service_address TEXT,
        ADD COLUMN IF NOT EXISTS zip_code TEXT,
        ADD COLUMN IF NOT EXISTS furnace_issue TEXT,
        ADD COLUMN IF NOT EXISTS message TEXT,
        ADD COLUMN IF NOT EXISTS preferred_visit_time TEXT,
        ADD COLUMN IF NOT EXISTS photo_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS photo_urls TEXT[],
        ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
        ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

        -- Create indexes for new columns
        CREATE INDEX IF NOT EXISTS idx_leads_zip_code ON leads(zip_code);
        CREATE INDEX IF NOT EXISTS idx_leads_verification_status ON leads(verification_status);
        CREATE INDEX IF NOT EXISTS idx_leads_updated_at ON leads(updated_at DESC);
      `
    });

    if (error) {
      console.error('❌ Schema migration failed:', error);
      process.exit(1);
    }

    console.log('✅ Schema migration completed successfully');

    // Now populate the new fields from form_submissions
    console.log('\n📋 Populating new fields from form_submissions...');
    
    const { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*');

    if (fetchError) {
      console.error('❌ Error fetching submissions:', fetchError);
      process.exit(1);
    }

    console.log(`Found ${submissions.length} form submissions to process`);

    let updateCount = 0;
    for (const submission of submissions) {
      // Find corresponding lead
      const { data: lead } = await supabase
        .from('leads')
        .select('id')
        .eq('name', submission.full_name)
        .eq('phone', submission.phone_number)
        .single();

      if (lead) {
        const zipCode = submission.zip_code || extractZipFromAddress(submission.service_address);
        
        const { error: updateError } = await supabase
          .from('leads')
          .update({
            service_address: submission.service_address,
            zip_code: zipCode,
            furnace_issue: submission.furnace_issue,
            message: submission.message,
            preferred_visit_time: submission.preferred_visit_time,
            photo_count: submission.photo_count || 0,
            photo_urls: submission.photo_urls || [],
            verification_status: submission.verification_status || 'pending'
          })
          .eq('id', lead.id);

        if (!updateError) {
          updateCount++;
          console.log(`✅ Updated lead for ${submission.full_name}`);
        } else {
          console.error(`❌ Failed to update lead for ${submission.full_name}:`, updateError);
        }
      }
    }

    console.log(`\n🏁 Migration completed: ${updateCount} leads updated`);

  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

function extractZipFromAddress(address) {
  if (!address) return null;
  const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
  return zipMatch ? zipMatch[0] : null;
}

migrateLeadsSchema().catch(console.error);