/**
 * API Route: Resend Verification SMS
 * POST /api/resend-verification
 * 
 * Resends verification SMS for users who didn't receive it
 */

import { createClient } from '@supabase/supabase-js';
import { 
  canResendVerification, 
  incrementVerificationAttempts,
  generateVerificationCode,
  generateExpirationTime 
} from '../../utils/verification.js';
import { telnyxService } from '../../utils/telnyx.js';
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

    const body = await request.json();
    const { phoneNumber, submissionId } = body;

    // Validate required fields
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Phone number is required' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Sanitize phone number
    const sanitizedPhoneNumber = sanitizeInput(phoneNumber);

    // Check if user can resend verification
    const resendCheck = await canResendVerification(supabase, sanitizedPhoneNumber);
    
    if (!resendCheck.canResend) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: resendCheck.error,
          attemptsRemaining: resendCheck.attemptsRemaining || 0
        }),
        { 
          status: 429, // Too Many Requests
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Find the pending verification record
    const { data: records, error: findError } = await supabase
      .from('form_submissions')
      .select('*')
      .eq('phone_number', sanitizedPhoneNumber)
      .eq('verification_status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1);

    if (findError || !records || records.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No pending verification found for this phone number' 
        }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const record = records[0];
    
    // Generate new verification code and extend expiration
    const newVerificationCode = generateVerificationCode();
    const newExpirationTime = generateExpirationTime(10);

    // Update the record with new verification data
    const { data: updatedRecord, error: updateError } = await supabase
      .from('form_submissions')
      .update({
        verification_code: newVerificationCode,
        verification_expires_at: newExpirationTime,
        verification_attempts: record.verification_attempts + 1
      })
      .eq('id', record.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating verification record:', updateError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to update verification record' 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Send new verification SMS
    const smsResult = await telnyxService.sendResendVerificationSMS(
      sanitizedPhoneNumber,
      record.verification_token,
      updatedRecord.verification_attempts
    );

    if (!smsResult.success) {
      console.error('Failed to resend verification SMS:', smsResult.error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to resend verification SMS. Please try again.' 
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
        message: 'Verification SMS resent successfully',
        attemptsRemaining: Math.max(0, 3 - updatedRecord.verification_attempts),
        phoneNumber: sanitizedPhoneNumber
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in resend-verification API:', error);
    
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