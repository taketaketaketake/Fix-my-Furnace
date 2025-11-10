/**
 * API Route: Submit Contract
 * POST /api/submit-contract
 *
 * Handles service contract submissions with image uploads
 * Used for price transparency feature
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../utils/rateLimit.js';

function sanitizeInput(input) {
  return typeof input === 'string' ? input.trim().slice(0, 500) : '';
}

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST({ request }) {
  console.log('=== submit-contract API called ===');

  try {
    // Check rate limit first (stricter for file uploads)
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

    const formData = await request.formData();

    // Extract form fields
    const serviceType = sanitizeInput(formData.get('serviceType'));
    const providerName = sanitizeInput(formData.get('providerName'));
    const totalCost = parseFloat(formData.get('totalCost'));
    const serviceDate = formData.get('serviceDate');
    const city = sanitizeInput(formData.get('city'));
    const zipCode = sanitizeInput(formData.get('zipCode'));
    const workDescription = sanitizeInput(formData.get('workDescription'));
    const notes = sanitizeInput(formData.get('notes'));
    const submitterEmail = sanitizeInput(formData.get('submitterEmail'));
    const contractImage = formData.get('contractImage');

    console.log('Form data received:', {
      serviceType,
      providerName,
      totalCost,
      serviceDate,
      city,
      zipCode,
      hasImage: !!contractImage
    });

    // Validate required fields
    if (!serviceType || !providerName || !totalCost || !contractImage) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Service type, provider name, total cost, and contract image are required'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate cost is a positive number
    if (isNaN(totalCost) || totalCost <= 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Total cost must be a valid positive number'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(contractImage.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid file type. Please upload JPG, PNG, WEBP, or PDF'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (contractImage.size > maxSize) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'File size must be less than 5MB'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Upload image to Supabase Storage
    const timestamp = Date.now();
    const fileExt = contractImage.name.split('.').pop();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `contracts/${fileName}`;

    console.log('Uploading file to:', filePath);

    // Convert File to ArrayBuffer for upload
    const fileBuffer = await contractImage.arrayBuffer();

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('contract-images')
      .upload(filePath, fileBuffer, {
        contentType: contractImage.type,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to upload contract image'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('File uploaded successfully:', uploadData);

    // Get public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('contract-images')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;

    // Insert contract data into database
    const submissionData = {
      service_type: serviceType,
      provider_name: providerName,
      total_cost: totalCost,
      service_date: serviceDate || null,
      city: city || null,
      zip_code: zipCode || null,
      contract_image_url: imageUrl,
      work_description: workDescription || null,
      notes: notes || null,
      submitter_email: submitterEmail || null,
      status: 'pending', // Requires admin approval
      verified: false,
      submission_date: new Date().toISOString()
    };

    console.log('Inserting contract data:', submissionData);

    const { data, error } = await supabase
      .from('service_contracts')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);

      // Try to cleanup uploaded file if database insert fails
      await supabase.storage
        .from('contract-images')
        .remove([filePath]);

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to submit contract'
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Contract submitted successfully:', data);

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contract submitted successfully. It will be reviewed and published soon.',
        contractId: data.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in submit-contract API:', error);

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
