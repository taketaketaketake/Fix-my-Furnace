# Lead Generation & Provider Network System

## Overview

Fix My Furnace is a lead generation platform that connects Michigan homeowners with vetted HVAC service providers. The system has three main components:

1. **Provider Signup** - HVAC professionals apply to join the network
2. **Provider Directory** - Public-facing showcase of approved providers
3. **Lead Routing** - Manual assignment of homeowner leads to providers

This is a **pure lead generation business model** where you act as the middleman, collecting leads from homeowners and routing them to qualified service providers in your network.

---

## System Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   Homeowners    │────────▶│  Lead Forms      │────────▶│  form_          │
│                 │         │  (Multiple CTAs) │         │  submissions    │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                                                    │
                                                                    │ Manual
                                                                    │ Review
                                                                    ▼
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  HVAC Providers │────────▶│  Provider Signup │────────▶│  service_       │
│                 │         │  /partners/apply │         │  providers      │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        ▲                                                          │
        │                                                          │ Approve &
        │                                                          │ Assign
        │                   ┌──────────────────┐                  ▼
        │                   │  Public Directory│         ┌─────────────────┐
        └───────────────────│  /partners       │◀────────│  lead_          │
                           └──────────────────┘         │  assignments    │
                           (Builds Trust + SEO)         └─────────────────┘
                                                         (You notify provider)
```

---

## 1. Provider Signup Page

**URL**: `/partners/apply`

### Purpose
Allows HVAC contractors across Michigan to apply to join your provider network.

### What Providers Submit
- **Business Information**
  - Business name
  - Contact person name
  - Email address (unique)
  - Phone number
  - Business address
  - Website (optional)

- **Service Coverage**
  - Service areas (comma-separated cities, e.g., "Detroit, Warren, Dearborn")
  - Services offered (comma-separated, e.g., "Furnace Repair, Installation")

- **Capacity Management**
  - Maximum leads per week (1-5, 5-10, 10-20, 20+)

- **Credentials**
  - Years in business (optional)
  - License number (optional)
  - Business description (optional)

### Technical Details

**Form Validation**:
- Required: business name, contact name, email, phone, service areas, services offered
- Email must be unique (duplicate detection)
- Honeypot spam protection
- Rate limiting: 5 submissions per 15 minutes per IP

**Data Processing**:
- Comma-separated inputs converted to PostgreSQL arrays
- Service areas: `["Detroit", "Warren", "Dearborn"]`
- Services offered: `["Furnace Repair", "Furnace Installation"]`

**Default Status**:
- `status = 'pending'` (requires manual approval)
- `accepting_leads = true`
- `show_in_directory = false` (hidden until approved)

**API Endpoint**: `POST /api/submit-provider-application`

**Database Table**: `service_providers`

### Workflow
1. Provider fills out application form
2. Submits → saved to `service_providers` table
3. Status: `pending`
4. **You review** application in Supabase
5. **You approve or reject** (see SQL queries below)

---

## 2. Provider Directory

**URL**: `/partners`

### Purpose
Public-facing page that showcases your vetted provider network. Builds trust with homeowners and provides SEO value through location and service keywords.

### Features

**Dynamic Filtering**:
- Filter by **Service Type**: Furnace Repair, Installation, Boiler, Duct Cleaning, etc.
- Filter by **Location**: Detroit, Grand Rapids, Ann Arbor, and 14+ Michigan cities
- Real-time filtering (no page reload)
- Reset filters button

**Provider Cards Display**:
- Business name
- Logo (if provided) or default icon
- Business description
- Years in business badge
- Service areas (first 4 shown, "+X more" badge)
- Services offered (first 3 shown, "+X more" badge)
- Website link (opens in new tab)

**States**:
- **Loading state**: Spinner while fetching providers
- **Empty state**: Message when no providers match filters
- **Provider grid**: 3-column layout on desktop, responsive on mobile

### Visibility Rules

Providers appear in the directory **only when BOTH conditions are true**:
1. `status = 'active'` (approved by you)
2. `show_in_directory = true` (opted into public listing)

This gives you control:
- Approve providers for lead routing without showing them publicly
- Feature your best providers
- Hide providers temporarily without deactivating them

### Technical Details

**API Endpoint**: `GET /api/get-providers`

**Query Parameters**:
- `?service=furnace-repair` (optional)
- `?area=detroit` (optional)

**Caching**: 5-minute cache for performance

**SEO Benefits**:
- Location keywords (Detroit, Grand Rapids, Ann Arbor, etc.)
- Service keywords (Furnace Repair, HVAC, Boiler, etc.)
- Trusted network social proof
- Provider website backlinks

---

## 3. Lead Routing System

### Overview
This is a **manual lead routing system**. You review leads, match them to providers, and notify providers yourself. This gives you full control over quality and assignments.

### How It Works

#### Step 1: Homeowner Submits Lead
- Homeowner fills out form on your site (contact, service pages, landing pages)
- Lead saved to `form_submissions` table with:
  - Name, phone, email
  - Service address
  - Issue description
  - Form source (tracking)
  - Status: `pending`

#### Step 2: You Review Lead
- Check lead details in Supabase Table Editor
- View `form_submissions` table
- Note: service needed, location, urgency

#### Step 3: Find Matching Providers
**SQL Query**:
```sql
-- Example: Lead in Detroit needs Furnace Repair
SELECT
  id,
  business_name,
  contact_name,
  email,
  phone,
  service_areas,
  services_offered,
  max_leads_per_week
