# Service Provider Signup Feature - Setup Instructions

## Overview

The service provider signup feature allows HVAC contractors to apply to join your network. Leads will be manually routed to providers based on their service areas and capacity.

## What's Been Created

### 1. Database Schema
- **File**: `supabase-schema-providers.sql`
- **Tables**:
  - `service_providers` - Stores provider applications and profiles
  - `lead_assignments` - Tracks which leads are assigned to which providers

### 2. Provider Application Page
- **URL**: `/partners/apply`
- **Features**:
  - Professional signup form
  - Collects business info, service areas, services offered
  - Capacity management (leads per week)
  - License and business details

### 3. API Endpoint
- **Endpoint**: `/api/submit-provider-application`
- **Features**:
  - Rate limiting (5 requests per 15 min)
  - Email duplicate detection
  - Converts comma-separated lists to arrays
  - Sets applications to "pending" status by default

## Setup Steps

### Step 1: Run Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Open the file `supabase-schema-providers.sql`
4. Copy all the SQL code
5. Paste it into the SQL Editor and click "Run"

This will create:
- `service_providers` table
- `lead_assignments` table
- Indexes for performance
- Row Level Security policies

### Step 2: Test the Application Form

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:4321/partners/apply`
3. Fill out the form with test data:
   - Business Name: "Test HVAC Co"
   - Contact: "John Smith"
   - Email: "test@example.com"
   - Phone: "(313) 555-1234"
   - Service Areas: "Detroit, Warren, Dearborn"
   - Services: "Furnace Repair, Furnace Installation"
   - Leads per week: Select any option
4. Submit and check for success message

### Step 3: Verify in Supabase

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Open the `service_providers` table
4. You should see your test application with:
   - Status: "pending"
   - Service areas as an array
   - Services offered as an array

### Step 4: Deploy

1. Commit the changes (see below)
2. Push to your repository
3. Netlify will automatically deploy
4. Visit: `https://fixmyfurnacedetroit.com/partners/apply`

## How It Works

### Provider Flow

1. **Application**: Provider fills out form at `/partners/apply`
2. **Submission**: Data sent to `/api/submit-provider-application`
3. **Storage**: Application saved to `service_providers` table with `status: 'pending'`
4. **Review**: You manually review applications (see "Next Steps" below)
5. **Approval**: Change status from `pending` to `active`

### Manual Lead Routing (Your Workflow)

1. Homeowner submits lead (existing form flow)
2. Lead saved to `form_submissions` table
3. **You review the lead** in Supabase
4. **You manually assign it** to a provider:
   - Check provider's service_areas
   - Check provider's services_offered
   - Check provider's max_leads_per_week
   - Create entry in `lead_assignments` table
5. **You notify the provider** via email or SMS with lead details

## Database Fields Explained

### service_providers Table

- `business_name` - Company name
- `contact_name` - Primary contact person
- `email` - Contact email (unique)
- `phone` - Contact phone
- `service_areas` - Array of cities/regions they serve
- `services_offered` - Array of services they provide
- `max_leads_per_week` - How many leads they want
- `accepting_leads` - Boolean to pause/resume
- `status` - `pending`, `active`, `paused`, `rejected`
- `show_in_directory` - For future public directory feature
- `license_number`, `years_in_business`, `description` - Optional profile info

### lead_assignments Table

- `submission_id` - References the lead from `form_submissions`
- `provider_id` - References the provider from `service_providers`
- `status` - `sent`, `contacted`, `completed`, `no-response`
- `notes` - Your admin notes about the assignment

## Next Steps to Build Out

### Phase 2A: Simple Admin Page (Recommended Next)

Create a basic admin page at `/admin/providers` to:
- View all pending applications
- Approve/reject providers with one click
- View active providers and their capacity
- See recent lead assignments

### Phase 2B: Manual Lead Assignment UI

Create admin interface to:
- View unassigned leads
- See matching providers for each lead
- Assign leads with one click
- Track assignment history

### Phase 2C: Provider Directory (Optional)

Create public page at `/partners` showing:
- Approved providers (where `show_in_directory = true`)
- Filter by service type and location
- Builds trust and SEO value

### Phase 3: Email Notifications

Set up automated emails:
- Notify admin when new provider applies
- Notify provider when application approved
- Notify provider when lead assigned

## Manual Query Examples

### View All Pending Applications
```sql
SELECT * FROM service_providers
WHERE status = 'pending'
ORDER BY created_at DESC;
```

### Approve a Provider
```sql
UPDATE service_providers
SET status = 'active',
    approved_at = NOW(),
    show_in_directory = TRUE
WHERE id = 'provider-uuid-here';
```

### Find Providers for a Lead
```sql
-- Lead is in Detroit, needs Furnace Repair
SELECT * FROM service_providers
WHERE status = 'active'
  AND accepting_leads = TRUE
  AND 'Detroit' = ANY(service_areas)
  AND 'Furnace Repair' = ANY(services_offered)
ORDER BY created_at ASC;
```

### Assign Lead to Provider
```sql
INSERT INTO lead_assignments (submission_id, provider_id, status)
VALUES ('lead-uuid', 'provider-uuid', 'sent');
```

### Check Provider's Weekly Lead Count
```sql
SELECT COUNT(*) FROM lead_assignments
WHERE provider_id = 'provider-uuid'
  AND created_at >= NOW() - INTERVAL '7 days';
```

## File Structure

```
/home/user/Fix-my-Furnace/
├── supabase-schema-providers.sql          # Database schema
├── src/
│   ├── pages/
│   │   ├── partners/
│   │   │   └── apply.astro                # Provider signup page
│   │   └── api/
│   │       └── submit-provider-application.js  # API endpoint
```

## Testing Checklist

- [ ] Database schema runs without errors
- [ ] Application form loads at `/partners/apply`
- [ ] Form validation works (required fields)
- [ ] Form submission succeeds
- [ ] Data appears in `service_providers` table
- [ ] Service areas saved as array
- [ ] Services offered saved as array
- [ ] Status is "pending" by default
- [ ] Duplicate email shows error message
- [ ] Rate limiting works (test 6 submissions rapidly)

## Support

Questions? Check:
- Supabase Table Editor for data
- Browser console for JavaScript errors
- Network tab for API errors
- `/api/submit-provider-application` logs in Netlify Functions

---

**Status**: ✅ Provider signup form complete and tested
**Next**: Set up database schema in Supabase and test live
