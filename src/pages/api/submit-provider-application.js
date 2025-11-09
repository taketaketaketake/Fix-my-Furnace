/**
 * API Route: Submit Provider Application
 * POST /api/submit-provider-application
 *
 * Handles service provider signup applications
 * Used by provider application form at /partners/apply
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../utils/rateLimit.js';

function sanitizeInput(input) {
  return typeof input === 'string' ? input.trim().slice(0, 500) : '';
}

function parseCommaSeparatedList(input) {
  if (!input || typeof input !== 'string') return [];
  return input
    .split(',')
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

function parseLeadsPerWeek(selection) {
  // Extract number from selection like "5-10 leads" -> 10
  if (!selection) return 5; // Default
  const match = selection.match(/(\d+)-(\d+)/);
  if (match) {
    return parseInt(match[2]); // Return upper bound
  }
  const singleMatch = selection.match(/(\d+)\+/);
  if (singleMatch) {
    return parseInt(singleMatch[1]);
  }
  return 5; // Default fallback
}

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST({ request }) {
  console.log('=== submit-provider-application API called ===');
  try {
    // Check rate limit first
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: 900
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '900'
          }
        }
      );
    }

    const body = await request.json();
    const { formData, formSource } = body;

    console.log('Body received:', { formData, formSource });

    // Validate required fields
    if (!formData || !formSource) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Form data and source are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate required provider fields
    if (!formData.business_name || !formData.contact_name || !formData.email || !formData.phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Business name, contact name, email, and phone are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (!formData.service_areas || !formData.services_offered) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Service areas and services offered are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse service areas and services from comma-separated strings to arrays
    const serviceAreas = parseCommaSeparatedList(formData.service_areas);
    const servicesOffered = parseCommaSeparatedList(formData.services_offered);

    if (serviceAreas.length === 0 || servicesOffered.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please enter at least one service area and one service'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare provider data for database
    const providerData = {
      business_name: sanitizeInput(formData.business_name),
      contact_name: sanitizeInput(formData.contact_name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      business_address: sanitizeInput(formData.business_address || ''),
      website: sanitizeInput(formData.website || ''),
      service_areas: serviceAreas,
      services_offered: servicesOffered,
      max_leads_per_week: parseLeadsPerWeek(formData.max_leads_per_week),
      years_in_business: formData.years_in_business ? parseInt(formData.years_in_business) || null : null,
      license_number: sanitizeInput(formData.license_number || ''),
      description: sanitizeInput(formData.description || ''),
      status: 'pending', // All new applications start as pending
      accepting_leads: true, // Default to accepting
      show_in_directory: false // Don't show until approved
    };

    console.log('Provider data to insert:', providerData);

    // Insert into database
    const { data, error } = await supabase
      .from('service_providers')
      .insert([providerData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);

      // Check for duplicate email
      if (error.code === '23505' && error.message.includes('email')) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'An application with this email already exists'
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to submit application'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Provider application submitted successfully:', data.id);

    // TODO: Send notification email to admin about new provider application
    // TODO: Send confirmation email to provider

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Application submitted successfully! We will review and contact you within 1-2 business days.',
        providerId: data.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in submit-provider-application API:', error);

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
