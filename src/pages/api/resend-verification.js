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

// Initialize Supabase client
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://ztvsfapoeekaxztahxsv.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST({ request }) {
  try {
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

    // Validate phone number format
    const phoneValidation = telnyxService.validatePhoneNumber(phoneNumber);
    if (!phoneValidation.valid) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: phoneValidation.error 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if user can resend verification
    const resendCheck = await canResendVerification(supabase, phoneValidation.formatted);
    
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
      .eq('phone_number', phoneValidation.formatted)
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
      phoneValidation.formatted,
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
        phoneNumber: phoneValidation.formatted
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