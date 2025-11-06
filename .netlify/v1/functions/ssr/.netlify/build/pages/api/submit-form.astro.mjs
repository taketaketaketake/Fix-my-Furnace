import { createClient } from '@supabase/supabase-js';
import { g as getClientIP, c as checkRateLimit } from '../../chunks/rateLimit_CTLfHQy0.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
function sanitizeInput(input) {
  return typeof input === "string" ? input.trim().slice(0, 500) : "";
}
const supabaseUrl = "https://ztvsfapoeekaxztahxsv.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjEwNTMwMiwiZXhwIjoyMDc3NjgxMzAyfQ.byRD4T6JVm9uRecY9L07HHJfh65P7aRkMTvdSQYdJ0w";
const supabase = createClient(supabaseUrl, supabaseServiceKey);
async function POST({ request, cookies }) {
  console.log("=== submit-form API called ===");
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
    const { formData, formSource, photoUrls, photoCount } = body;
    console.log("Body received:", { formData, formSource, photoCount });
    if (!formData || !formSource) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Form data and source are required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    if (!formData.name || !formData.phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name and phone number are required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const submissionData = {
      full_name: sanitizeInput(formData.name),
      phone_number: sanitizeInput(formData.phone),
      email: sanitizeInput(formData.email || ""),
      service_address: sanitizeInput(formData.address || "Not provided"),
      furnace_issue: sanitizeInput(formData.issue || ""),
      // Only for dropdown issue field
      message: sanitizeInput(formData.message || ""),
      // For general text/textarea fields
      form_source: sanitizeInput(formSource),
      photo_count: photoCount || 0,
      photo_urls: photoUrls || [],
      status: "pending",
      verification_status: "pending"
    };
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log("Current user:", userData?.user?.id || "anonymous");
    console.log("Supabase auth error:", userError?.message || "none");
    const { data, error } = await supabase.from("form_submissions").insert([submissionData]).select().single();
    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to submit form"
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
        message: "Form submitted successfully",
        submissionId: data.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in submit-form API:", error);
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
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
