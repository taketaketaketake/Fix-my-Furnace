import { createClient } from '@supabase/supabase-js';
import { a as canResendVerification, g as generateVerificationCode, b as generateExpirationTime } from '../../chunks/verification_CIzfnNXm.mjs';
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
    const { phoneNumber, submissionId } = body;
    if (!phoneNumber) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Phone number is required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const sanitizedPhoneNumber = sanitizeInput(phoneNumber);
    const resendCheck = await canResendVerification(supabase, sanitizedPhoneNumber);
    if (!resendCheck.canResend) {
      return new Response(
        JSON.stringify({
          success: false,
          error: resendCheck.error,
          attemptsRemaining: resendCheck.attemptsRemaining || 0
        }),
        {
          status: 429,
          // Too Many Requests
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const { data: records, error: findError } = await supabase.from("form_submissions").select("*").eq("phone_number", sanitizedPhoneNumber).eq("verification_status", "pending").order("created_at", { ascending: false }).limit(1);
    if (findError || !records || records.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No pending verification found for this phone number"
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const record = records[0];
    const newVerificationCode = generateVerificationCode();
    const newExpirationTime = generateExpirationTime(10);
    const { data: updatedRecord, error: updateError } = await supabase.from("form_submissions").update({
      verification_code: newVerificationCode,
      verification_expires_at: newExpirationTime,
      verification_attempts: record.verification_attempts + 1
    }).eq("id", record.id).select().single();
    if (updateError) {
      console.error("Error updating verification record:", updateError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to update verification record"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const smsResult = await telnyxService.sendResendVerificationSMS(
      sanitizedPhoneNumber,
      record.verification_token,
      updatedRecord.verification_attempts
    );
    if (!smsResult.success) {
      console.error("Failed to resend verification SMS:", smsResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to resend verification SMS. Please try again."
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
        message: "Verification SMS resent successfully",
        attemptsRemaining: Math.max(0, 3 - updatedRecord.verification_attempts),
        phoneNumber: sanitizedPhoneNumber
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in resend-verification API:", error);
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
