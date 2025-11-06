import { d as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
export { renderers } from '../renderers.mjs';

const $$LandingPage1 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Fix My Furnace Detroit | Same-Day Furnace Repair" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50 text-center px-6 pt-16 pb-16"> <div class="max-w-3xl mx-auto"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"> <span class="text-red-600">No Heat?</span> We’ll Fix Your Furnace
<span class="underline decoration-red-600">Today.</span> </h1> <p class="text-lg md:text-xl text-gray-700 font-semibold mb-10 max-w-2xl mx-auto">
Fast, licensed, same-day furnace repair from local Metro Detroit HVAC
        pros. Reliable. Honest. Built on Detroit grit.
</p> </div> <!-- 🧾 Lead Form --> <form id="leadForm" class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-left border border-gray-100"> <!-- Step 1 --> <div id="step1" class="space-y-5"> <div> <label for="zip" class="block font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">Enter Your ZIP Code</label> <input type="text" id="zip" maxlength="5" placeholder="e.g. 48226" class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base"> </div> <button type="button" id="nextStep" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow hover:bg-red-700 active:scale-[0.98] transition">
Check Availability
</button> </div> <!-- Step 2 --> <div id="step2" class="hidden space-y-4"> <div> <label class="block font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">What’s happening with your furnace?</label> <select id="issue" class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"> <option value="">Select an issue...</option> <option>It won't turn on</option> <option>It's blowing cold air</option> <option>Strange noises</option> <option>Old or unreliable</option> <option>Not sure</option> </select> </div> <div> <label class="block font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">When do you need service?</label> <select id="urgency" class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"> <option value="">Select...</option> <option>Today</option> <option>Tomorrow</option> <option>This week</option> <option>Within the next 30 days</option> <option>Within the next 90 days</option> <option>Just getting quotes</option> </select> </div> <input type="text" id="name" placeholder="Full Name" class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"> <input type="tel" id="phone" placeholder="Phone Number" class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"> <input type="email" id="email" placeholder="Email Address" class="w-full border border-gray-300 rounded-lg p-3 text-base focus:ring-2 focus:ring-red-500 focus:border-red-500"> <button type="submit" class="w-full bg-red-600 text-white font-bold py-3 rounded-lg shadow hover:bg-red-700 active:scale-[0.98] transition">
Get My Furnace Fixed
</button> </div> </form> <!-- ✅ Trust Bar --> <div class="flex flex-wrap justify-center gap-6 mt-10 text-sm md:text-base font-semibold text-gray-700"> <div class="flex items-center gap-2"> <i class="text-red-600">🏠</i> Detroit Local
</div> <div class="flex items-center gap-2"> <i class="text-red-600">🕒</i> Same-Day Service
</div> <div class="flex items-center gap-2"> <i class="text-red-600">✅</i> Licensed & Insured
</div> </div> <!-- 🧭 Background Accent --> <div class="absolute inset-0 bg-gradient-to-b from-red-50/20 via-transparent to-gray-50 pointer-events-none -z-10"></div> </section>  <footer class="bg-gray-900 text-gray-300 text-center text-sm py-6 mt-10"> <p>© 2025 Fix My Furnace Detroit. All rights reserved.</p> </footer> ` })} <!-- 🧠 Script --> ${renderScript($$result, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro";
const $$url = "/landing_page_1";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$LandingPage1,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
