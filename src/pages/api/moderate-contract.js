/**
 * API Route: Moderate Contract
 * POST /api/moderate-contract
 *
 * Approve or reject pending service contracts
 * Simple admin endpoint for moderation
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role for admin operations
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Simple admin password check (set this in your environment)
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'change-this-password';

export async function POST({ request }) {
  console.log('=== moderate-contract API called ===');

  try {
    const body = await request.json();
    const { contractId, action, adminPassword, adminNotes } = body;

    console.log('Moderation request:', { contractId, action });

    // Validate admin password
    if (adminPassword !== ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid admin password'
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required fields
    if (!contractId || !action) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Contract ID and action are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate action
    if (!['approve', 'reject'].includes(action)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Action must be "approve" or "reject"'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Update contract status
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const updateData = {
      status: newStatus,
      verified: action === 'approve',
      reviewed_at: new Date().toISOString(),
      admin_notes: adminNotes || null
    };

    const { data, error } = await supabase
      .from('service_contracts')
      .update(updateData)
      .eq('id', contractId)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to update contract'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Contract ${contractId} ${action}ed successfully`);

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: `Contract ${action}ed successfully`,
        contract: data
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in moderate-contract API:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
