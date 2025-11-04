/**
 * API Route: Send Verification SMS
 * POST /api/send-verification
 * 
 * Handles form submission + sends verification SMS
 */

import { createClient } from '@supabase/supabase-js';
import { createVerificationRecord } from '../../utils/verification.js';
import { telnyxService } from '../../utils/telnyx.js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://ztvsfapoeekaxztahxsv.supabase.co';
const supabaseKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { formData, phoneNumber, formSource } = body;

    // Validate required fields
    if (!phoneNumber || !formData) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Phone number and form data are required' 
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

    // Prepare form data for database
    const submissionData = {
      full_name: formData.name || formData.full_name,
      phone_number: phoneValidation.formatted,
      service_address: formData.address || formData.service_address || '',
      furnace_issue: formData.issue || formData.message || formData.furnace_issue,
      form_source: formSource || 'unknown',
      photo_count: formData.photo_count || 0,
      photo_urls: formData.photo_urls || []
    };

    // Create verification record in database
    const verificationRecord = await createVerificationRecord(
      supabase, 
      submissionData, 
      phoneValidation.formatted
    );

    // Send verification SMS
    const smsResult = await telnyxService.sendVerificationSMS(
      phoneValidation.formatted,
      verificationRecord.verification_token
    );

    if (!smsResult.success) {
      // If SMS fails, we should probably delete the record or mark it as failed
      console.error('Failed to send verification SMS:', smsResult.error);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to send verification SMS. Please try again.' 
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
        message: 'Verification SMS sent successfully',
        submissionId: verificationRecord.id,
        phoneNumber: phoneValidation.formatted
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in send-verification API:', error);
    
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