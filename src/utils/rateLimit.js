/**
 * Simple in-memory rate limiting utility
 * Tracks requests per IP address with configurable time windows
 */

const attempts = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  const userAttempts = attempts.get(ip) || [];
  const recentAttempts = userAttempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length >= maxAttempts) {
    return false;
  }
  
  attempts.set(ip, [...recentAttempts, now]);
  return true;
}

function getClientIP(request) {
  // Try various headers for IP extraction (proxy-aware)
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') ||
         'unknown';
}

export { checkRateLimit, getClientIP };