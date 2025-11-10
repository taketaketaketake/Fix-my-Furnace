/**
 * API Route: Get Pending Contracts
 * GET /api/get-pending-contracts
 *
 * Returns pending service contracts for admin moderation
 * Requires admin password for access
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple admin password check
const ADMIN_PASSWORD = import.meta.env.ADMIN_PASSWORD || 'change-this-password';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const adminPassword = url.searchParams.get('password');
    const statusFilter = url.searchParams.get('status') || 'pending';

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

    console.log('Fetching contracts with status:', statusFilter);

    // Build query - get all pending contracts (or specific status)
    let query = supabase
      .from('service_contracts')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status if specified
    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data: contracts, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to fetch contracts'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Found ${contracts?.length || 0} contracts`);

    // Calculate stats
    const stats = {
      pending: contracts?.filter(c => c.status === 'pending').length || 0,
      approved: contracts?.filter(c => c.status === 'approved').length || 0,
      rejected: contracts?.filter(c => c.status === 'rejected').length || 0,
      total: contracts?.length || 0
    };

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        contracts: contracts || [],
        stats: stats,
        count: contracts?.length || 0
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache' // Don't cache admin data
        }
      }
    );

  } catch (error) {
    console.error('Error in get-pending-contracts API:', error);

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

// Handle non-GET requests
export async function POST() {
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}
