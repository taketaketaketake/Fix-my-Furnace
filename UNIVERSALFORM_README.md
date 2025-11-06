# UniversalForm Component Documentation

## Overview
The UniversalForm component is a reusable, secure form component with built-in CSRF protection, phone validation, and address autocomplete.

## Features
- ✅ CSRF token protection
- ✅ Phone number formatting and validation
- ✅ Mapbox address autocomplete
- ✅ Multiple field types: text, tel, email, textarea, select, address
- ✅ Customizable styling and error messages
- ✅ Rate limiting
- ✅ Spam protection (honeypot)

## Usage

```astro
---
import UniversalForm from '../components/UniversalForm.astro';

const fields = [
  { name: 'name', type: 'text', label: 'Full Name', required: true },
  { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
  { name: 'email', type: 'email', label: 'Email Address', required: false },
  { name: 'address', type: 'address', label: 'Service Address', required: true },
  { name: 'message', type: 'textarea', label: 'Your Message', placeholder: 'Tell us about your issue...' }
];
---

<UniversalForm
  formId="contact-form"
  formSource="/api/submit-form"
  title="Get In Touch"
  description="Fill out the form below and we'll contact you soon"
  fields={fields}
  submitText="Send Message"
/>
```

## Field Types

### text
Basic text input field.

### tel
Phone number with automatic formatting to (XXX) XXX-XXXX format.

### email
Email input with validation.

### textarea
Multi-line text input.

### select
Dropdown menu. Requires `options` array.
```javascript
{
  name: 'service',
  type: 'select',
  label: 'Service Type',
  options: ['Furnace Repair', 'AC Service', 'Installation']
}
```

### address
Address input with Mapbox autocomplete. Requires `PUBLIC_MAPBOX_TOKEN` environment variable.

## Environment Variables

Create a `.env` file with:

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Mapbox (for address autocomplete)
PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Development: Disable CSRF for testing (DO NOT use in production)
# DISABLE_CSRF=true
```

## Troubleshooting

### Issue: "Security validation failed"

**Cause:** CSRF middleware is not running or session cookie is not being set.

**Solution 1 - Restart dev server:**
```bash
npm run dev
```
The middleware should automatically be detected. Check console for:
```
[MIDDLEWARE] CSRF middleware called for: /your-page
```

**Solution 2 - Temporarily disable CSRF for testing:**
Add to your `.env` file:
```bash
DISABLE_CSRF=true
```
**⚠️ WARNING:** Never use `DISABLE_CSRF=true` in production!

**Solution 3 - Check middleware logs:**
Look for these console messages:
- `[MIDDLEWARE] CSRF middleware called for: /test-form` - Middleware is running
- `[MIDDLEWARE] Generated new session ID:` - Session created
- `[MIDDLEWARE] Set CSRF token:` - Token generated

If you don't see these messages, the middleware isn't running. Try:
1. Restarting the dev server
2. Checking that `src/middleware.js` exists
3. Updating Astro: `npm update astro`

### Issue: Form data not submitting

Check the browser console for errors. The form handler logs all steps:
```
=== submit-form API called ===
Body received: { formData: {...}, formSource: '...', _csrf: '...' }
```

### Issue: Address autocomplete not working

1. Verify `PUBLIC_MAPBOX_TOKEN` is set in `.env`
2. Check browser console for Mapbox API errors
3. Ensure Mapbox token has Geocoding API enabled

## File Structure

```
src/
├── components/
│   └── UniversalForm.astro        # Main form component
├── scripts/
│   └── universalForm.js           # Client-side form logic
├── utils/
│   ├── csrf.js                    # CSRF token utilities
│   ├── rateLimit.js              # Rate limiting
│   └── verification.js           # Phone verification
├── middleware.js                  # Astro middleware for CSRF
└── pages/
    └── api/
        └── submit-form.js        # Form submission endpoint
```

## API Endpoint

The default endpoint is `/api/submit-form`. You can specify a different endpoint via the `formSource` prop.

### Creating Custom Endpoints

```javascript
// src/pages/api/custom-form.js
import { verifyCsrfToken } from '../../utils/csrf.js';

export async function POST({ request, cookies }) {
  const { formData, _csrf } = await request.json();

  // Verify CSRF
  const sessionId = cookies.get('session_id')?.value;
  if (!verifyCsrfToken(sessionId, _csrf)) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid CSRF token'
    }), { status: 403 });
  }

  // Your custom logic here...

  return new Response(JSON.stringify({ success: true }));
}
```

## Security Features

### CSRF Protection
- Tokens are generated per-session
- One-time use tokens (consumed after verification)
- 1-hour expiration
- Automatic cleanup of expired tokens

### Rate Limiting
- Prevents spam submissions
- Configurable limits in `src/utils/rateLimit.js`

### Honeypot
- Hidden field to catch bots
- Automatically included in all forms

## Customization

### Styling
Pass custom classes via the `className` prop:

```astro
<UniversalForm
  formId="styled-form"
  formSource="/api/submit-form"
  fields={fields}
  className="bg-white p-6 rounded-lg shadow-lg"
/>
```

### Success/Error Messages
Modify the messages in `src/components/UniversalForm.astro` lines 68-94.

### Field Styling
Edit the Tailwind classes in the field rendering sections (lines 113-193).

## Support

For issues or questions, check:
1. Browser console for errors
2. Server console for API logs
3. Middleware logs for CSRF token generation