FROM service_providers
WHERE status = 'active'
  AND accepting_leads = TRUE
  AND 'Detroit' = ANY(service_areas)
  AND 'Furnace Repair' = ANY(services_offered)
ORDER BY created_at ASC;
```

#### Step 4: Check Provider Capacity
```sql
-- Check how many leads this provider got this week
SELECT COUNT(*) as lead_count
FROM lead_assignments
WHERE provider_id = 'provider-uuid-here'
  AND created_at >= NOW() - INTERVAL '7 days';
```

Compare to `max_leads_per_week` to ensure they're not over capacity.

#### Step 5: Assign Lead to Provider
```sql
INSERT INTO lead_assignments (submission_id, provider_id, status, notes)
VALUES (
  'lead-uuid-from-form-submissions',
  'provider-uuid-from-service-providers',
  'sent',
  'Detroit furnace repair - homeowner needs same-day service'
);
```

#### Step 6: Notify Provider
**Manual options**:
- Email the lead details to provider's email
- SMS to provider's phone
- Call the provider directly

**Lead details to send**:
- Homeowner name and phone
- Service address
- Issue description
- Urgency/preferred timing
- Your lead ID for tracking

#### Step 7: Track Status
Update assignment status as provider progresses:

```sql
-- Provider contacted homeowner
UPDATE lead_assignments
SET status = 'contacted'
WHERE id = 'assignment-uuid';

-- Job completed
UPDATE lead_assignments
SET status = 'completed'
WHERE id = 'assignment-uuid';

-- No response from provider
UPDATE lead_assignments
SET status = 'no-response',
    notes = 'Provider did not respond within 24 hours'
WHERE id = 'assignment-uuid';
```

---

## Database Schema

### `service_providers` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | Timestamp | Application date |
| `business_name` | Text | Company name |
| `contact_name` | Text | Contact person |
| `email` | Text | Email (unique) |
| `phone` | Text | Phone number |
| `business_address` | Text | Business location |
| `website` | Text | Website URL |
| `service_areas` | Text[] | Array of cities served |
| `services_offered` | Text[] | Array of services |
| `max_leads_per_week` | Integer | Capacity limit |
| `accepting_leads` | Boolean | Currently accepting? |
| `status` | Text | pending, active, paused, rejected |
| `show_in_directory` | Boolean | Show on /partners? |
| `years_in_business` | Integer | Experience |
| `license_number` | Text | License info |
| `description` | Text | Business description |
| `logo_url` | Text | Logo image |
| `admin_notes` | Text | Your internal notes |

### `form_submissions` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | Timestamp | Submission date |
| `full_name` | Text | Homeowner name |
| `phone_number` | Text | Contact phone |
| `email` | Text | Contact email |
| `service_address` | Text | Service location |
| `furnace_issue` | Text | Issue type |
| `message` | Text | Description |
| `form_source` | Text | Tracking source |
| `status` | Text | pending, assigned, completed |

### `lead_assignments` Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `created_at` | Timestamp | Assignment date |
| `submission_id` | UUID | FK to form_submissions |
| `provider_id` | UUID | FK to service_providers |
| `status` | Text | sent, contacted, completed, no-response |
| `notes` | Text | Admin notes |
| `assigned_at` | Timestamp | When assigned |

---

## Common SQL Queries

### Provider Management

**View pending applications**:
```sql
SELECT * FROM service_providers
WHERE status = 'pending'
ORDER BY created_at DESC;
```

**Approve provider (with directory listing)**:
```sql
UPDATE service_providers
SET status = 'active',
    approved_at = NOW(),
    show_in_directory = TRUE
