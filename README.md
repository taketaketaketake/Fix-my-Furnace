# 🔥 Fix My Furnace — Michigan's Premier HVAC Network Platform

**Modern, conversion-optimized website connecting Michigan homeowners with trusted HVAC professionals.** Built with cutting-edge web technologies to deliver fast, reliable service matching and lead generation.

## 🚀 What We Do

Fix My Furnace is Michigan's most trusted HVAC service network, connecting homeowners with vetted, licensed heating and cooling professionals across the state. Our platform provides instant furnace diagnosis, transparent pricing, and access to quality contractors from Detroit to Grand Rapids and everywhere in between.

### 🏠 For Homeowners
- **Free Furnace Diagnosis** - Upload photos for instant troubleshooting
- **Vetted Contractor Network** - All providers are licensed, insured, and background-checked
- **Transparent Pricing** - Know your costs upfront with no hidden fees
- **24/7 Emergency Service** - Fast response across all Michigan cities
- **Quality Guarantee** - Accountability through our trusted network

### 🔧 For HVAC Professionals
- **Qualified Lead Generation** - Pre-screened homeowners ready for service
- **100% Revenue Retention** - Keep all customer payments, pay only for leads
- **Flexible Volume Control** - Scale up or down based on your capacity
- **Statewide Coverage** - Serve customers across Michigan
- **No Contracts** - Leave anytime with 30 days' notice

## ⭐ Platform Features

- **Smart Lead Capture System** - Advanced forms with phone validation, address autocomplete, and spam protection
- **Provider Directory** - Searchable network of verified HVAC contractors
- **Contractor Application Portal** - Streamlined onboarding for new service providers
- **Free Furnace Diagnosis** - Photo-based troubleshooting system
- **Dynamic Service Pages** - Automatically generated service pages from data files
- **Mobile-First Design** - Responsive across all devices with professional styling
- **Performance Optimized** - Static site generation for lightning-fast load times
- **SEO-Optimized Pages** - Targeted content for Michigan HVAC searches

## 🛠 Technology Stack

- **Frontend Framework:** Astro.js v5.15.2 (SSG/SSR)
- **Styling:** TailwindCSS v4.1.16
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React v0.548.0
- **Database:** Supabase (PostgreSQL)
- **Geocoding:** Mapbox API
- **Form Processing:** Custom API endpoints with rate limiting
- **Analytics:** Google Analytics 4 integration

## 🌍 Service Coverage

**Serving All of Michigan:**
Detroit • Grand Rapids • Ann Arbor • Warren • Sterling Heights • Lansing • Dearborn • Livonia • Flint • Troy • Kalamazoo • Holland • Traverse City • Saginaw • Muskegon • Battle Creek • Plus 67 more counties

**Services Available:**
- Furnace Repair & Installation
- Boiler Service & Replacement  
- Emergency HVAC Support
- Duct Cleaning & Maintenance
- Air Quality Solutions
- Routine System Tune-ups

## 📊 Advanced Form System

### UniversalForm Component
Our production-ready form system provides consistent functionality across all pages:

- **Phone Validation:** Auto-formatting with intelligent input restrictions
- **Address Autocomplete:** Mapbox-powered Michigan-focused geocoding
- **Spam Protection:** Multi-layer security with honeypot fields and rate limiting
- **Source Tracking:** Complete lead attribution for marketing analytics
- **Mobile Optimized:** Touch-friendly controls for all device types
- **Real-time Validation:** Instant feedback on form completion

### Security & Data Protection
- **Rate Limiting:** 5 requests per 15-minute window per IP address
- **Input Sanitization:** All data trimmed and validated server-side
- **Encrypted Storage:** Secure database with automated backups
- **Privacy Compliant:** GDPR-ready data handling practices

---

## 🚀 Platform Architecture

```
fix-my-furnace/
├── src/
│   ├── components/
│   │   ├── UniversalForm.astro           # 🆕 Advanced form system
│   │   ├── Header.astro                  # Main navigation
│   │   └── Footer.astro                  # Site footer
│   ├── pages/
│   │   ├── api/
│   │   │   ├── submit-form.js           # Lead capture endpoint
│   │   │   ├── submit-provider-application.js  # 🆕 Contractor applications
│   │   │   └── get-providers.js         # 🆕 Provider directory API
│   │   ├── partners/
│   │   │   ├── index.astro              # 🆕 Contractor directory
│   │   │   └── apply.astro              # 🆕 Contractor application portal
│   │   ├── furnace/
│   │   │   └── diagnosis.astro          # 🆕 Free diagnosis system
│   │   ├── services/
│   │   │   └── [slug].astro             # Dynamic service pages
│   │   ├── home-visit.astro             # 🆕 Professional assessment page
│   │   ├── about.astro                  # Company story and mission
│   │   └── contact.astro                # Customer contact forms
│   ├── data/
│   │   └── services.js                  # Service definitions and content
│   └── layouts/
│       └── Layout.astro                 # SEO-optimized main layout
```

