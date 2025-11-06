import { createClient } from '@supabase/supabase-js';
import { c as cleanupExpiredVerifications } from '../../chunks/verification_CIzfnNXm.mjs';
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
    const body = await request.json().catch(() => ({}));
    const { hoursOld = 24, authToken } = body;
    const sanitizedAuthToken = sanitizeInput(authToken);
    const expectedAuthToken = undefined                                  ;
    if (expectedAuthToken && sanitizedAuthToken !== expectedAuthToken) ;
    if (typeof hoursOld !== "number" || hoursOld < 1 || hoursOld > 168) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "hoursOld must be a number between 1 and 168 (1 week)"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    console.log(`Starting cleanup of verifications older than ${hoursOld} hours...`);
    const cleanupResult = await cleanupExpiredVerifications(supabase, hoursOld);
    if (cleanupResult.error) {
      console.error("Error during cleanup:", cleanupResult.error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Database error during cleanup"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const { data: expiredRecords, error: expiredError } = await supabase.from("form_submissions").update({ verification_status: "expired" }).eq("verification_status", "pending").lt("verification_expires_at", now).select("id");
    let expiredCount = 0;
    if (!expiredError && expiredRecords) {
      expiredCount = expiredRecords.length;
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Cleanup completed successfully",
        statistics: {
          deletedRecords: cleanupResult.data?.length || 0,
          markedExpired: expiredCount,
          hoursOld,
          cleanupTime: (/* @__PURE__ */ new Date()).toISOString()
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in cleanup-expired API:", error);
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
async function GET({ request }) {
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
    const url = new URL(request.url);
    const authToken = sanitizeInput(url.searchParams.get("auth"));
    const hoursOld = parseInt(url.searchParams.get("hours") || "24");
    const expectedAuthToken = undefined                                  ;
    if (expectedAuthToken && authToken !== expectedAuthToken) ;
    const cleanupResult = await cleanupExpiredVerifications(supabase, hoursOld);
    if (cleanupResult.error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Database error during cleanup"
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
        message: "Manual cleanup completed",
        deletedCount: cleanupResult.data?.length || 0,
        hoursOld
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error in cleanup-expired GET:", error);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
