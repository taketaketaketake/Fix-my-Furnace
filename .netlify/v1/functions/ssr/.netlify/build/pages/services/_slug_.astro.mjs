import { c as createAstro, d as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Cfg4U_G4.mjs';
export { renderers } from '../../renderers.mjs';

const services = [
    {
      slug: "furnace-repair",
      title: "Furnace Repair",
      subtitle: "Fast, Local, and Built on Trust.",
      description:
        "Whether it’s midnight or the middle of a Michigan blizzard, our certified techs are ready to get your furnace running again — same-day service available across the state.",
      heroImage: "/Fix_My_Furnace_Hero_Image.png",
      features: [
        { icon: "wrench", title: "Same-Day Service", text: "We respond fast — no waiting days for heat." },
        { icon: "shield-check", title: "Licensed Experts", text: "Certified, insured, and vetted Michigan techs." },
        { icon: "wallet", title: "Upfront Pricing", text: "Honest, transparent rates before we start work." },
        { icon: "sparkles", title: "Guaranteed Work", text: "Every repair comes backed by our service guarantee." },
      ],
    },
    {
      slug: "furnace-installation",
      title: "Furnace Installation",
      subtitle: "Expert Installs Done Right.",
      description:
        "We don’t just drop off a unit — we handle every detail, from sizing to setup, ensuring your home heats evenly and efficiently all winter long.",
      heroImage: "/furnace_installation_michigan.png",
      features: [
        { icon: "settings", title: "Precision Setup", text: "Installed and calibrated by experienced techs." },
        { icon: "thermometer-sun", title: "Energy Efficient", text: "Save money and stay comfortable with top brands." },
        { icon: "badge-check", title: "Fully Insured", text: "All installs meet Michigan HVAC code requirements." },
        { icon: "star", title: "Satisfaction Guaranteed", text: "We stand behind every installation." },
      ],
    },
    {
      slug: "boiler-repair",
      title: "Boiler Repair",
      subtitle: "Heat That Never Quits.",
      description:
        "From Detroit to Traverse City, we fix boilers fast — restoring steady, reliable heat and keeping Michigan families comfortable through every cold front.",
      heroImage: "/repair.png",
      features: [
        { icon: "flame", title: "Steam & Water Systems", text: "Full expertise in all major boiler types." },
        { icon: "tools", title: "Precision Diagnostics", text: "We identify and fix issues fast." },
        { icon: "wallet", title: "Transparent Costs", text: "No hidden fees — just honest, fair quotes." },
        { icon: "zap", title: "24/7 Emergency Service", text: "We’re always available when heat fails." },
      ],
    },
    {
      slug: "duct-cleaning",
      title: "Duct Cleaning",
      subtitle: "Breathe Cleaner, Healthier Air.",
      description:
        "Professional duct cleaning removes years of dust, allergens, and debris from your HVAC system — improving air quality and helping your furnace run more efficiently across Michigan.",
      heroImage: "/duct_cleaning_detroit.png",
      features: [
        { icon: "wind", title: "Deep System Cleaning", text: "We clean every vent, duct, and component thoroughly." },
        { icon: "shield", title: "Allergen Removal", text: "Eliminate dust, pollen, and other airborne irritants." },
        { icon: "zap", title: "Improved Efficiency", text: "Clean ducts help your HVAC system work better." },
        { icon: "heart", title: "Healthier Home", text: "Better air quality for you and your family." },
      ],
    },
    {
      slug: "emergency-hvac",
      title: "Emergency HVAC Service",
      subtitle: "24/7 Emergency Response.",
      description:
        "When your heat goes out in the middle of a Michigan winter, we're here 24/7. Our emergency HVAC technicians respond fast to get your system running and your family warm again.",
      heroImage: "/pros.png",
      features: [
        { icon: "clock", title: "24/7 Availability", text: "Emergency service any time, day or night." },
        { icon: "truck", title: "Rapid Response", text: "We get to you fast when heat fails." },
        { icon: "wrench", title: "Immediate Fixes", text: "Emergency repairs to restore heat quickly." },
        { icon: "phone", title: "Always Ready", text: "One call gets our emergency team rolling." },
      ],
    },
    {
      slug: "maintenance",
      title: "Maintenance & Tune-Ups",
      subtitle: "Keep Your System Running Strong.",
      description:
        "Regular maintenance keeps your furnace running safely, efficiently, and reliably. Our comprehensive tune-ups catch problems early and extend your system's life across Michigan's harsh winters.",
      heroImage: "/maintenance.png",
      features: [
        { icon: "settings", title: "Complete Inspection", text: "Thorough check of all system components." },
        { icon: "shield-check", title: "Safety First", text: "Ensure safe operation and prevent hazards." },
        { icon: "battery", title: "Peak Efficiency", text: "Optimize performance and reduce energy costs." },
        { icon: "calendar", title: "Scheduled Service", text: "Regular maintenance plans available." },
      ],
    },
    {
      slug: "air-quality",
      title: "Air Quality Solutions",
      subtitle: "Pure Comfort for Your Home.",
      description:
        "Enhance your home's comfort with professional air quality solutions — humidifiers, purifiers, and advanced filtration systems that keep Michigan families breathing easy all year long.",
      heroImage: "/hvac_pros.png",
      features: [
        { icon: "droplets", title: "Humidity Control", text: "Proper moisture levels for comfort and health." },
        { icon: "filter", title: "Advanced Filtration", text: "Remove particles and improve indoor air." },
        { icon: "leaf", title: "Purification Systems", text: "Eliminate odors and airborne contaminants." },
        { icon: "home", title: "Whole-Home Solutions", text: "Comprehensive air quality improvements." },
      ],
    },
  ];

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://fixmyfurnacedetroit.com");
async function getStaticPaths() {
  return services.map((service) => ({
    params: { slug: service.slug },
    props: service
  }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { title, subtitle, description, heroImage, features } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", ' <!-- Lucide Icons --> <script type="module" src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"><\/script> <!-- Initialize Lucide icons --> <script is:client>\n  document.addEventListener("DOMContentLoaded", () => {\n    if (window.lucide) lucide.createIcons();\n  });\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, { "title": `${title} | Fix My Furnace Detroit` }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative min-h-[85vh] flex flex-col md:grid md:grid-cols-2 overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50"> <!-- TEXT --> <div class="flex flex-col justify-center px-6 md:px-12 py-20 z-10"> <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight"> <span class="text-red-600">${title}</span><br> ${subtitle} </h1> <p class="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-8"> ${description} </p> <a href="/landing_page_1" class="inline-block bg-red-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-red-700 active:scale-[0.98] transition">
Get a Free Quote
</a> </div> <!-- IMAGE --> <div class="relative w-full h-[340px] md:h-auto"> <img${addAttribute(heroImage, "src")}${addAttribute(`${title} in action`, "alt")} class="absolute inset-0 w-full h-full object-cover object-center" loading="eager"> <div class="absolute inset-0 bg-gradient-to-l from-black/25 to-transparent md:hidden"></div> </div> <!-- Decorative depth bar --> <div class="absolute bottom-0 left-0 w-full h-2 bg-red-600"></div> </section>  <section class="relative py-24 px-6 md:px-12 bg-white"> <div class="max-w-6xl mx-auto text-center mb-12"> <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
Why Detroit Homeowners Choose Our ${title} </h2> <p class="text-gray-600 text-lg">
We combine 40+ years of experience with cutting-edge HVAC technology to deliver service that’s fast, fair, and built to last.
</p> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"> ${features.map((f) => renderTemplate`<div class="p-8 bg-gray-50 border rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1"> <i${addAttribute(f.icon, "data-lucide")} class="w-10 h-10 text-red-600 mb-4"></i> <h3 class="text-xl font-bold mb-2 text-gray-900">${f.title}</h3> <p class="text-gray-600 text-sm leading-relaxed">${f.text}</p> </div>`)} </div> </section>  <section class="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-6 md:px-12"> <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"> <!-- IMAGE LEFT --> <div class="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-red-600"> <img src="/group_photo.png" alt="Tech working on furnace" class="w-full h-full object-cover"> <div class="absolute inset-0 bg-black/30"></div> </div> <!-- TEXT RIGHT --> <div class="relative z-10"> <h3 class="text-3xl font-extrabold mb-6">Detroit-Strong Service, Backed by Real Guarantees</h3> <p class="text-lg text-gray-300 leading-relaxed mb-6">
Our technicians aren’t call-center contractors — they’re seasoned experts who take pride in doing every job right the first time.
          From tune-ups to total replacements, we handle every detail with precision and respect for your home.
</p> <ul class="text-gray-200 space-y-3 mb-8"> <li>✅ 24/7 Emergency Availability</li> <li>✅ Fully Licensed & Insured Team</li> <li>✅ Service Across All of Michigan</li> </ul> <a href="/landing_page_1" class="inline-block bg-white text-red-600 font-bold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition">
Schedule Service Now
</a> </div> </div> </section>  <section class="relative bg-red-600 text-white text-center py-20 px-6"> <h2 class="text-3xl md:text-4xl font-extrabold mb-4">
Ready to Fix Your ${title}?
</h2> <p class="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
No matter the issue, we’re standing by to get your home warm again — fast, honest, and locally driven.
</p> <a href="/landing_page_1" class="inline-block bg-white text-red-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-100 transition">
Request Your Quote
</a> </section> ` }));
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/services/[slug].astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/services/[slug].astro";
const $$url = "/services/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
