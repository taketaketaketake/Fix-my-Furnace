import { createClient } from '@supabase/supabase-js';
import { d as createVerificationRecord } from '../../chunks/verification_CIzfnNXm.mjs';
import { t as telnyxService } from '../../chunks/telnyx_ZfpfG1F9.mjs';
import { g as getClientIP, c as checkRateLimit } from '../../chunks/rateLimit_CTLfHQy0.mjs';
export { renderers } from '../../renderers.mjs';

function sanitizeInput(input) {
  return typeof input === "string" ? input.trim().slice(0, 500) : "";
}
const supabaseUrl = "https://ztvsfapoeekaxztahxsv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k";
const supabase = createClient(supabaseUrl, supabaseKey);
async function POST({ request }) {
  try {
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: 900
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "900"
          }
        }
      );
    }
    const body = await request.json();
    const { formData, phoneNumber, formSource } = body;
    if (!phoneNumber || !formData) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Phone number and form data are required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const sanitizedPhoneNumber = sanitizeInput(phoneNumber);
    const submissionData = {
      full_name: sanitizeInput(formData.name || formData.full_name),
      phone_number: sanitizedPhoneNumber,
      service_address: sanitizeInput(formData.address || formData.service_address || ""),
      furnace_issue: sanitizeInput(formData.issue || formData.message || formData.furnace_issue),
      form_source: sanitizeInput(formSource || "unknown"),
      photo_count: formData.photo_count || 0,
      photo_urls: formData.photo_urls || []
    };
    const verificationRecord = await createVerificationRecord(
      supabase,
      submissionData,
      sanitizedPhoneNumber
    );
    const smsResult = await telnyxService.sendVerificationSMS(
      sanitizedPhoneNumber,
      verificationRecord.verification_token
    );
    if (!smsResult.success) {
      console.error("Failed to send verification SMS:", smsResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to send verification SMS. Please try again."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Verification SMS sent successfully",
        submissionId: verificationRecord.id,
        phoneNumber: sanitizedPhoneNumber
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in send-verification API:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    {
      status: 405,
      headers: { "Content-Type": "application/json" }
    }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