### Key Architecture Notes:
- **Static site generation** with component-based architecture
- **Dynamic routing** via [slug].astro for services
- **Centralized data** in src/data/services.js
- **TypeScript strict mode** enabled
- **API endpoints** for form processing and data handling
- **Modular form system** with reusable components

### Database Schema
**Customer Leads:** `form_submissions` table with lead source tracking  
**Provider Network:** `provider_applications` table with verification status  
**Service Analytics:** Conversion tracking and lead quality metrics

---

## 💼 Business Model

**Revenue Streams:**
1. **Lead Generation Fees** - Contractors pay per qualified lead received
2. **Professional Assessment** - $125 home visits with expert diagnosis
3. **Premium Placement** - Enhanced visibility in provider directory

**Value Proposition:**
- **For Homeowners:** Trusted contractors, transparent pricing, quality guarantee
- **For Contractors:** High-quality leads, 100% revenue retention, flexible volume

**Market Position:** Michigan's most contractor-friendly HVAC network with a focus on transparency, quality, and customer satisfaction.

## 🚀 Quick Start

### Using the UniversalForm Component

```astro
---
import UniversalForm from '../components/UniversalForm.astro';

const fields = [
  { name: 'name', type: 'text', label: 'Full Name', required: true },
  { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
  { name: 'address', type: 'address', label: 'Service Address', required: false },
  { name: 'issue', type: 'select', label: 'Service Needed', 
    options: ['Furnace Repair', 'Installation', 'Maintenance'], required: true }
];
---

<UniversalForm
  formId="contact-form"
  formSource="contact_page_form"
  title="Get Your Free Quote"
  description="Local HVAC experts will contact you shortly"
  fields={fields}
  submitText="Request Service"
/>
```

### Adding Service Pages

```js
{
  slug: "air-conditioning-repair",
  title: "Air Conditioning Repair",
  subtitle: "Stay Cool All Summer.",
  description:
    "We fix and install A/C systems fast, using top-rated brands and local expertise across Michigan.",
  heroImage: "/ac-repair.jpg",
  features: [
    { icon: "fan", title: "Fast Diagnosis", text: "We find and fix cooling issues same-day." },
    { icon: "battery-charging", title: "Energy Efficient", text: "Save money with smart cooling systems." },
    { icon: "shield-check", title: "Licensed Experts", text: "All techs are fully certified and insured." },
    { icon: "wallet", title: "Transparent Pricing", text: "No hidden fees, ever." },
  ],
},
```

Save the file and your new service page will be generated automatically!

---

## 📈 Performance Metrics

### Technical Performance
- **Page Load Speed:** <2 seconds average
- **Mobile Performance:** 95+ PageSpeed score
- **SEO Rankings:** Top 3 positions for key Michigan HVAC searches
- **Uptime:** 99.9% availability with automated monitoring

### Business Performance
- **Lead Quality:** High intent customers with immediate service needs
- **Contractor Satisfaction:** Low churn rate with network providers
- **Customer Satisfaction:** Quality-focused service delivery
- **Geographic Coverage:** All 83 Michigan counties served

---

*Built with ❤️ for Michigan homeowners and HVAC professionals*

**Contact:** (833) 494-8669 | FixMyFurnacenow@gmail.com  
**Coverage:** All Michigan Cities | **Availability:** 24/7 Emergency Service

---

## 📋 UniversalForm System (NEW)

### Overview
The UniversalForm component is a production-ready form system that replaced the original homepage form. It provides consistent functionality across all pages with advanced validation and lead tracking.

### Usage Example
```astro
---
import UniversalForm from '../components/UniversalForm.astro';

const fields = [
  { name: 'name', type: 'text', label: 'Full Name', required: true },
  { name: 'phone', type: 'tel', label: 'Phone Number', required: true },
  { name: 'address', type: 'address', label: 'Service Address', required: false },
  { name: 'issue', type: 'select', label: 'Service Type', 
    options: ['Furnace Repair', 'Installation', 'Maintenance'], required: true }
];
---

<UniversalForm
  formId="contact-form"
  formSource="contact_page_form"
  apiEndpoint="/api/submit-form"
  title="Get Your Free Quote"
  description="Local HVAC experts will contact you shortly"
  fields={fields}
  submitText="Request Service"
/>
```

