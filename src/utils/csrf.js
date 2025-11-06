/**
 * CSRF Token Utilities
 * Generates and verifies CSRF tokens for form protection
 */

import crypto from 'crypto';

const tokenStore = new Map();
const TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

/**
 * Generate a CSRF token for a given session ID
 * @param {string} sessionId - Unique session identifier
 * @returns {string} Generated CSRF token
 */
export function generateCsrfToken(sessionId) {
  // Clean up expired tokens
  cleanupExpiredTokens();

  // Generate a random token
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = Date.now();

  // Store token with session ID and timestamp
  if (!tokenStore.has(sessionId)) {
    tokenStore.set(sessionId, []);
  }

  const sessionTokens = tokenStore.get(sessionId);
  sessionTokens.push({ token, timestamp });

  // Keep only last 5 tokens per session
  if (sessionTokens.length > 5) {
    sessionTokens.shift();
  }

  return token;
}

/**
 * Verify a CSRF token against a session ID
 * @param {string} sessionId - Session identifier to verify against
 * @param {string} token - Token to verify
 * @returns {boolean} True if token is valid
 */
export function verifyCsrfToken(sessionId, token) {
  if (!sessionId || !token) {
    return false;
  }

  const sessionTokens = tokenStore.get(sessionId);
  if (!sessionTokens || sessionTokens.length === 0) {
    return false;
  }

  const now = Date.now();

  // Check if token exists and is not expired
  const validToken = sessionTokens.find(t => {
    const isExpired = (now - t.timestamp) > TOKEN_EXPIRY;
    return t.token === token && !isExpired;
  });

  if (validToken) {
    // Remove used token (one-time use)
    const index = sessionTokens.indexOf(validToken);
    sessionTokens.splice(index, 1);
    return true;
  }

  return false;
}

/**
 * Clean up expired tokens from the store
 */
function cleanupExpiredTokens() {
  const now = Date.now();

  for (const [sessionId, tokens] of tokenStore.entries()) {
    const validTokens = tokens.filter(t => (now - t.timestamp) <= TOKEN_EXPIRY);

    if (validTokens.length === 0) {
      tokenStore.delete(sessionId);
    } else {
      tokenStore.set(sessionId, validTokens);
    }
  }
}

/**
 * Generate a session ID for anonymous users
 * @returns {string} Random session ID
 */
export function generateSessionId() {
  return crypto.randomBytes(16).toString('hex');
}
