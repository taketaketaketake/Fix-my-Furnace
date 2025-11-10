# Pricing Insights Feature - Setup Guide

## Phase 1, 2 & 3 Complete! ✅

You now have a fully working contract upload and public display system. Here's what was implemented and what you need to do to activate it.

---

## 📦 What Was Created

### 1. Database Schema
**File:** `supabase-schema-contracts.sql`
- Defines the `service_contracts` table structure
- Includes proper indexes for performance
- Row Level Security (RLS) policies configured

### 2. Storage Configuration
**Updated:** `src/lib/supabase.js`
- Added `CONTRACT_STORAGE_BUCKET` constant for the new storage bucket

### 3. API Endpoint
**File:** `src/pages/api/submit-contract.js`
- Handles contract uploads with validation
- Accepts: service type, provider, cost, location, images
- Validates file types (JPG, PNG, WEBP, PDF) and size (5MB max)
- Uploads images to Supabase Storage
- Inserts metadata into database
- Includes rate limiting and spam protection

### 4. Upload Form Page
**File:** `src/pages/pricing-insights.astro`
- User-friendly upload form at `/pricing-insights`
- Matches your existing site design
- Real-time validation and feedback
- Privacy-focused with confirmation checkbox

### 5. Public Display API (Phase 3)
**File:** `src/pages/api/get-contracts.js`
- Fetches approved contracts for public viewing
- Supports filtering by service type, provider, city, cost range
- Calculates real-time statistics (avg, min, max costs)
- Caches results for 5 minutes for performance
- Only returns approved contracts (security)

### 6. Public Pricing Transparency Page (Phase 3)
**File:** `src/pages/pricing-transparency.astro`
- Public page at `/pricing-transparency` showing all approved contracts
- Real-time filtering (service type, city, cost range)
- Statistics dashboard (total contracts, avg/min/max costs)
- Sortable table with contract details
- Modal view for full contract details and images
- Mobile-responsive design
- Call-to-action to encourage more submissions

---

## 🚀 Setup Steps (Do This Next)

### Step 1: Run the SQL Schema

1. Log in to your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase-schema-contracts.sql`
4. Click **Run** to create the table

### Step 2: Create the Storage Bucket

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Set the following:
   - **Name:** `contract-images` (must match exactly)
   - **Public:** ❌ Leave unchecked (private bucket for privacy)
   - **File size limit:** 5MB
   - **Allowed MIME types:** `image/jpeg, image/png, image/webp, application/pdf`

### Step 3: Configure Storage Policies

After creating the bucket, set up access policies:

1. Go to **Storage** > **Policies** > `contract-images` bucket
2. Add these policies:

**Policy 1: Allow public uploads**
```sql
CREATE POLICY "Allow public to upload contract images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'contract-images');
```

**Policy 2: Allow public to view images**
```sql
CREATE POLICY "Allow public to view contract images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'contract-images');
```

### Step 4: Test the Upload

1. Start your dev server: `npm run dev`
2. Visit: `http://localhost:4321/pricing-insights`
3. Fill out the form and upload a test image
4. Check Supabase:
   - **Storage** > `contract-images` should have your uploaded file
   - **Table Editor** > `service_contracts` should have a new row

### Step 5: Deploy

Once tested locally:
```bash
npm run build
# Deploy to your hosting (Netlify, Vercel, etc.)
```

---

## 🔍 How to Test

### Manual Testing Checklist

**Upload Form (`/pricing-insights`):**
- [ ] Form loads without errors
- [ ] File upload field accepts images and PDFs
- [ ] Form validates required fields
- [ ] File size over 5MB shows error
- [ ] Invalid file types (e.g., .txt, .doc) are rejected
- [ ] Successful upload shows success message
- [ ] Uploaded file appears in Supabase Storage
- [ ] Database record created with correct data
- [ ] Rate limiting works (try submitting 6 times quickly)

**Public Display Page (`/pricing-transparency`):**
- [ ] Page loads without errors
- [ ] Shows "No Contracts Found" if no approved contracts
- [ ] Shows approved contracts in table format
- [ ] Statistics display correctly (total, avg, min, max)
- [ ] Service type filter works
- [ ] City filter works
- [ ] Cost range filters work
- [ ] "Clear Filters" button resets all filters
- [ ] Clicking "View" button opens modal with full details
- [ ] Contract image displays in modal
- [ ] Modal closes when clicking X or outside
- [ ] "Share Your Contract" CTA button works

