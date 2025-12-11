import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST({ request }) {
  try {
    console.log('Adding columns and populating leads data...');
    
    // Get all form submissions
    const { data: submissions, error: fetchError } = await supabase
      .from('form_submissions')
      .select('*');

    if (fetchError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch form submissions'
      }), { status: 500 });
    }

    console.log(`Processing ${submissions.length} submissions`);
    let updateCount = 0;

    // Update each lead with additional data from form_submissions
    for (const submission of submissions) {
      // Find the corresponding lead
      const { data: lead } = await supabase
        .from('leads')
        .select('id')
        .eq('name', submission.full_name)
        .eq('phone', submission.phone_number)
        .single();

      if (lead) {
        const zipCode = extractZipFromAddress(submission.service_address);
        
        const updateData = {
          service_address: submission.service_address,
          zip_code: zipCode,
          furnace_issue: submission.furnace_issue,
          message: submission.message,
          preferred_visit_time: submission.preferred_visit_time,
          photo_count: submission.photo_count || 0,
          photo_urls: submission.photo_urls || []
        };

        // Remove null/undefined values
        Object.keys(updateData).forEach(key => {
          if (updateData[key] === null || updateData[key] === undefined) {
            delete updateData[key];
          }
        });

        const { error: updateError } = await supabase
          .from('leads')
          .update(updateData)
          .eq('id', lead.id);

        if (!updateError) {
          updateCount++;
          console.log(`Updated lead for ${submission.full_name}`);
        } else {
          console.error(`Failed to update ${submission.full_name}:`, updateError);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully updated ${updateCount} leads with additional data`,
      stats: {
        total: submissions.length,
        updated: updateCount
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { status: 500 });
  }
}

function extractZipFromAddress(address) {
  if (!address) return null;
  const zipMatch = address.match(/\b\d{5}(?:-\d{4})?\b/);
  return zipMatch ? zipMatch[0] : null;
}