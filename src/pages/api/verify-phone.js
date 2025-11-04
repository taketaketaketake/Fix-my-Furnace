/**
 * API Route: Verify Phone Number
 * GET /api/verify-phone?token=xxx
 * 
 * Handles verification link clicks from SMS
 */

import { createClient } from '@supabase/supabase-js';
import { verifyPhoneToken } from '../../utils/verification.js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://ztvsfapoeekaxztahxsv.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET({ request, redirect }) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

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