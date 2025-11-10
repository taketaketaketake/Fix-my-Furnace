/**
 * API Route: Get Contracts
 * GET /api/get-contracts
 *
 * Returns approved service contracts for public pricing transparency page
 * Optional query params: service, provider, city, minCost, maxCost
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

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const serviceFilter = url.searchParams.get('service');
    const providerFilter = url.searchParams.get('provider');
    const cityFilter = url.searchParams.get('city');
    const minCost = url.searchParams.get('minCost');
    const maxCost = url.searchParams.get('maxCost');

    console.log('Fetching contracts with filters:', {
      serviceFilter,
      providerFilter,
      cityFilter,
      minCost,
      maxCost
    });

    // Build query - only show approved contracts
    let query = supabase
      .from('service_contracts')
      .select('id, service_type, provider_name, total_cost, service_date, city, zip_code, contract_image_url, work_description, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    // Fetch all approved contracts first
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

    // Filter in JavaScript for better control
    let filteredContracts = contracts || [];

    // Filter by service type
    if (serviceFilter && serviceFilter !== 'all') {
      filteredContracts = filteredContracts.filter(contract =>
        contract.service_type &&
        contract.service_type.toLowerCase().includes(serviceFilter.toLowerCase())
      );
    }

    // Filter by provider name
    if (providerFilter && providerFilter !== 'all') {
      filteredContracts = filteredContracts.filter(contract =>
        contract.provider_name &&
        contract.provider_name.toLowerCase().includes(providerFilter.toLowerCase())
      );
    }

    // Filter by city
    if (cityFilter && cityFilter !== 'all') {
      filteredContracts = filteredContracts.filter(contract =>
        contract.city &&
        contract.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }

    // Filter by cost range
    if (minCost) {
      const min = parseFloat(minCost);
      if (!isNaN(min)) {
        filteredContracts = filteredContracts.filter(contract =>
          contract.total_cost >= min
        );
      }
    }

    if (maxCost) {
      const max = parseFloat(maxCost);
      if (!isNaN(max)) {
        filteredContracts = filteredContracts.filter(contract =>
          contract.total_cost <= max
        );
      }
    }

    // Calculate statistics
    const stats = calculateStats(filteredContracts);

    console.log(`Found ${filteredContracts.length} contracts`);

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        contracts: filteredContracts,
        count: filteredContracts.length,
        stats: stats
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
    console.error('Error in get-contracts API:', error);

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

/**
 * Calculate statistics from contracts
 */
function calculateStats(contracts) {
  if (!contracts || contracts.length === 0) {
    return {
      total: 0,
      avgCost: 0,
      minCost: 0,
      maxCost: 0,
      byServiceType: {},
      topProviders: []
    };
  }

  const costs = contracts.map(c => c.total_cost);
  const avgCost = costs.reduce((a, b) => a + b, 0) / costs.length;
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);

  // Group by service type
  const byServiceType = {};
  contracts.forEach(contract => {
    const type = contract.service_type || 'Unknown';
    if (!byServiceType[type]) {
      byServiceType[type] = {
        count: 0,
        totalCost: 0,
        avgCost: 0
      };
    }
    byServiceType[type].count++;
    byServiceType[type].totalCost += contract.total_cost;
  });

  // Calculate averages for each service type
  Object.keys(byServiceType).forEach(type => {
    byServiceType[type].avgCost = byServiceType[type].totalCost / byServiceType[type].count;
  });

  // Top providers by number of contracts
  const providerCounts = {};
  contracts.forEach(contract => {
    const provider = contract.provider_name;
    providerCounts[provider] = (providerCounts[provider] || 0) + 1;
  });

  const topProviders = Object.entries(providerCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    total: contracts.length,
    avgCost: Math.round(avgCost * 100) / 100,
    minCost: Math.round(minCost * 100) / 100,
    maxCost: Math.round(maxCost * 100) / 100,
    byServiceType,
    topProviders
  };
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