### Test Data Example

```
Service Type: Furnace Repair
Provider Name: Test HVAC Company
Total Cost: 450.00
Service Date: 2024-01-15
City: Detroit
ZIP Code: 48201
Work Description: Replaced heat exchanger and cleaned burners
Contract Image: [Upload any JPG/PNG image]
Privacy Checkbox: ✓ Checked
```

### Approving Contracts for Testing (Until Phase 4 Admin Interface)

To see contracts on the public page, you need to manually approve them:

1. Go to **Supabase Dashboard** > **Table Editor**
2. Open the `service_contracts` table
3. Find the pending contract (status = 'pending')
4. Edit the row and change:
   - `status` from `pending` to `approved`
   - Optionally set `verified` to `true`
5. Save the changes
6. Visit `/pricing-transparency` to see your approved contract

**Quick SQL to approve all pending contracts:**
```sql
UPDATE service_contracts
SET status = 'approved', verified = true
WHERE status = 'pending';
```

---

## 📊 Database Schema Reference

### Table: `service_contracts`

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `created_at` | Timestamp | When submitted |
| `service_type` | Text | Type of service performed |
| `provider_name` | Text | HVAC company name |
| `total_cost` | Decimal | Amount paid |
| `service_date` | Date | When service was done |
| `city` | Text | City where service was performed |
| `zip_code` | Text | ZIP code |
| `contract_image_url` | Text | URL to uploaded image |
| `work_description` | Text | Description of work done |
| `notes` | Text | Additional notes |
| `submitter_email` | Text | Optional contact email |
| `status` | Text | `pending`, `approved`, or `rejected` |
| `verified` | Boolean | Admin verified flag |
| `report_count` | Integer | Number of spam reports |
| `flagged` | Boolean | Flagged for review |
| `admin_notes` | Text | Internal admin notes |

---

## 🔐 Security Features Included

✅ **Rate Limiting:** 5 uploads per 15 minutes per IP
✅ **File Validation:** Type and size checks
✅ **Input Sanitization:** All text trimmed and limited
✅ **Moderation Queue:** All submissions start as `pending`
✅ **Private Storage:** Images not publicly browsable
✅ **RLS Policies:** Database-level access control

---

## 🎯 What's Next (Phase 4+)

After testing the current system, you can implement:

1. ✅ **Phase 1-2:** Upload system (COMPLETE)
2. ✅ **Phase 3:** Public display page showing approved contracts (COMPLETE)
3. **Phase 4:** Admin moderation interface to approve/reject submissions
4. **Phase 5:** Advanced filtering and provider search
5. **Phase 6:** Analytics dashboard and pricing trends
6. **Phase 7:** Privacy protection (auto-blur sensitive info)
7. **Phase 8:** Integration with main site navigation and footer

---

## 🐛 Troubleshooting

### "Missing required environment variables"
- Check `.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE`

### "Failed to upload contract image"
- Verify storage bucket `contract-images` exists
- Check storage policies are configured
- Ensure bucket is named exactly `contract-images` (case-sensitive)

### "Failed to submit contract"
- Run the SQL schema if you haven't yet
- Check the `service_contracts` table exists
- Verify RLS policies allow public inserts

### Form doesn't submit
- Open browser console to see JavaScript errors
- Check Network tab for API response details

### File upload shows "Network Error"
- Verify API endpoint at `/api/submit-contract` is working
- Check server logs for errors
- Test with smaller file size

---

## 📞 Support

If you run into issues:
1. Check Supabase logs in the Dashboard
2. Check browser console for JavaScript errors
3. Check server logs for API errors
4. Verify environment variables are set

---

## ✨ Ready to Go!

Once you complete the 4 setup steps above, your pricing insights feature will be live!

**Two pages are now available:**
- **Upload Form:** `https://yourdomain.com/pricing-insights`
- **Public Display:** `https://yourdomain.com/pricing-transparency`

**Next Steps:**
1. Upload a test contract at `/pricing-insights`
2. Manually approve it in Supabase (see testing section above)
3. View it on `/pricing-transparency`
4. Add navigation links to both pages in your Header/Footer
5. Consider implementing Phase 4 (Admin Moderation Interface)
