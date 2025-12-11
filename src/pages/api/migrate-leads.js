import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST({ request }) {
  try {
    console.log('Starting migration from form_submissions to leads...');
    
    // Fetch all form submissions
    const { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching submissions:', fetchError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch form submissions'
      }), { status: 500 });
    }

    console.log(`Found ${submissions.length} form submissions to migrate`);

    // Transform and insert into leads table
    const migrationResults = [];
    
    for (const submission of submissions) {
      try {
        // Map form source to lead source
        const leadSource = mapFormSource(submission.form_source);
        
        // Map form type
        const formType = mapFormType(submission);
        
        // Map status
        const leadStatus = mapStatus(submission.status);
        
        // Create initial note from submission data
        const initialNote = createInitialNote(submission);
        
        const leadData = {
          name: submission.full_name || 'Unknown',
          phone: submission.phone_number,
          email: submission.email,
          lead_source: leadSource,
          ad_campaign: null, // Could be populated if you have tracking data
          ad_set_keyword: null, // Could be populated if you have tracking data  
          form_type: formType,
          lead_notes: JSON.stringify([initialNote]), // Store as JSON array
          status: leadStatus,
          created_at: submission.created_at
        };

        // Check if lead already exists (by phone + name)
        const { data: existingLead } = await supabase
          .from('leads')
          .select('id')
          .eq('phone', submission.phone_number)
          .eq('name', submission.full_name)
          .single();

        if (existingLead) {
          console.log(`Lead already exists for ${submission.full_name}`);
          migrationResults.push({
            submission_id: submission.id,
            status: 'skipped',
            reason: 'already_exists'
          });
          continue;
        }

        // Insert new lead
        const { data: newLead, error: insertError } = await supabase
          .from('leads')
          .insert(leadData)
          .select()
          .single();

        if (insertError) {
          console.error(`Error inserting lead for ${submission.full_name}:`, insertError);
          migrationResults.push({
            submission_id: submission.id,
            status: 'error',
            error: insertError.message
          });
        } else {
          console.log(`Successfully migrated ${submission.full_name} to lead ${newLead.id}`);
          migrationResults.push({
            submission_id: submission.id,
            lead_id: newLead.id,
            status: 'success'
          });
        }

      } catch (error) {
        console.error(`Error processing submission ${submission.id}:`, error);
        migrationResults.push({
          submission_id: submission.id,
          status: 'error',
          error: error.message
        });
      }
    }

    const successCount = migrationResults.filter(r => r.status === 'success').length;
    const skippedCount = migrationResults.filter(r => r.status === 'skipped').length;
    const errorCount = migrationResults.filter(r => r.status === 'error').length;

    return new Response(JSON.stringify({
      success: true,
      message: 'Migration completed',
      stats: {
        total: submissions.length,
        successful: successCount,
        skipped: skippedCount,
        errors: errorCount
      },
      results: migrationResults
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Migration error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Migration failed'
    }), { status: 500 });
  }
}

function mapFormSource(formSource) {
  const sourceMap = {
    'website_contact': 'website_direct',
    'photo_upload': 'website_direct', 
    'emergency_form': 'website_direct',
    'hero_modal': 'website_direct',
    'contact_page_form': 'website_direct',
    'furnace_diagnosis': 'website_direct',
    'google_ads': 'google_search',
    'facebook': 'facebook'
  };
  return sourceMap[formSource] || 'website_direct';
}

function mapFormType(submission) {
  if (submission.photo_urls && submission.photo_urls.length > 0) {
    return 'photo_upload';
  }
  if (submission.furnace_issue) {
    return 'furnace_issue';
  }
  return 'contact_form';
}

function mapStatus(status) {
  const statusMap = {
    'pending': 'new',
    'assigned': 'contacted',
    'completed': 'completed',
    'archived': 'completed'
  };
  return statusMap[status] || 'new';
}

function createInitialNote(submission) {
  const timestamp = new Date(submission.created_at).toLocaleString();
  let noteText = `Lead submitted via ${submission.form_source} on ${timestamp}`;
  
  if (submission.furnace_issue) {
    noteText += `\n\nIssue: ${submission.furnace_issue}`;
  }
  
  if (submission.message) {
    noteText += `\n\nMessage: ${submission.message}`;
  }
  
  if (submission.preferred_visit_time) {
    noteText += `\n\nPreferred visit time: ${submission.preferred_visit_time}`;
  }
  
  if (submission.photo_count > 0) {
    noteText += `\n\n${submission.photo_count} photo(s) uploaded`;
  }

  return {
    timestamp: submission.created_at,
    text: noteText,
    type: 'system'
  };
}