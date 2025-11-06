/**
 * API Route: Submit Form
 * POST /api/submit-form
 *
 * Handles all simple form submissions to form_submissions table
 * Used by UniversalForm component
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../utils/rateLimit.js';
import { verifyCsrfToken } from '../../utils/csrf.js';

function sanitizeInput(input) {
  return typeof input === 'string' ? input.trim().slice(0, 500) : '';
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST({ request, cookies }) {
  console.log('=== submit-form API called ===');
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
    const { formData, formSource, _csrf } = body;

    console.log('Body received:', { formData, formSource, _csrf });

    // Verify CSRF token
    const sessionId = cookies.get('session_id')?.value;
    console.log('Session ID from cookies:', sessionId);
    console.log('CSRF token from request:', _csrf);
    
    if (!sessionId || !verifyCsrfToken(sessionId, _csrf)) {
      console.log('CSRF validation failed - sessionId:', !!sessionId, '_csrf:', !!_csrf);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Security validation failed. Please refresh the page and try again.'
        }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

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

    // Validate required form fields
    if (!formData.name || !formData.phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Name and phone number are required' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Prepare form data for database
    const submissionData = {
      full_name: sanitizeInput(formData.name),
      phone_number: sanitizeInput(formData.phone),
      service_address: sanitizeInput(formData.address || ''),
      furnace_issue: sanitizeInput(formData.issue || formData.message || ''),
      form_source: sanitizeInput(formSource),
      photo_count: 0,
      photo_urls: [],
      status: 'pending',
      verification_status: 'not_required'
    };

    // Insert into database
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to submit form' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        submissionId: data.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('=== ERROR in submit-form API ===');
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    
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