### Form Field Types
- **text**: Standard text input
- **tel**: Phone with auto-formatting and validation (prevents letters)
- **email**: Email input with browser validation
- **textarea**: Multi-line text input
- **select**: Dropdown with custom options
- **address**: Mapbox-powered address autocomplete (Michigan-focused)

### Security Features
- **Rate limiting**: 5 requests per 15-minute window per IP
- **Input sanitization**: All inputs trimmed and limited to 500 characters
- **Honeypot protection**: Hidden bot-catching fields
- **Server-side validation**: Required field checking and phone validation
- **Supabase integration**: Using service role for reliable database access

### Lead Tracking
Form submissions include source tracking in the `form_source` column:
- Homepage: `homepage_quote_form`
- Contact: `contact_page_form`
- Service pages: `service_[slug]_form`

### Database Schema
Forms submit to the `form_submissions` table with these fields:
- `full_name`, `phone_number`, `email`, `service_address`, `furnace_issue`
- `form_source`, `status`, `verification_status`
- `photo_count`, `photo_urls` (for future file upload features)

### API Endpoint
- **URL**: `/api/submit-form`
- **Method**: POST
- **Body**: `{ formData: {...}, formSource: "source_identifier" }`
- **Response**: `{ success: true, submissionId: "uuid" }`


🧱 File Details
src/data/services.js
This file holds the core content for each service.
Each entry includes:

Field	Type	Description
slug	string	URL identifier (e.g., "furnace-repair" → /services/furnace-repair)
title	string	Main service title
subtitle	string	Secondary tagline under the title
description	string	Main paragraph for the hero section
heroImage	string	Path to the service’s hero image (must be stored in /public)
features	array	List of highlight cards, each with { icon, title, text }

Icons use Lucide names (e.g. "wrench", "shield-check", "wallet").

src/pages/services/[slug].astro
This file is the shared service page template.

It handles:

Hero section (text + image split layout)

Features grid (auto-generated from your data)

Mid-page dark section (brand + trust message)

Final CTA section

It imports the service data and exposes it via:

astro
Copy code
export async function getStaticPaths() {
  return services.map((service) => ({
    params: { slug: service.slug },
    props: service,
  }));
}
This tells Astro which pages to build at compile time.

🖼 Adding Images
All hero and content images must be saved inside your /public folder.

Reference them in your data file as:

js
Copy code
heroImage: "/Fix_My_Furnace_Hero_Image.png"
✅ Supported formats: .jpg, .png, .webp

🧭 Adding Navigation Links
If you want your new service to appear in a navigation menu or a “Services” overview page, simply link to it using:

astro
Copy code
<a href="/services/air-conditioning-repair">Air Conditioning Repair</a>
You can also dynamically generate a service grid later by importing the same data file:

astro
Copy code

import { services } from "../data/services.js";
----

it's definitely possible to set up an ML algorithm for dynamic page title generation. This is an Astro.js website
  with static page titles currently handled through the Layout component.

  Current Setup:
  - Titles are static strings passed to src/layouts/Layout.astro:19
  - Service pages use ${title} | Fix My Furnace Detroit pattern
  - No existing ML dependencies

  Potential ML Approaches:

  1. Simple A/B Testing with Performance Tracking
    - Rotate between title variations
    - Track CTR, bounce rate, conversions
    - Use basic algorithms to select best performers
  2. NLP-Based Title Generation
    - Use libraries like TensorFlow.js or OpenAI API
    - Generate titles based on page content, user demographics, time/season
    - Train on your conversion data
  3. Real-time Personalization
    - User behavior analysis (location, device, referrer)
    - Time-based optimization (emergency services at night)
    - SEO keyword integration

  Data Sources Available:
  - Page content from src/data/services.js
  - User analytics (location: Detroit focus)
  - Seasonal patterns (HVAC is seasonal)
  - Search keywords, conversion metrics

  Would you like me to implement a basic version starting with A/B testing or go straight to an ML-powered solution?


Some options:
  - "Fix Your Furnace the Right Way"
  - "Get Your Furnace Running Again"
  - "Expert Furnace Repair You Can Trust"
  - "Stop Freezing - Fix Your Furnace"
  - "Professional Furnace Repair Service"
  - "Get Your Heating Back On Track"
  - "Reliable Furnace Repair Service"