WHERE id = 'provider-uuid-here';
```

**Approve provider (without directory listing)**:
```sql
UPDATE service_providers
SET status = 'active',
    approved_at = NOW(),
    show_in_directory = FALSE
WHERE id = 'provider-uuid-here';
```

**Pause provider temporarily**:
```sql
UPDATE service_providers
SET accepting_leads = FALSE
WHERE id = 'provider-uuid-here';
```

**Hide from directory (keep active for leads)**:
```sql
UPDATE service_providers
SET show_in_directory = FALSE
WHERE id = 'provider-uuid-here';
```

### Lead Routing

**Find unassigned leads**:
```sql
SELECT * FROM form_submissions
WHERE id NOT IN (SELECT submission_id FROM lead_assignments)
  AND status = 'pending'
ORDER BY created_at DESC;
```

**Find providers for specific lead**:
```sql
-- Replace 'Detroit' and 'Furnace Repair' with actual lead details
SELECT * FROM service_providers
WHERE status = 'active'
  AND accepting_leads = TRUE
  AND 'Detroit' = ANY(service_areas)
  AND 'Furnace Repair' = ANY(services_offered)
ORDER BY created_at ASC;
```

**Check provider's weekly lead count**:
```sql
SELECT COUNT(*) FROM lead_assignments
WHERE provider_id = 'provider-uuid-here'
  AND created_at >= NOW() - INTERVAL '7 days';
```

**View all assignments for a provider**:
```sql
SELECT
  la.id,
  la.created_at,
  la.status,
  fs.full_name,
  fs.phone_number,
  fs.service_address,
  fs.furnace_issue
FROM lead_assignments la
JOIN form_submissions fs ON la.submission_id = fs.id
WHERE la.provider_id = 'provider-uuid-here'
ORDER BY la.created_at DESC;
```

### Reporting

**Provider performance report**:
```sql
SELECT
  sp.business_name,
  COUNT(la.id) as total_leads,
  COUNT(CASE WHEN la.status = 'completed' THEN 1 END) as completed_leads,
  COUNT(CASE WHEN la.status = 'no-response' THEN 1 END) as no_response
FROM service_providers sp
LEFT JOIN lead_assignments la ON sp.id = la.provider_id
WHERE sp.status = 'active'
GROUP BY sp.business_name
ORDER BY total_leads DESC;
```

**Leads by service type**:
```sql
SELECT
  furnace_issue,
  COUNT(*) as count
FROM form_submissions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY furnace_issue
ORDER BY count DESC;
```

**Leads by location**:
```sql
SELECT
  service_address,
  COUNT(*) as count
