import { supabase } from '../../lib/supabase.js';

export async function POST({ request }) {
  try {
    const leadData = await request.json();
    
    const {
      name,
      phone,
      email,
      lead_source = 'website_direct',
      ad_campaign,
      ad_set_keyword,
      form_type = 'contact_form',
      lead_notes,
      status = 'new'
    } = leadData;

    // Validate required fields
    if (!name) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Name is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Insert lead into database
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name,
        phone,
        email,
        lead_source,
        ad_campaign,
        ad_set_keyword,
        form_type,
        lead_notes,
        status
      })
      .select()
      .single();

    if (error) {
      console.error('Database insertion error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to save lead'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      lead: data
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const leadSource = url.searchParams.get('lead_source');
    const limit = parseInt(url.searchParams.get('limit')) || 50;
    const offset = parseInt(url.searchParams.get('offset')) || 0;

    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Add filters if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    if (leadSource) {
      query = query.eq('lead_source', leadSource);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database query error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch leads'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      leads: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}