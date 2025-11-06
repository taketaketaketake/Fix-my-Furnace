import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
import { $ as $$ServiceAreasSection } from '../chunks/ServiceAreasSection_DfSPOe58.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Fix My Furnace | Michigan HVAC Experts | Detroit, Grand Rapids, Ann Arbor", "description": "Learn about Fix My Furnace - Michigan's trusted HVAC experts serving Detroit, Grand Rapids, Ann Arbor, Lansing and all Michigan cities for over 40 years. Licensed, insured, local technicians.", "keywords": "Michigan HVAC company, Detroit furnace experts, Grand Rapids heating contractors, Ann Arbor HVAC technicians, Lansing furnace specialists, Michigan heating services" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-br from-red-50 via-white to-gray-50 py-24 px-6 md:px-12"> <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"> <div> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"> <span class="text-red-600">Trusted. Local. Proven.</span><br>
The Michigan HVAC Experts You Can Count On.
</h1> <p class="text-gray-700 text-lg md:text-xl leading-relaxed font-semibold mb-6">
For over <span class="text-red-600 font-bold">40 years</span>, we’ve helped Michigan homeowners stay warm through the toughest winters. 
          Fix My Furnace is built on a foundation of speed, skill, and old-school Detroit craftsmanship — backed by today’s modern tech and reliability.
</p> <a href="/landing_page_1" class="inline-block bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow hover:bg-red-700 active:scale-[0.98] transition">
Get a Free Quote
</a> </div> <!-- Hero Image --> <div class="relative"> <img src="/group_photo.png" alt="Detroit furnace repair experts at work" class="rounded-2xl shadow-2xl object-cover w-full h-[400px]"> <div class="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent rounded-2xl"></div> </div> </div> </section>  <section class="bg-white py-20 px-6 md:px-12"> <div class="max-w-6xl mx-auto text-center"> <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
Over <span class="text-red-600">Four Decades</span> of HVAC Excellence
</h2> <p class="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
We’ve been repairing, replacing, and maintaining furnaces across Michigan since the days of analog thermostats.
        Today, we bring that same reliable, hard-earned expertise to every call — with digital precision and genuine care.
</p> </div> </section>  <section class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-24 px-6 md:px-12"> <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"> <div> <h2 class="text-3xl md:text-4xl font-extrabold mb-6">
Partnered With <span class="text-red-500">Michigan’s Best</span> </h2> <p class="text-gray-300 text-lg leading-relaxed mb-6">
We work exclusively with the most reputable, honest, and locally owned contractors across the state — 
          the same people who live, work, and raise families right here in Michigan.
</p> <p class="text-gray-300 text-lg leading-relaxed">
Every Fix My Furnace partner is licensed, insured, and vetted for quality, transparency, and real-world results. 
          You can trust every name we stand behind.
</p> </div> <div class="grid grid-cols-2 sm:grid-cols-3 gap-6"> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Trane
</div> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Mitsubishi
</div> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Lennox
</div> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Bryant
</div> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Generac
</div> <div class="bg-white/10 rounded-xl py-8 text-center font-bold text-gray-100 hover:bg-red-600/80 transition">
Rheem
</div> </div> </div> </section>  ${renderComponent($$result2, "ServiceAreasSection", $$ServiceAreasSection, {})}  <section class="bg-red-600 text-white text-center py-20 px-6"> <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
Need Service? We’ll Be There — Fast.
</h2> <p class="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
Our Michigan-based team is on call 24/7 for emergency furnace repair across the state. 
      Don’t wait — get your heat back on today.
</p> <a href="/home-visit" class="bg-white text-red-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg">
Schedule an Appointment
</a> </section> ` })}`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/about.astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
