/**
 * API Route: Verify Phone Number
 * GET /api/verify-phone?token=xxx
 * 
 * Handles verification link clicks from SMS
 */

import { createClient } from '@supabase/supabase-js';
import { verifyPhoneToken } from '../../utils/verification.js';
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

export async function GET({ request, redirect }) {
  try {
    // Check rate limit first
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return redirect('/verification-error?error=rate-limited', 302);
    }

    const url = new URL(request.url);
    const token = sanitizeInput(url.searchParams.get('token'));

    // Validate token parameter
    if (!token) {
      return redirect('/verification-error?error=missing-token', 302);
    }

    // Attempt to verify the token
    const verificationResult = await verifyPhoneToken(supabase, token);

    if (!verificationResult.success) {
      // Redirect to error page with specific error
      const errorType = verificationResult.error.includes('expired') ? 'expired' : 'invalid';
      return redirect(`/verification-error?error=${errorType}&token=${token}`, 302);
    }

    // Success! Redirect to success page
    return redirect('/verification-success', 302);

  } catch (error) {
    console.error('Error in verify-phone API:', error);
    return redirect('/verification-error?error=server-error', 302);
  }
}

// Handle non-GET requests
export async function POST({ redirect }) {
  return redirect('/verification-error?error=method-not-allowed', 302);
}

export async function PUT({ redirect }) {
  return redirect('/verification-error?error=method-not-allowed', 302);
}

export async function DELETE({ redirect }) {
  return redirect('/verification-error?error=method-not-allowed', 302);
}