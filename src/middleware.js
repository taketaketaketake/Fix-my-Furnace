/**
 * Astro Middleware
 * Handles CSRF token generation and session management
 */

import { generateCsrfToken, generateSessionId } from './utils/csrf.js';

export async function onRequest(context, next) {
  // Get or create session ID from cookies
  let sessionId = context.cookies.get('session_id')?.value;

  if (!sessionId) {
    // Generate new session ID for first-time visitors
    sessionId = generateSessionId();

    // Set session cookie (expires in 24 hours)
    context.cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD, // Only use secure in production
      sameSite: 'lax',
      maxAge: 86400 // 24 hours
    });
  }

  // Generate CSRF token and make it available in Astro.locals
  context.locals.csrfToken = generateCsrfToken(sessionId);
  context.locals.sessionId = sessionId;

  return next();
}
