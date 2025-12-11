import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// GET - Fetch notes for a specific lead
export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const leadId = url.searchParams.get('leadId');

    if (!leadId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Lead ID is required'
      }), { status: 400 });
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .select('lead_notes')
      .eq('id', leadId)
      .single();

    if (error) {
      console.error('Error fetching lead notes:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch lead notes'
      }), { status: 500 });
    }

    // Parse notes from JSON string or return empty array
    let notes = [];
    if (lead.lead_notes) {
      try {
        notes = JSON.parse(lead.lead_notes);
      } catch (parseError) {
        // If not JSON, treat as legacy text note
        notes = [{
          timestamp: new Date().toISOString(),
          text: lead.lead_notes,
          type: 'legacy'
        }];
      }
    }

    return new Response(JSON.stringify({
      success: true,
      notes: notes
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { status: 500 });
  }
}

// POST - Add a new note to a lead
export async function POST({ request }) {
  try {
    const body = await request.json();
    const { leadId, noteText, noteType = 'manual' } = body;

    if (!leadId || !noteText) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Lead ID and note text are required'
      }), { status: 400 });
    }

    // Get current notes
    const { data: lead, error: fetchError } = await supabase
      .from('leads')
      .select('lead_notes')
      .eq('id', leadId)
      .single();

    if (fetchError) {
      console.error('Error fetching lead:', fetchError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Lead not found'
      }), { status: 404 });
    }

    // Parse existing notes
    let existingNotes = [];
    if (lead.lead_notes) {
      try {
        existingNotes = JSON.parse(lead.lead_notes);
      } catch (parseError) {
        // Convert legacy text note to new format
        existingNotes = [{
          timestamp: new Date().toISOString(),
          text: lead.lead_notes,
          type: 'legacy'
        }];
      }
    }

    // Add new note
    const newNote = {
      timestamp: new Date().toISOString(),
      text: noteText.trim(),
      type: noteType
    };

    existingNotes.push(newNote);

    // Update lead with new notes array
    const { data: updatedLead, error: updateError } = await supabase
      .from('leads')
      .update({ 
        lead_notes: JSON.stringify(existingNotes)
      })
      .eq('id', leadId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating lead notes:', updateError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to save note'
      }), { status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Note added successfully',
      note: newNote,
      allNotes: existingNotes
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { status: 500 });
  }
}

// PUT - Update lead status and add status change note
export async function PUT({ request }) {
  try {
    const body = await request.json();
    const { leadId, status, note } = body;

    if (!leadId || !status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Lead ID and status are required'
      }), { status: 400 });
    }

    // Get current lead data
    const { data: lead, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (fetchError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Lead not found'
      }), { status: 404 });
    }

    // Parse existing notes
    let existingNotes = [];
    if (lead.lead_notes) {
      try {
        existingNotes = JSON.parse(lead.lead_notes);
      } catch (parseError) {
        existingNotes = [{
          timestamp: new Date().toISOString(),
          text: lead.lead_notes,
          type: 'legacy'
        }];
      }
    }

    // Add status change note
    const statusNote = {
      timestamp: new Date().toISOString(),
      text: `Status changed from "${lead.status}" to "${status}"${note ? `. Note: ${note}` : ''}`,
      type: 'status_change'
    };

    existingNotes.push(statusNote);

    // Update lead
    const { data: updatedLead, error: updateError } = await supabase
      .from('leads')
      .update({ 
        status: status,
        lead_notes: JSON.stringify(existingNotes)
      })
      .eq('id', leadId)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating lead:', updateError);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to update lead'
      }), { status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead status updated successfully',
      lead: updatedLead
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), { status: 500 });
  }
}