FROM form_submissions
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY service_address
ORDER BY count DESC;
```

---

## Setup Instructions

### 1. Run Database Schema
1. Go to Supabase project dashboard
2. Navigate to SQL Editor
3. Copy contents of `supabase-schema-providers.sql`
4. Run the SQL script
5. Verify tables created: `service_providers`, `lead_assignments`

### 2. Test Provider Signup
1. Visit: `/partners/apply`
2. Fill out test application
3. Check Supabase `service_providers` table
4. Verify status is `pending`

### 3. Approve Test Provider
```sql
UPDATE service_providers
SET status = 'active', show_in_directory = TRUE
WHERE email = 'test@example.com';
```

### 4. Test Provider Directory
1. Visit: `/partners`
2. Verify test provider appears
3. Test service filter
4. Test area filter
5. Test reset button

### 5. Test Lead Routing
1. Submit lead via contact form
2. Check `form_submissions` table
3. Run matching query to find providers
4. Create assignment in `lead_assignments`
5. Notify provider manually

---

## File Structure

```
/home/user/Fix-my-Furnace/
├── supabase-schema-providers.sql          # Database schema
├── PROVIDER_SIGNUP_SETUP.md               # Original setup guide
├── README_PROVIDER_SYSTEM.md              # This file
├── src/
│   ├── pages/
│   │   ├── partners/
│   │   │   ├── index.astro                # Public directory (/partners)
│   │   │   └── apply.astro                # Signup form (/partners/apply)
│   │   └── api/
│   │       ├── submit-provider-application.js  # Provider signup API
│   │       └── get-providers.js           # Directory data API
```

---

## Workflow Examples

### Example 1: New Provider Application

1. **Provider visits** `/partners/apply`
2. **Fills out form**:
   - Business: "ABC Heating & Cooling"
   - Areas: "Detroit, Warren, Dearborn"
   - Services: "Furnace Repair, Installation, Emergency HVAC"
   - Leads/week: 10-20
3. **Submits** → Saved with `status = 'pending'`
4. **You review** in Supabase
5. **You approve**:
   ```sql
   UPDATE service_providers
   SET status = 'active', show_in_directory = TRUE
   WHERE business_name = 'ABC Heating & Cooling';
   ```
6. **Provider now appears** on `/partners` directory
7. **Provider is eligible** for lead routing

### Example 2: Homeowner Lead → Provider Assignment

1. **Homeowner** fills form on `/contact`:
   - Name: Sarah Johnson
   - Phone: (313) 555-7890
   - Address: 123 Main St, Detroit, MI 48201
   - Issue: "Furnace not heating"
2. **Lead saved** to `form_submissions`
3. **You search** for providers:
   ```sql
   SELECT * FROM service_providers
   WHERE 'Detroit' = ANY(service_areas)
     AND 'Furnace Repair' = ANY(services_offered)
     AND status = 'active'
     AND accepting_leads = TRUE;
   ```
4. **Found**: ABC Heating & Cooling (they serve Detroit)
5. **Check capacity**: They have 5 leads this week, max is 20 ✓
6. **Assign lead**:
   ```sql
   INSERT INTO lead_assignments (submission_id, provider_id, status)
   VALUES ('sarah-lead-uuid', 'abc-provider-uuid', 'sent');
   ```
7. **Email provider**:
   > Subject: New Furnace Repair Lead - Detroit
   >
   > Customer: Sarah Johnson
   > Phone: (313) 555-7890
   > Address: 123 Main St, Detroit, MI 48201
   > Issue: Furnace not heating
   >
   > Please contact within 2 hours.
8. **Provider contacts** Sarah
9. **Update status**:
   ```sql
   UPDATE lead_assignments
   SET status = 'contacted'
   WHERE id = 'assignment-uuid';
   ```

### Example 3: Directory Visitor → Application

1. **Homeowner** visits `/partners` to see providers
2. **Sees**: 15 approved providers across Michigan
3. **Filters** by "Detroit" + "Furnace Repair"
4. **Sees**: 5 matching providers
5. **Builds trust** - "This site has real professionals"
6. **Clicks** "Request Service" CTA
7. **Fills form** → Becomes a lead for routing

---

## Benefits of This System

### For You (Lead Generator)
- **Full control** over lead quality and assignments
- **Flexible matching** based on location, service type, capacity
- **Performance tracking** per provider
- **Revenue opportunities** (charge per lead or subscription)
- **Scalable** - add providers as lead volume grows

### For Providers
- **Pre-qualified leads** - homeowners actively seeking service
- **Local matching** - only get leads in their service areas
- **Capacity control** - set their own lead volume limits
- **No cold calling** - warm leads come to them
- **Professional branding** - listed in public directory

### For Homeowners
- **Trusted providers** - vetted professionals only
- **Fast matching** - you route to available providers quickly
- **Local service** - providers in their area
- **Multiple options** - see provider directory
- **Quality assurance** - you manage the network

---

## Next Steps & Future Enhancements

### Immediate Priorities
1. ✅ Provider signup form
2. ✅ Public provider directory
3. ✅ Manual lead routing process
4. ⏳ Run database schema in Supabase
5. ⏳ Test with real providers

### Phase 2: Admin Dashboard
- Simple admin page to view/approve providers
- Lead assignment interface
- Provider performance metrics
- One-click lead routing

### Phase 3: Automation
- Email notifications (new provider, lead assigned)
- Automated lead matching suggestions
- SMS alerts to providers
- Lead distribution rules (round-robin, capacity-based)

### Phase 4: Business Model
- Payment integration (charge per lead)
- Subscription plans for providers
- Lead pricing by service type/location
- Provider invoicing and billing

---

## Support & Troubleshooting

**Common Issues**:

**Provider not showing in directory?**
- Check `status = 'active'` AND `show_in_directory = true`
- Verify data saved as arrays (service_areas, services_offered)

**Filters not working?**
- Check browser console for JavaScript errors
- Verify API endpoint returning data: `/api/get-providers`
- Check filter values match provider data format

**Form submission failing?**
- Check rate limiting (5 per 15 min per IP)
- Verify required fields filled
- Check for duplicate email
- Review browser Network tab for error details

**Database Questions**:
- Use Supabase Table Editor to view data
- SQL Editor for complex queries
- Check RLS policies if access denied

---

**Documentation Version**: 1.0
**Last Updated**: 2025-11-09
**Status**: Ready for production deployment
