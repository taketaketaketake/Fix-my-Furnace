/**
 * API Route: Upload Photos
 * POST /api/upload-photos
 *
 * Handles secure photo uploads to Supabase Storage
 * Used by furnace diagnosis form
 */

export const prerender = false;

import { createClient } from '@supabase/supabase-js';
import { checkRateLimit, getClientIP } from '../../utils/rateLimit.js';

// Initialize Supabase client with service role for server-side operations
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// File validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILES = 6;
const STORAGE_BUCKET = 'Furnace Diagnosis Images';

function validateFile(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Each photo must be under 10MB' };
  }
  
  return { valid: true };
}

export async function POST({ request }) {
  console.log('=== upload-photos API called ===');
  
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

    // Parse multipart form data
    const formData = await request.formData();
    const files = formData.getAll('photos');
    
    console.log(`Received ${files.length} files for upload`);

    // Validate number of files
    if (files.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No files provided'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    if (files.length > MAX_FILES) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Maximum ${MAX_FILES} photos allowed`
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateFile(file);
      
      if (!validation.valid) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `File ${i + 1}: ${validation.error}`
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Upload files to Supabase Storage
    const photoUrls = [];
    const uploadErrors = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = `${Date.now()}_${i}_${file.name}`;
      
      try {
        // Convert File to ArrayBuffer for Supabase upload
        const arrayBuffer = await file.arrayBuffer();
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(fileName, arrayBuffer, {
            contentType: file.type,
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) {
          console.error(`Upload error for file ${i + 1}:`, error);
          uploadErrors.push(`File ${i + 1}: ${error.message}`);
          continue;
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(fileName);
        
        photoUrls.push(urlData.publicUrl);
        console.log(`Successfully uploaded file ${i + 1}: ${fileName}`);
        
      } catch (uploadError) {
        console.error(`Upload error for file ${i + 1}:`, uploadError);
        uploadErrors.push(`File ${i + 1}: Upload failed`);
      }
    }

    // Return results
    if (photoUrls.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'All photo uploads failed',
          details: uploadErrors
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Success response (even if some uploads failed)
    const response = {
      success: true,
      photoUrls: photoUrls,
      uploadedCount: photoUrls.length,
      totalFiles: files.length
    };

    if (uploadErrors.length > 0) {
      response.warnings = uploadErrors;
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in upload-photos API:', error);

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