/**
 * API Route: Cleanup Expired Verifications
 * POST /api/cleanup-expired
 * 
 * Cleans up expired verification attempts (designed to run on cron)
 * Can also be called manually for maintenance
 */

import { createClient } from '@supabase/supabase-js';
import { cleanupExpiredVerifications } from '../../utils/verification.js';
import { checkRateLimit, getClientIP } from '../../utils/rateLimit.js';

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

export async function POST({ request }) {
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

    const body = await request.json().catch(() => ({}));
    const { hoursOld = 24, authToken } = body;
    const sanitizedAuthToken = sanitizeInput(authToken);

    // Basic auth check (optional - you might want to add API key authentication)
    const expectedAuthToken = import.meta.env.CLEANUP_AUTH_TOKEN;
    if (expectedAuthToken && sanitizedAuthToken !== expectedAuthToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate hoursOld parameter
    if (typeof hoursOld !== 'number' || hoursOld < 1 || hoursOld > 168) { // Max 1 week
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'hoursOld must be a number between 1 and 168 (1 week)' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Starting cleanup of verifications older than ${hoursOld} hours...`);

    // Run the cleanup
    const cleanupResult = await cleanupExpiredVerifications(supabase, hoursOld);

    if (cleanupResult.error) {
      console.error('Error during cleanup:', cleanupResult.error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error during cleanup' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Also clean up any pending verifications that are expired but not marked as such
    const now = new Date().toISOString();
    const { data: expiredRecords, error: expiredError } = await supabase
      .from('form_submissions')
      .update({ verification_status: 'expired' })
      .eq('verification_status', 'pending')
      .lt('verification_expires_at', now)
      .select('id');

    let expiredCount = 0;
    if (!expiredError && expiredRecords) {
      expiredCount = expiredRecords.length;
    }

    // Success response with cleanup statistics
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Cleanup completed successfully',
        statistics: {
          deletedRecords: cleanupResult.data?.length || 0,
          markedExpired: expiredCount,
          hoursOld: hoursOld,
          cleanupTime: new Date().toISOString()
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in cleanup-expired API:', error);
    
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

// GET endpoint for manual cleanup (with basic auth)
export async function GET({ request }) {
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

    const url = new URL(request.url);
    const authToken = sanitizeInput(url.searchParams.get('auth'));
    const hoursOld = parseInt(url.searchParams.get('hours') || '24');

    // Basic auth check
    const expectedAuthToken = import.meta.env.CLEANUP_AUTH_TOKEN;
    if (expectedAuthToken && authToken !== expectedAuthToken) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized - auth token required' 
        }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Run cleanup with GET parameters
    const cleanupResult = await cleanupExpiredVerifications(supabase, hoursOld);

    if (cleanupResult.error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Database error during cleanup' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Manual cleanup completed',
        deletedCount: cleanupResult.data?.length || 0,
        hoursOld: hoursOld
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in cleanup-expired GET:', error);
    
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