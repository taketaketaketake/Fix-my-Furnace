import { c as createAstro, d as createComponent, r as renderTemplate, k as defineScriptVars, m as maybeRenderHead, j as renderScript, i as renderComponent } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
import 'clsx';
import { $ as $$UniversalForm } from '../chunks/UniversalForm_C-iNv1xW.mjs';
/* empty css                                 */
import { $ as $$ServiceAreasSection } from '../chunks/ServiceAreasSection_DfSPOe58.mjs';
export { renderers } from '../renderers.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro = createAstro("https://fixmyfurnacedetroit.com");
const $$HeroHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroHeader;
  const {
    title = "Built on Trust, Speed, and Real Detroit Grit.",
    description = "We're not a call center — we're your local HVAC pros. When the cold hits and your furnace fails, we show up fast — licensed, local, and ready to get the heat back on.",
    primaryBtnText = "Get a Free Quote",
    secondaryBtnText = "Call Now",
    secondaryBtnLink = "tel:+8334948669",
    imageSrc = "/fixmyfurnacewoman.png"
  } = Astro2.props;
  const SUPABASE_URL = "https://ztvsfapoeekaxztahxsv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dnNmYXBvZWVrYXh6dGFoeHN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMDUzMDIsImV4cCI6MjA3NzY4MTMwMn0.4ff8bfxwEUlJN3JQ3QGsys-xB9Xqu8zUspJSvtzL06k";
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<section class="relative w-full bg-white overflow-hidden"> <div class="flex flex-col-reverse md:grid md:grid-cols-2 min-h-[600px] lg:min-h-[700px]"> <!-- 🧱 Left: Text --> <div class="flex items-center justify-center px-6 md:px-12 py-16 md:py-0 bg-gradient-to-br from-red-50 via-gray-50 to-white"> <div class="max-w-lg text-left"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"> <span class="text-red-600">Furnace Repair</span> &<br> <span class="underline decoration-red-600">HVAC Services Across Michigan.</span> </h1> <p class="text-gray-700 text-base md:text-lg font-semibold leading-relaxed mb-8">\nEmergency furnace repair when you need it most. Our licensed Michigan technicians respond fast to get your heat restored today — serving Detroit, Grand Rapids, Ann Arbor, and every corner of the state.\n</p> <div class="flex flex-wrap gap-4"> <!-- Primary button triggers modal --> <button id="openModalBtn" class="bg-red-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-red-700 active:scale-[0.98] transition"> ', ` </button> </div> </div> </div> <!-- 🔧 Right: Image --> <div class="relative w-full flex items-center justify-center bg-white py-6 md:py-0"> <img src="fixmyfurnacewoman.png" alt="Professional Michigan HVAC technician providing furnace repair and installation services across Detroit, Grand Rapids, Ann Arbor, and all Michigan cities" class="w-full max-w-[700px] h-auto object-contain" loading="eager"> </div> <!-- Decorative red bar --> <div class="absolute bottom-0 left-0 w-full h-2 bg-red-600"></div> <!-- 💬 Modal --> <div id="quoteModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm hidden z-[100] flex items-center justify-center p-4"> <div class="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-8 relative"> <!-- Close button --> <button id="closeModalBtn" class="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition">
✕
</button> <h2 class="text-2xl font-extrabold text-gray-900 mb-4 text-center">
Stop Freezing - Fix Your Furnace
</h2> <p class="text-gray-600 text-sm text-center mb-6">
Fill out the form and a local HVAC expert will contact you shortly.
</p> <!-- Success/Error Message Container --> <div id="modalFormMessages" class="mb-6 hidden"> <div id="modalSuccessMessage" class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 hidden"> <div class="flex items-center"> <svg class="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <p class="text-green-800 font-semibold text-sm">Request sent! We'll contact you shortly.</p> </div> </div> <div id="modalErrorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 hidden"> <div class="flex items-center"> <svg class="w-4 h-4 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path> </svg> <p class="text-red-800 font-semibold text-sm">Something went wrong. Please try again.</p> </div> </div> <div id="modalLoadingMessage" class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 hidden"> <div class="flex items-center"> <svg class="animate-spin w-4 h-4 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> <p class="text-blue-800 font-semibold text-sm">Sending your request...</p> </div> </div> </div> <form class="space-y-4" id="appointmentForm"> <!-- Hidden honeypot field for spam protection --> <div style="display: none;"> <label>Don't fill this out if you're human: <input name="bot-field"></label> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Name</label> <input type="text" name="name" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="John Doe" required> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label> <input type="tel" name="phone" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="(313) 555-1234" required> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Message</label> <textarea rows="3" name="message" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Briefly describe your issue..." required></textarea> </div> <button type="submit" id="modalSubmitBtn" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"> <span id="modalSubmitText">Submit Request</span> <span id="modalSubmitLoading" class="hidden"> <svg class="animate-spin inline w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
Sending...
</span> </button> </form> </div> </div> <!-- 🧠 Modal Script --> <script type="module">`, `
    // Import Supabase from CDN for client-side use
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
    
    document.addEventListener("DOMContentLoaded", () => {
      // Supabase configuration from environment variables
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const modal = document.getElementById("quoteModal");
      const openBtn = document.getElementById("openModalBtn");
      const closeBtn = document.getElementById("closeModalBtn");
      
      // Modal form handling
      const modalForm = document.getElementById('appointmentForm');
      const modalSubmitBtn = document.getElementById('modalSubmitBtn');
      const modalSubmitText = document.getElementById('modalSubmitText');
      const modalSubmitLoading = document.getElementById('modalSubmitLoading');
      const modalFormMessages = document.getElementById('modalFormMessages');
      const modalSuccessMessage = document.getElementById('modalSuccessMessage');
      const modalErrorMessage = document.getElementById('modalErrorMessage');
      const modalLoadingMessage = document.getElementById('modalLoadingMessage');
  
      // Modal open/close functionality
      openBtn?.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex"); // ensure centering
      });
  
      const closeModal = () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        // Reset form and hide messages when closing
        hideModalMessages();
        modalForm?.reset();
      };
  
      closeBtn?.addEventListener("click", closeModal);
      modal?.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      });

      // Form submission handling (if modal form exists)
      if (modalForm) {
        // Function to show specific message
        function showModalMessage(messageType) {
          // Hide all messages first
          modalSuccessMessage.classList.add('hidden');
          modalErrorMessage.classList.add('hidden');
          modalLoadingMessage.classList.add('hidden');
          
          // Show container and specific message
          modalFormMessages.classList.remove('hidden');
          document.getElementById('modal' + messageType.charAt(0).toUpperCase() + messageType.slice(1) + 'Message').classList.remove('hidden');
        }

        // Function to hide all messages
        function hideModalMessages() {
          modalFormMessages.classList.add('hidden');
          modalSuccessMessage.classList.add('hidden');
          modalErrorMessage.classList.add('hidden');
          modalLoadingMessage.classList.add('hidden');
        }

        // Function to set loading state
        function setModalLoadingState(loading) {
          modalSubmitBtn.disabled = loading;
          if (loading) {
            modalSubmitText.classList.add('hidden');
            modalSubmitLoading.classList.remove('hidden');
            showModalMessage('loading');
          } else {
            modalSubmitText.classList.remove('hidden');
            modalSubmitLoading.classList.add('hidden');
          }
        }

        // Handle form submission
        modalForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          setModalLoadingState(true);
          
          try {
            // Get form data
            const formData = new FormData(modalForm);
            const name = formData.get('name')?.trim();
            const phone = formData.get('phone')?.trim();
            const message = formData.get('message')?.trim();
            
            // Basic validation
            if (!name || !phone || !message) {
              throw new Error('Please fill in all required fields');
            }
            
            // Save to Supabase database
            const { data, error } = await supabase
              .from('form_submissions')
              .insert([
                {
                  full_name: name,
                  phone_number: phone,
                  service_address: '',
                  furnace_issue: message,
                  photo_count: 0,
                  photo_urls: [],
                  form_source: 'hero_modal'
                }
              ]);
            
            if (error) {
              console.error('Error saving form:', error);
              throw new Error('Failed to submit form');
            }
            
            // Success
            setModalLoadingState(false);
            showModalMessage('success');
            modalForm.reset(); // Clear form
            
            // Close modal after 3 seconds
            setTimeout(() => closeModal(), 3000);
            
          } catch (error) {
            console.error('Submission error:', error);
            setModalLoadingState(false);
            showModalMessage('error');
            
            // Hide error message after 5 seconds
            setTimeout(() => hideModalMessages(), 5000);
          }
        });
      }
    });
  </script> </div></section>`])), maybeRenderHead(), primaryBtnText, defineScriptVars({ SUPABASE_URL, SUPABASE_ANON_KEY }));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/HeroHeader.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$WhyChooseUs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<script type="module" src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"><\/script> ', '<section class="relative pt-20 pb-10 px-6 bg-gradient-to-br from-gray-50 via-white to-red-50 border-t border-gray-200 overflow-hidden"> <!-- Decorative Accent Bar --> <div class="absolute top-0 left-0 w-24 h-1 bg-red-600 rounded-tr-xl"></div> <div class="max-w-6xl mx-auto text-center relative z-10"> <h3 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">\nWhy Homeowners <span class="text-red-600">Choose Us</span> </h3> <p class="text-gray-700 font-semibold text-base md:text-lg max-w-2xl mx-auto mb-14">\nWe\u2019re known for fast service, fair pricing, and Detroit-built integrity.\n      Every job we do reflects our promise: <span class="text-red-600 font-bold">reliable, honest, and done right.</span> </p> <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-left"> <!-- Card 1 --> <div class="p-8 rounded-2xl border border-gray-200 bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all hover:-translate-y-1"> <i data-lucide="clock" class="w-10 h-10 text-red-600 mb-5"></i> <h4 class="font-bold text-lg text-gray-900 mb-2 uppercase tracking-wide">\nSame-Day Service\n</h4> <p class="text-gray-700 text-sm md:text-base font-medium leading-relaxed">\nWe prioritize urgent furnace repairs \u2014 get your heat back the same day you call.\n</p> </div> <!-- Card 2 --> <div class="p-8 rounded-2xl border border-gray-200 bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all hover:-translate-y-1"> <i data-lucide="badge-check" class="w-10 h-10 text-red-600 mb-5"></i> <h4 class="font-bold text-lg text-gray-900 mb-2 uppercase tracking-wide">\nLicensed Technicians\n</h4> <p class="text-gray-700 text-sm md:text-base font-medium leading-relaxed">\nEvery repair is handled by certified HVAC professionals \u2014 insured, background checked, and experienced.\n</p> </div> <!-- Card 3 --> <div class="p-8 rounded-2xl border border-gray-200 bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all hover:-translate-y-1"> <i data-lucide="wallet" class="w-10 h-10 text-red-600 mb-5"></i> <h4 class="font-bold text-lg text-gray-900 mb-2 uppercase tracking-wide">\nTransparent Pricing\n</h4> <p class="text-gray-700 text-sm md:text-base font-medium leading-relaxed">\nNo surprises. Get upfront estimates and honest recommendations for your system.\n</p> </div> <!-- Card 4 --> <div class="p-8 rounded-2xl border border-gray-200 bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all hover:-translate-y-1"> <i data-lucide="map-pin" class="w-10 h-10 text-red-600 mb-5"></i> <h4 class="font-bold text-lg text-gray-900 mb-2 uppercase tracking-wide">\nTrusted Locally\n</h4> <p class="text-gray-700 text-sm md:text-base font-medium leading-relaxed">\nProudly serving Detroit and neighboring cities with integrity and care since 2024.\n</p> </div> </div> </div> ', " </section>"])), maybeRenderHead(), renderScript($$result, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/WhyChooseUs.astro?astro&type=script&index=0&lang.ts"));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/WhyChooseUs.astro", void 0);

const $$GetQuoteSection = createComponent(($$result, $$props, $$slots) => {
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
      required: true,
      autoComplete: "name"
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone Number",
      placeholder: "(313) 555-1234",
      required: true,
      autoComplete: "tel"
    },
    {
      name: "address",
      type: "address",
      label: "Address",
      placeholder: "Enter your full address",
      required: true,
      autoComplete: "street-address"
    },
    {
      name: "issue",
      type: "select",
      label: "What's happening with your furnace?",
      required: true,
      options: [
        "It won't turn on",
        "It's blowing cold air",
        "It's making strange noises",
        "It's old and unreliable",
        "Not sure / want a check-up"
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 pt-10 pb-10 px-6 md:px-10"> <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center"> <!-- 🔴 Left Side: Lead Form --> <div class="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10 flex flex-col justify-center"> ${renderComponent($$result, "UniversalForm", $$UniversalForm, { "formId": "homepage-quote-form", "formSource": "homepage_quote_form", "apiEndpoint": "/api/submit-form", "title": "Get Your Furnace Fixed Fast", "description": "Fill out this form \u2014 a local HVAC expert will call you back right away.", "fields": fields, "submitText": "Get a Free Quote", "className": "" })} <p class="text-xs text-gray-500 mt-4 text-center">
By submitting this form, you agree to be contacted by Fix My Furnace or
        its partners for scheduling and service information.
</p> </div> <!-- ⚙️ Right Side: About Us --> <div class="flex flex-col justify-center text-left md:pl-6 lg:pl-10"> <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
Built on <span class="text-red-600">Trust, Speed,</span><br>
and <span class="underline decoration-red-500">Real Detroit Grit.</span> </h2> <p class="text-gray-700 text-lg md:text-xl font-semibold mb-6">
We're not a call center — we're your local HVAC pros. When your furnace
        breaks, we move fast, work clean, and don't leave you guessing. Every
        job is done with care, precision, and old-school craftsmanship.
</p> <div class="mt-6 flex flex-col sm:flex-row gap-4"> <a href="/about" class="inline-block px-6 py-3 font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
Learn More
</a> <a href="/contact" class="inline-block px-6 py-3 font-bold border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition">
Contact Us
</a> </div> </div> </div> </section>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/GetQuoteSection.astro", void 0);

const $$GallerySection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 px-6 md:px-10 text-gray-900"> <div class="max-w-7xl mx-auto text-center"> <!-- Header --> <h2 class="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"> <span class="text-red-600">Proudly</span> Built in Detroit
</h2> <p class="text-lg md:text-xl font-semibold text-gray-700 mb-14 max-w-3xl mx-auto">
The work, the people, and the pride that power every furnace we fix across Metro Detroit.
</p> <!-- Grid --> <div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"> <!-- Image Card --> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/furnace_installation_michigan.png" alt="Furnace Installation" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Furnace Installation
</h3> </div> </div> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/repair.png" alt="Furnace Repairs" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Furnace Repair
</h3> </div> </div> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/pros.png" alt="Emergency Repaird" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Emergency Repairs
</h3> </div> </div> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/duct_cleaning_detroit.png" alt="Duct Cleaning" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Duct Cleaning
</h3> </div> </div> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/hvac_pros.png" alt="Boiler Repair Services" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Boiler Repair
</h3> </div> </div> <div class="relative group overflow-hidden rounded-2xl shadow-lg aspect-square bg-gray-200"> <img src="/maintenance.png" alt="Maintenance Checks" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> <div class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent"> <h3 class="text-lg md:text-xl font-bold text-white bg-red-600/90 px-4 py-2 rounded-md mb-6 shadow-md">
Maintenance Checks
</h3> </div> </div> </div> </div> </section>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/GallerySection.astro", void 0);

const $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative bg-gradient-to-br from-orange-50 via-white to-red-50 py-20 px-6 md:px-10" data-astro-cid-zzqkys7x> <div class="max-w-7xl mx-auto text-center" data-astro-cid-zzqkys7x> <!-- 🔥 Section Header --> <h2 class="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight" data-astro-cid-zzqkys7x>
What <span class="text-red-600" data-astro-cid-zzqkys7x>Michigan Homeowners</span> Are Saying
</h2> <p class="text-lg md:text-xl font-semibold text-gray-700 mb-14 max-w-3xl mx-auto" data-astro-cid-zzqkys7x>
Real stories from real customers who got their heat back fast — the Fix My Furnace way.
</p> <!-- 💬 Testimonials Grid --> <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-astro-cid-zzqkys7x> <!-- Card 1 --> <div class="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition" data-astro-cid-zzqkys7x> <img src="/gallery1.jpg" alt="Customer portrait" class="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-red-100" data-astro-cid-zzqkys7x> <p class="text-lg italic text-gray-700 mb-4 leading-relaxed" data-astro-cid-zzqkys7x>
“My furnace died on the coldest night of January. Fix My Furnace had a tech at my door in
            under 2 hours — heat was back before midnight. Total lifesavers.”
</p> <div class="text-center" data-astro-cid-zzqkys7x> <h4 class="font-bold text-gray-900 text-lg" data-astro-cid-zzqkys7x>Danielle R.</h4> <p class="text-sm text-gray-500" data-astro-cid-zzqkys7x>Eastpointe, MI</p> </div> </div> <!-- Card 2 --> <div class="flex flex-col items-center bg-red-600 text-white rounded-2xl shadow-xl p-8 hover:bg-red-700 transition" data-astro-cid-zzqkys7x> <img src="/gallery2.jpg" alt="Customer portrait" class="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-white/40" data-astro-cid-zzqkys7x> <p class="text-lg italic mb-4 leading-relaxed opacity-95" data-astro-cid-zzqkys7x>
“The techs were polite, clean, and fast. No upselling, no games — just honest work and fair
            pricing. Feels good to hire a Detroit-based crew that cares.”
</p> <div class="text-center" data-astro-cid-zzqkys7x> <h4 class="font-bold text-white text-lg" data-astro-cid-zzqkys7x>Marcus T.</h4> <p class="text-sm text-white/80" data-astro-cid-zzqkys7x>Dearborn, MI</p> </div> </div> <!-- Card 3 --> <div class="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition" data-astro-cid-zzqkys7x> <img src="/gallery3.jpg" alt="Customer portrait" class="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-red-100" data-astro-cid-zzqkys7x> <p class="text-lg italic text-gray-700 mb-4 leading-relaxed" data-astro-cid-zzqkys7x>
“They replaced my old furnace in one day. Super clean work and even helped me set up my
            thermostat. Highly recommend these guys.”
</p> <div class="text-center" data-astro-cid-zzqkys7x> <h4 class="font-bold text-gray-900 text-lg" data-astro-cid-zzqkys7x>Lorenzo G.</h4> <p class="text-sm text-gray-500" data-astro-cid-zzqkys7x>Detroit, MI</p> </div> </div> </div> </div> <!-- 📱 Mobile Scroll Behavior -->  </section>`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/components/TestimonialsSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Furnace Repair Michigan | HVAC Services Detroit, Grand Rapids, Ann Arbor | Fix My Furnace", "description": "Professional furnace repair, boiler service, installation & HVAC services across Michigan. Serving Detroit, Grand Rapids, Ann Arbor, Lansing & all Michigan cities. Licensed technicians, 24/7 emergency service, free quotes.", "keywords": "furnace repair Michigan, boiler repair Michigan, HVAC contractors Detroit, furnace installation Grand Rapids, boiler service Ann Arbor, heating service Lansing, emergency furnace repair Michigan, licensed HVAC technicians" }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "HeroHeader", $$HeroHeader, { "title": "Michigan's Trusted Furnace & HVAC Experts", "description": "Fast, licensed, and local furnace repair, boiler service, and installation services across Michigan. Serving Detroit, Grand Rapids, Ann Arbor, Lansing and all Michigan cities. Call today to get your heat back on.", "primaryBtnText": "Schedule an Appointment Now!", "primaryBtnLink": "/landing_page_1", "secondaryBtnText": "Text Us", "secondaryBtnLink": "tel:+8334948669", "imageSrc": "/Fix_My_Furnace_Hero_Image.png" })}  ${renderComponent($$result2, "ServiceAreasSection", $$ServiceAreasSection, {})}  ${renderComponent($$result2, "GallerySection", $$GallerySection, {})}  ${renderComponent($$result2, "WhyChooseUs", $$WhyChooseUs, {})}  ${renderComponent($$result2, "TestimonialsSection", $$TestimonialsSection, {})}  ${renderComponent($$result2, "GetQuoteSection", $$GetQuoteSection, {})} ` })}`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/index.astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
