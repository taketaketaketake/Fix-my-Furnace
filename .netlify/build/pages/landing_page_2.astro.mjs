import { d as createComponent, r as renderTemplate, k as defineScriptVars, i as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
import { $ as $$ServiceAreasSection } from '../chunks/ServiceAreasSection_DfSPOe58.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$LandingPage2 = createComponent(async ($$result, $$props, $$slots) => {
  const SUPABASE_URL = "https://ztvsfapoeekaxztahxsv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k";
  return renderTemplate(_a || (_a = __template(["", ' <script type="module">', `
  // Import Supabase from CDN
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
  
  document.addEventListener("DOMContentLoaded", () => {
    // Supabase configuration
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Form elements
    const form = document.getElementById('landingForm2');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const formMessages = document.getElementById('formMessages');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Show/hide messages
    function showMessage(messageType) {
      successMessage.classList.add('hidden');
      errorMessage.classList.add('hidden');
      formMessages.classList.remove('hidden');
      document.getElementById(messageType + 'Message').classList.remove('hidden');
      document.getElementById(messageType + 'Message').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function setLoadingState(loading) {
      submitBtn.disabled = loading;
      if (loading) {
        submitText.classList.add('hidden');
        submitLoading.classList.remove('hidden');
      } else {
        submitText.classList.remove('hidden');
        submitLoading.classList.add('hidden');
      }
    }

    // Handle form submission
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        setLoadingState(true);
        
        try {
          const formData = new FormData(form);
          const name = formData.get('name')?.trim();
          const phone = formData.get('phone')?.trim();
          const address = formData.get('address')?.trim();
          const issue = formData.get('issue')?.trim();
          
          // Basic validation
          if (!name || !phone || !address || !issue) {
            throw new Error('Please fill in all required fields');
          }
          
          // Save to Supabase database using same structure as other forms
          const { data, error } = await supabase
            .from('form_submissions')
            .insert([
              {
                full_name: name,
                phone_number: phone,
                service_address: address,
                furnace_issue: issue,
                photo_count: 0,
                photo_urls: [],
                form_source: 'landing_page_2'
              }
            ]);
          
          if (error) {
            console.error('Error saving form:', error);
            throw new Error('Failed to submit form');
          }
          
          // Success
          setLoadingState(false);
          showMessage('success');
          form.reset();
          
          setTimeout(() => {
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            formMessages.classList.add('hidden');
          }, 7000);
          
        } catch (error) {
          console.error('Submission error:', error);
          setLoadingState(false);
          showMessage('error');
          
          setTimeout(() => {
            successMessage.classList.add('hidden');
            errorMessage.classList.add('hidden');
            formMessages.classList.add('hidden');
          }, 7000);
        }
      });
    }
  });
</script>`])), renderComponent($$result, "Layout", $$Layout, { "title": "Fix My Furnace | Get Heat Back Fast" }, { "default": async ($$result2) => renderTemplate`   ${maybeRenderHead()}<section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 pt-24 pb-16 px-6 md:px-10 overflow-hidden"> <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center"> <!-- 🔴 Left Side: Lead Form --> <div class="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 flex flex-col justify-center"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
No Heat? <span class="text-red-600">Get It Fixed Today.</span> </h1> <p class="text-gray-600 mb-6 text-base md:text-lg">
Same-day furnace repair across Michigan. Licensed pros, upfront pricing, no games.  
        Fill out this form — a local HVAC expert will call you back right away.
</p> <form id="landingForm2" class="space-y-4"> <!-- Hidden honeypot field --> <input type="text" name="bot-field" class="hidden"> <!-- 🧍 Name --> <div> <label for="name" class="block text-sm font-semibold text-gray-800">
Name
</label> <input id="name" name="name" type="text" required placeholder="John Doe" class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"> </div> <!-- ☎️ Phone --> <div> <label for="phone" class="block text-sm font-semibold text-gray-800">
Phone Number
</label> <input id="phone" name="phone" type="tel" required placeholder="(833) 494-8669" class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"> </div> <!-- 🏠 Address --> <div> <label for="address" class="block text-sm font-semibold text-gray-800">
Address
</label> <input id="address" name="address" type="text" required placeholder="1234 Elm Street" class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"> </div> <!-- ⚙️ Issue Dropdown --> <div> <label for="issue" class="block text-sm font-semibold text-gray-800">
What’s happening with your furnace?
</label> <select id="issue" name="issue" required class="mt-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"> <option value="">Select an issue...</option> <option value="no-power">It won’t turn on</option> <option value="cold-air">It’s blowing cold air</option> <option value="noises">It’s making strange noises</option> <option value="old">It’s old and unreliable</option> <option value="checkup">Not sure / want a check-up</option> </select> </div> <!-- 🚀 Submit --> <button type="submit" id="submitBtn" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-red-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"> <span id="submitText">Get a Free Quote</span> <span id="submitLoading" class="hidden"> <svg class="animate-spin inline w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
Submitting...
</span> </button> <!-- Success/Error Messages --> <div id="formMessages" class="mt-4 hidden"> <div id="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 hidden"> <div class="flex items-center"> <svg class="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <p class="text-green-800 font-semibold">Success! A local technician will contact you within 2 hours.</p> </div> </div> <div id="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4 hidden"> <div class="flex items-center"> <svg class="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> <p class="text-red-800 font-semibold">Something went wrong. Please try again or call (833) FIX-IT-NOW.</p> </div> </div> </div> </form> <p class="text-xs text-gray-500 mt-4 text-center">
By submitting this form, you agree to be contacted by Fix My Furnace or
        its partners for scheduling and service information.
</p> </div> <!-- ⚙️ Right Side: Brand Image --> <div class="flex flex-col justify-center text-left md:pl-6 lg:pl-10 relative"> <img src="/fixmyfurnaceimage1.png" alt="Furnace technician at work" class="rounded-2xl shadow-2xl object-cover object-center w-full h-full min-h-[500px]" loading="eager"> <!-- Optional small brand badge --> <div class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow text-sm font-semibold text-red-600">
Trusted in Michigan
</div> </div> </div> </section>  <section class="bg-gray-900 text-gray-100 py-6 text-center"> <div class="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-6 text-sm md:text-base"> <span>⭐⭐⭐⭐⭐ Rated 4.9/5 by Michigan Homeowners</span> <span>🏆 Licensed & Insured</span> <span>🚀 Same-Day Service</span> <span>🏠 Detroit Local</span> </div> </section>  <section class="bg-white py-20 px-6 md:px-10"> <div class="max-w-7xl mx-auto text-center"> <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
Why Michigan Homeowners Choose Fix My Furnace
</h2> <div class="grid md:grid-cols-4 gap-8"> <div class="p-6 rounded-xl bg-red-50 border border-red-100 shadow-sm"> <h3 class="font-bold text-lg mb-2 text-red-700">⚡ Fast Response</h3> <p class="text-gray-700 text-sm">We’re ready to roll — most repairs same day.</p> </div> <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"> <h3 class="font-bold text-lg mb-2 text-gray-900">🧰 Licensed Pros</h3> <p class="text-gray-700 text-sm">Certified, insured, and trusted throughout Michigan.</p> </div> <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"> <h3 class="font-bold text-lg mb-2 text-gray-900">💸 Upfront Pricing</h3> <p class="text-gray-700 text-sm">No surprises — clear estimates before we start.</p> </div> <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm"> <h3 class="font-bold text-lg mb-2 text-gray-900">❤️ Local Care</h3> <p class="text-gray-700 text-sm">Family-owned and proudly serving all of Michigan.</p> </div> </div> </div> </section>  <section class="bg-gradient-to-br from-gray-50 to-white py-20 px-6 md:px-10"> <div class="max-w-6xl mx-auto text-center"> <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">What Our Customers Say</h2> <div class="grid md:grid-cols-3 gap-8"> <blockquote class="bg-white border border-gray-200 p-6 rounded-xl shadow"> <p class="text-gray-700 italic mb-4">
“They had our heat back in 2 hours. Fair price and super friendly techs.”
</p> <footer class="font-semibold text-gray-900">Angela M., Ann Arbor ⭐️⭐️⭐️⭐️⭐️</footer> </blockquote> <blockquote class="bg-white border border-gray-200 p-6 rounded-xl shadow"> <p class="text-gray-700 italic mb-4">
“Called in the morning, warm by afternoon. Exactly what we needed.”
</p> <footer class="font-semibold text-gray-900">Marcus T., Detroit ⭐️⭐️⭐️⭐️⭐️</footer> </blockquote> <blockquote class="bg-white border border-gray-200 p-6 rounded-xl shadow"> <p class="text-gray-700 italic mb-4">
“Honest quote, quick service, and zero stress.”
</p> <footer class="font-semibold text-gray-900">Hannah K., Flint ⭐️⭐️⭐️⭐️⭐️</footer> </blockquote> </div> </div> </section>  <section class="bg-gray-900 text-white py-20 px-6 md:px-10 text-center"> <div class="max-w-5xl mx-auto"> <h2 class="text-3xl md:text-4xl font-extrabold mb-12">
How It Works — Simple & Fast
</h2> <div class="grid md:grid-cols-3 gap-10 text-left md:text-center"> <div> <h3 class="text-xl font-bold mb-2">1️⃣ Tell Us Your Issue</h3> <p class="text-gray-200">Quick form or call — takes less than a minute.</p> </div> <div> <h3 class="text-xl font-bold mb-2">2️⃣ Get Matched with a Local Tech</h3> <p class="text-gray-200">We’ll schedule immediately based on your location.</p> </div> <div> <h3 class="text-xl font-bold mb-2">3️⃣ Warm Up Again Today</h3> <p class="text-gray-200">Our same-day service guarantee keeps you comfortable.</p> </div> </div> </div> </section>  <section class="bg-gray-50 py-24 px-6 md:px-12"> <div class="max-w-6xl mx-auto text-center"> <div class="rounded-2xl overflow-hidden shadow-2xl border-4 border-red-600 max-w-4xl mx-auto"> <!-- 🗺️ Service Areas --> ${renderComponent($$result2, "ServiceAreasSection", $$ServiceAreasSection, {})} </div> </div> </section>  <section class="bg-red-600 text-white py-16 text-center"> <h3 class="text-3xl font-bold mb-3">Ready for Heat Again?</h3> <p class="mb-6 text-white/90">Call now or get your free quote in under a minute.</p> <div class="flex flex-col sm:flex-row justify-center gap-4"> <a href="tel:+18334948669" class="bg-white text-red-600 font-semibold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition">
Call (833) FIX-IT-NOW
</a> </div> </section> ` }), defineScriptVars({ SUPABASE_URL, SUPABASE_ANON_KEY }));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_2.astro", void 0);
const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_2.astro";
const $$url = "/landing_page_2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LandingPage2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
