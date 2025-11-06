import { createClient } from '@supabase/supabase-js';
import { v as verifyPhoneToken } from '../../chunks/verification_CIzfnNXm.mjs';
import { g as getClientIP, c as checkRateLimit } from '../../chunks/rateLimit_CTLfHQy0.mjs';
export { renderers } from '../../renderers.mjs';

function sanitizeInput(input) {
  return typeof input === "string" ? input.trim().slice(0, 500) : "";
}
const supabaseUrl = "https://ztvsfapoeekaxztahxsv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k";
const supabase = createClient(supabaseUrl, supabaseKey);
async function GET({ request, redirect }) {
  try {
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return redirect("/verification-error?error=rate-limited", 302);
    }
    const url = new URL(request.url);
    const token = sanitizeInput(url.searchParams.get("token"));
    if (!token) {
      return redirect("/verification-error?error=missing-token", 302);
    }
    const verificationResult = await verifyPhoneToken(supabase, token);
    if (!verificationResult.success) {
      const errorType = verificationResult.error.includes("expired") ? "expired" : "invalid";
      return redirect(`/verification-error?error=${errorType}&token=${token}`, 302);
    }
    return redirect("/verification-success", 302);
  } catch (error) {
    console.error("Error in verify-phone API:", error);
    return redirect("/verification-error?error=server-error", 302);
  }
}
async function POST({ redirect }) {
  return redirect("/verification-error?error=method-not-allowed", 302);
}
async function PUT({ redirect }) {
  return redirect("/verification-error?error=method-not-allowed", 302);
}
async function DELETE({ redirect }) {
  return redirect("/verification-error?error=method-not-allowed", 302);
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
