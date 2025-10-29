# 🧰 Fix My Furnace — Service Pages Guide

This document explains how to **add, edit, or manage service pages** for the Fix My Furnace website.

All service pages (like **Furnace Repair**, **Boiler Installation**, etc.) are automatically generated from a single data file — you don’t need to manually create new `.astro` pages.

---

## ⚙️ Folder Overview

src/
├── data/
│ └── services.js ← Contains all service page data
├── pages/
│ ├── services/
│ │ ├── [slug].astro ← Dynamic service page template
│ │ └── README.md ← You are here
│ └── index.astro
├── layouts/
│ └── Layout.astro
└── components/
└── ...


---

## 🚀 How It Works

Astro uses a **dynamic route file** — `src/pages/services/[slug].astro` — combined with a `getStaticPaths()` function to pre-render a static page for each service defined in `src/data/services.js`.

Each object in `services.js` defines one service page.

Example route:

/services/furnace-repair
The `[slug]` field determines the page URL.

---

## 🛠 How to Add a New Service Page

1. **Open** `src/data/services.js`
2. **Add** a new object to the exported `services` array:

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

Save the file.
That’s it — your new page will be generated automatically!


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
