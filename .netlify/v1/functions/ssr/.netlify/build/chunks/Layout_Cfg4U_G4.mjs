import { d as createComponent, m as maybeRenderHead, r as renderTemplate, j as renderScript, c as createAstro, i as renderComponent, n as renderSlot, f as addAttribute, o as renderHead } from './astro/server_Biyn9gVN.mjs';
import 'clsx';
/* empty css                         */

const $$TopBarPhotoDiagnosis = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="fixed top-0 left-0 w-full bg-red-600 text-white text-center py-2 px-3 text-sm sm:text-base z-[60]"> <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"> <p class="font-semibold leading-tight">
Skip the House Call!
<span class="font-normal text-white/90">
Upload photos of your furnace for instant diagnosis and free estimates.
</span> </p> <a href="/furnace-diagnosis" class="inline-block bg-white text-red-600 font-bold px-4 py-1.5 rounded-md hover:bg-gray-100 transition whitespace-nowrap text-sm sm:text-base">
Upload Photos Now
</a> </div> </section>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/TopBarPhotoDiagnosis.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header id="site-header" class="fixed top-0 left-0 w-full bg-white shadow-sm z-50 transition-all"> <div class="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4"> <!-- 🔥 Logo + Brand --> <a href="/" class="flex items-center space-x-3"> <img src="/logo.svg" alt="Fix My Furnace Logo" class="w-10 h-10 object-contain"> <span class="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight whitespace-nowrap">
Fix My Furnace
</span> </a> <!-- 💪 Desktop Nav --> <nav class="hidden md:flex items-center space-x-8 font-bold text-gray-900 text-lg tracking-tight uppercase"> <a href="/pricing" class="hover:text-red-600 transition-colors duration-200">Pricing</a> <a href="/about" class="hover:text-red-600 transition-colors duration-200">About</a> <a href="/services" class="hover:text-red-600 transition-colors duration-200">Services</a> <a href="/contact" class="hover:text-red-600 transition-colors duration-200">Contact</a> <!-- Call / Text Button --> <a href="tel:+3134257304" class="bg-red-600 text-white font-extrabold px-5 py-2.5 rounded-lg text-base hover:bg-red-700 active:scale-[0.98] shadow-md transition">
Text or Call Now
</a> </nav> <!-- 📱 Mobile Menu Icon --> <button class="md:hidden text-gray-700 focus:outline-none" id="mobileMenuBtn" aria-label="Toggle menu"> <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path> </svg> </button> </div> <!-- 📱 Mobile Menu --> <div id="mobileMenu" class="hidden md:hidden bg-white border-t border-gray-200 shadow-sm"> <nav class="flex flex-col p-5 space-y-4 text-gray-900 font-bold text-lg uppercase"> <a href="/pricing" class="hover:text-red-600 transition-colors">Pricing</a> <a href="/about" class="hover:text-red-600 transition-colors">About</a> <a href="/services" class="hover:text-red-600 transition-colors">Services</a> <a href="/contact" class="hover:text-red-600 transition-colors">Contact</a> <a href="tel:+18334948669" class="block text-center bg-red-600 text-white font-extrabold px-4 py-3 rounded-lg hover:bg-red-700 transition mt-3">
Call Now
</a> </nav> </div> ${renderScript($$result, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/Header.astro?astro&type=script&index=0&lang.ts")} </header>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gray-900 text-gray-300 py-10 text-center"> <div class="max-w-6xl mx-auto px-4"> <p class="text-sm sm:text-base">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Fix My Furnace. All rights reserved.
</p> <div class="mt-4 flex justify-center gap-4 text-xs sm:text-sm"> <a href="/privacy" class="hover:text-white transition">Privacy Policy</a> <a href="/terms" class="hover:text-white transition">Terms of Service</a> <a href="/landing_page_1" class="hover:text-white font-semibold transition">
Book Now
</a> </div> </div> </footer>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://fixmyfurnacedetroit.com");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Professional furnace repair, installation, and HVAC services across Michigan. Licensed technicians serving Detroit, Grand Rapids, Ann Arbor, Lansing, and all Michigan cities. 24/7 emergency service.",
    keywords = "furnace repair Michigan, HVAC services Detroit, furnace installation Grand Rapids, boiler repair Ann Arbor, heating contractors Lansing, emergency furnace service Michigan",
    ogImage = "https://fixmyfurnacedetroit.com/fixmyfurnacewoman.png",
    canonicalUrl = Astro2.url.href,
    hideHeader = false,
    hideTopBanner = false
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Primary Meta Tags --><title>', '</title><meta name="description"', '><meta name="keywords"', '><meta name="robots" content="index, follow"><meta name="author" content="Fix My Furnace"><link rel="canonical"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="en_US"><meta property="og:site_name" content="Fix My Furnace"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Geo Meta Tags --><meta name="geo.region" content="US-MI"><meta name="geo.placename" content="Michigan"><meta name="ICBM" content="42.3314,-84.6001"><!-- Favicon --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- Local Business Schema --><script type="application/ld+json">\n      {\n        "@context": "https://schema.org",\n        "@type": "LocalBusiness",\n        "name": "Fix My Furnace",\n        "description": "Professional furnace repair, installation, and HVAC services across Michigan",\n        "url": "https://fixmyfurnacedetroit.com",\n        "telephone": "+1-833-494-8669",\n        "priceRange": "$$",\n        "address": {\n          "@type": "PostalAddress",\n          "addressRegion": "MI",\n          "addressCountry": "US"\n        },\n        "areaServed": [\n          {\n            "@type": "State",\n            "name": "Michigan"\n          }\n        ],\n        "serviceArea": {\n          "@type": "GeoCircle",\n          "geoMidpoint": {\n            "@type": "GeoCoordinates",\n            "latitude": 42.3314,\n            "longitude": -84.6001\n          },\n          "geoRadius": "500000"\n        },\n        "services": [\n          "Furnace Repair",\n          "Furnace Installation", \n          "Boiler Repair",\n          "HVAC Maintenance",\n          "Emergency Heating Service"\n        ],\n        "openingHours": "Mo-Su 00:00-23:59",\n        "hasOfferCatalog": {\n          "@type": "OfferCatalog",\n          "name": "HVAC Services",\n          "itemListElement": [\n            {\n              "@type": "Offer",\n              "itemOffered": {\n                "@type": "Service",\n                "name": "Emergency Furnace Repair"\n              }\n            }\n          ]\n        }\n      }\n    <\/script>', '</head> <body class="antialiased text-gray-900 bg-white"> <!-- \u{1F680} Global Top CTA Bar --> ', " <!-- \u{1F9ED} Main Header --> ", ' <!-- \u{1F4C4} Page Content --> <main id="main-content"', "> ", " </main> ", " ", " </body> </html>"])), title, addAttribute(description, "content"), addAttribute(keywords, "content"), addAttribute(canonicalUrl, "href"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(canonicalUrl, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderHead(), !hideTopBanner && renderTemplate`${renderComponent($$result, "TopBarPhotoDiagnosis", $$TopBarPhotoDiagnosis, {})}`, !hideHeader && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`, addAttribute(`transition-all duration-300 ${hideTopBanner ? "pt-[100px]" : "pt-[160px]"}`, "class"), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderScript($$result, "/Users/Zach/Github_Projects/fix-my-furnace/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
