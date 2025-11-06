import { d as createComponent, i as renderComponent, r as renderTemplate, j as renderScript, m as maybeRenderHead } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
import { $ as $$UniversalForm } from '../chunks/UniversalForm_C-iNv1xW.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      autoComplete: "name"
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "(833) 494-8669",
      required: true,
      autoComplete: "tel"
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "you@example.com",
      required: false,
      autoComplete: "email"
    },
    {
      name: "address",
      type: "address",
      label: "Service Address",
      placeholder: "Enter your full address",
      required: false,
      autoComplete: "street-address"
    },
    {
      name: "message",
      type: "textarea",
      label: "How can we help?",
      placeholder: "Describe your issue...",
      required: false
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contact Fix My Furnace | HVAC Services Michigan | Detroit, Grand Rapids, Ann Arbor", "description": "Contact Fix My Furnace for professional HVAC services across Michigan. Serving Detroit, Grand Rapids, Ann Arbor, Lansing and all Michigan cities. Call (833) FIX-IT-NOW for 24/7 emergency service.", "keywords": "contact Michigan HVAC, Detroit furnace repair phone, Grand Rapids heating service, Ann Arbor HVAC quotes, emergency furnace repair Michigan" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto text-center"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">\nNeed Heat Fast? <span class="text-red-600">We\u2019ve Got You Covered.</span> </h1> <p class="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto">\nReach out to our local team for same-day service, honest estimates, and old-school Detroit craftsmanship.\n</p> </div> <!-- \u{1F527} Decorative Bar --> <div class="absolute bottom-0 left-0 w-full h-2 bg-red-600"></div> </section>  <section class="relative bg-white py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start"> <!-- \u{1F9FE} Contact Form --> <div class="bg-gray-50 border border-gray-200 shadow-xl rounded-2xl p-8 md:p-10"> ', ` <p class="text-xs text-gray-500 mt-4 text-center">
By submitting this form, you agree to be contacted by Fix My Furnace for scheduling and service updates.
</p> </div> <!-- \u{1F3D9} INFO / SIDEBAR --> <div class="flex flex-col justify-center md:pl-6 lg:pl-10"> <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
Fix Your Furnace the Right Way. Reliable <span class="text-red-600">Furnace Repair</span> Service
</h2> <p class="text-gray-700 text-lg font-semibold mb-6">
We\u2019re not a faceless call center \u2014 we\u2019re local, licensed pros. From Metro Detroit to Grand Rapids, 
          we fix furnaces fast and treat every home like our own.
</p> <ul class="space-y-4 text-gray-800 text-lg font-semibold"> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-5 h-5 text-red-600"></i>
Serving all of Michigan
</li> <li class="flex items-center gap-3"> <i data-lucide="phone" class="w-5 h-5 text-red-600"></i> <a href="tel:+13134257304" class="hover:text-red-600">(313) 425-7304</a> </li> <li class="flex items-center gap-3"> <i data-lucide="mail" class="w-5 h-5 text-red-600"></i> <a href="mailto:FixMyFurnacenow@gmail.com" class="hover:text-red-600">FixMyFurnacenow@gmail.com</a> </li> </ul> <div class="mt-10 border-t border-gray-200 pt-6"> <p class="text-sm text-gray-600">
\u{1F4CD} Headquarters in <strong>Detroit, MI</strong> <br>Proudly serving the entire state of Michigan.
</p> </div> </div> </div> </section>  <section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto"> <!-- Header --> <div class="text-center mb-12"> <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
We <span class="text-red-600">Service All of Michigan</span> </h2> <p class="text-lg md:text-xl font-semibold text-gray-700 max-w-3xl mx-auto">
From Detroit to Grand Rapids, Ann Arbor to Flint \u2014 if there's a furnace in Michigan, we'll fix it.
</p> </div> <!-- Service Areas Grid --> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> <!-- Metro Detroit --> <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"> <h3 class="text-xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-3">
Metro Detroit Area
</h3> <ul class="space-y-3 text-gray-700"> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Detroit
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Dearborn
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Warren
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Sterling Heights
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Livonia
</li> </ul> </div> <!-- West Michigan --> <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"> <h3 class="text-xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-3">
West Michigan
</h3> <ul class="space-y-3 text-gray-700"> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Grand Rapids
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Kalamazoo
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Holland
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Battle Creek
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Muskegon
</li> </ul> </div> <!-- Central & Northern Michigan --> <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100"> <h3 class="text-xl font-bold text-gray-900 mb-4 border-l-4 border-red-600 pl-3">
Central & Northern
</h3> <ul class="space-y-3 text-gray-700"> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Lansing
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Ann Arbor
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Flint
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Traverse City
</li> <li class="flex items-center gap-3"> <i data-lucide="map-pin" class="w-4 h-4 text-red-600"></i>
Saginaw
</li> </ul> </div> </div> <!-- Call to Action --> <div class="text-center mt-12"> <p class="text-gray-600 text-lg mb-6">
Can't find your city listed? Don't worry \u2014 our network of licensed technicians covers every corner of Michigan.
</p> <p class="text-gray-800 font-bold text-xl"> <span class="text-red-600">Call today</span> to get your local tech scheduled.
</p> </div> </div> </section>  <section class="bg-red-600 text-white py-16 text-center"> <h3 class="text-3xl font-bold mb-3">Emergency? Don\u2019t Wait \u2014 Call Us Now.</h3> <p class="mb-6 text-white/90">Same-day service available 7 days a week across Michigan.</p> <a href="tel:+18334948669" class="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition">
Call (833) FIX-IT-NOW
</a> </section>  <script type="module" src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"><\/script> `, " "])), maybeRenderHead(), renderComponent($$result2, "UniversalForm", $$UniversalForm, { "formId": "contact-page-form", "formSource": "contact_page_form", "apiEndpoint": "/api/submit-form", "title": "Send Us a Message", "description": "Fill out the form below and we'll get back to you fast \u2014 often within minutes during business hours.", "fields": fields, "submitText": "Send Message", "className": "" }), renderScript($$result2, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro?astro&type=script&index=0&lang.ts")) })}`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
