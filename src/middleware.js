/**
 * Astro Middleware
 * Handles CSRF token generation and session management
 */

import { defineMiddleware, sequence } from 'astro:middleware';
import { generateCsrfToken, generateSessionId } from './utils/csrf.js';

const csrf = defineMiddleware(async (context, next) => {
  console.log('[MIDDLEWARE] CSRF middleware called for:', context.url.pathname);

  // Get or create session ID from cookies
  let sessionId = context.cookies.get('session_id')?.value;

  if (!sessionId) {
    // Generate new session ID for first-time visitors
    sessionId = generateSessionId();
    console.log('[MIDDLEWARE] Generated new session ID:', sessionId);

    // Set session cookie (expires in 24 hours)
    context.cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      secure: import.meta.env.PROD, // Only use secure in production
      sameSite: 'lax',
      maxAge: 86400 // 24 hours
    });
  } else {
    console.log('[MIDDLEWARE] Found existing session ID:', sessionId);
  }

  // Generate CSRF token and make it available in Astro.locals
  const csrfToken = generateCsrfToken(sessionId);
  context.locals.csrfToken = csrfToken;
  context.locals.sessionId = sessionId;

  console.log('[MIDDLEWARE] Set CSRF token:', csrfToken.substring(0, 10) + '...');

  return next();
});

export const onRequest = sequence(csrf);
