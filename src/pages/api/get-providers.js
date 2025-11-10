/**
 * API Route: Get Providers
 * GET /api/get-providers
 *
 * Returns approved service providers for public directory
 * Optional query params: service, area
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const serviceFilter = url.searchParams.get('service');
    const areaFilter = url.searchParams.get('area');

    console.log('Fetching providers with filters:', { serviceFilter, areaFilter });

    // Build query - only show approved providers who want to be in directory
    let query = supabase
      .from('service_providers')
      .select('id, business_name, description, service_areas, services_offered, years_in_business, website, logo_url')
      .eq('status', 'active')
      .eq('show_in_directory', true)
      .order('created_at', { ascending: false });

    // Fetch all providers first
    const { data: providers, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to fetch providers'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Filter in JavaScript since Supabase array filtering can be tricky
    let filteredProviders = providers || [];

    // Filter by service if specified
    if (serviceFilter && serviceFilter !== 'all') {
      filteredProviders = filteredProviders.filter(provider =>
        provider.services_offered &&
        provider.services_offered.some(service =>
          service.toLowerCase().includes(serviceFilter.toLowerCase())
        )
      );
    }

    // Filter by area if specified
    if (areaFilter && areaFilter !== 'all') {
      filteredProviders = filteredProviders.filter(provider =>
        provider.service_areas &&
        provider.service_areas.some(area =>
          area.toLowerCase().includes(areaFilter.toLowerCase())
        )
      );
    }

    console.log(`Found ${filteredProviders.length} providers`);

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        providers: filteredProviders,
        count: filteredProviders.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
        }
      }
    );

  } catch (error) {
    console.error('Error in get-providers API:', error);

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
