# 🧰 Fix My Furnace — Professional HVAC Website

Modern, conversion-optimized website for HVAC and furnace repair services across Michigan. Built with cutting-edge web technologies to deliver fast, reliable lead generation.

## 🚀 Key Features

- **Smart Lead Capture Forms** - Advanced form system with phone validation, address autocomplete, and spam protection
- **Dynamic Service Pages** - Automatically generated service pages from data files
- **Mobile-First Design** - Responsive across all devices with professional styling
- **Performance Optimized** - Static site generation for lightning-fast load times
- **Lead Tracking** - Built-in source tracking for marketing analytics

## 🛠 Technology Stack

- **Frontend Framework:** Astro.js v5.15.2 (SSG/SSR)
- **Styling:** TailwindCSS v4.1.16
- **Language:** TypeScript (strict mode)
- **Icons:** Lucide React v0.548.0
- **Build Tool:** Vite (via Astro)
- **Database:** Supabase (PostgreSQL)
- **Geocoding:** Mapbox API
- **Form Processing:** Custom API endpoints with rate limiting

## 📊 Form System Features

### UniversalForm Component
- **Phone Validation:** Auto-formatting with input restrictions
- **Address Autocomplete:** Mapbox-powered Michigan-focused geocoding
- **Spam Protection:** Honeypot fields and rate limiting
- **Source Tracking:** Track lead generation by page/campaign
- **Security:** Input sanitization and server-side validation
- **Mobile Optimized:** Touch-friendly form controls

---

## 📁 Project Structure

  fix-my-furnace/
  ├── .astro/
  │   ├── data-store.json
  │   └── settings.json
  ├── .vscode/
  │   ├── extensions.json
  │   └── launch.json
  ├── dist/
  │   └── output.css
  ├── src/
  │   ├── components/
  │   │   ├── Footer.astro
  │   │   ├── GallerySection.astro
  │   │   ├── GetQuoteSection.astro
  │   │   ├── Header.astro
  │   │   ├── HeroHeader.astro
  │   │   ├── ServiceAreasSection.astro
  │   │   ├── TestimonialsSection.astro
  │   │   ├── TopBarCTA.astro
  │   │   ├── UniversalForm.astro        # 🆕 Reusable form component
  │   │   └── WhyChooseUs.astro
  │   ├── data/
  │   │   └── services.js           # Service data structure
  │   ├── layouts/
  │   │   └── Layout.astro          # Main layout with title prop
  │   ├── pages/
  │   │   ├── api/
  │   │   │   └── submit-form.js    # 🆕 Form submission endpoint
  │   │   ├── services/
  │   │   │   └── [slug].astro      # Dynamic service pages
  │   │   ├── about.astro
  │   │   ├── contact.astro
  │   │   ├── index.astro           # Homepage
  │   │   ├── landing_page_1.astro
  │   │   ├── landing_page_2.astro
  │   │   ├── services.astro
  │   │   └── test-form.astro       # 🆕 Form testing page
  │   ├── scripts/
  │   │   └── universalForm.js      # 🆕 Form handling logic
  │   ├── styles/
  │   │   └── global.css
  │   ├── utils/
  │   │   └── rateLimit.js          # 🆕 Rate limiting utilities
  │   ├── input.css
  │   └── script.js
  ├── astro.config.mjs
  ├── package.json
  ├── tsconfig.json
  └── README.md

### Key Architecture Notes:
- **Static site generation** with component-based architecture
- **Dynamic routing** via [slug].astro for services
- **Centralized data** in src/data/services.js
- **TypeScript strict mode** enabled
- **API endpoints** for form processing and data handling
- **Modular form system** with reusable components


---

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
