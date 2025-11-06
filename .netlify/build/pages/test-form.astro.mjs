import { d as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Biyn9gVN.mjs';
import { $ as $$Layout } from '../chunks/Layout_Cfg4U_G4.mjs';
import { $ as $$UniversalForm } from '../chunks/UniversalForm_C-iNv1xW.mjs';
export { renderers } from '../renderers.mjs';

const $$TestForm = createComponent(($$result, $$props, $$slots) => {
  const fields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
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
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your@email.com",
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
      name: "issue",
      type: "textarea",
      label: "Describe Your Issue",
      placeholder: "Tell us about your furnace problem...",
      required: false
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Test Form - Universal Form Component" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50 py-12"> <div class="max-w-2xl mx-auto px-4"> <div class="bg-white rounded-lg shadow-lg p-8"> <h1 class="text-4xl font-bold text-gray-900 mb-6 text-center">
Test Universal Form
</h1> <p class="text-gray-600 mb-8 text-center">
This is a test page to validate the new UniversalForm component with all field types and security features.
</p> ${renderComponent($$result2, "UniversalForm", $$UniversalForm, { "formId": "test-form", "formSource": "/api/submit-form", "title": "Contact Form Test", "description": "Fill out this form to test the new universal form system", "fields": fields, "submitText": "Submit Test Form", "className": "max-w-lg mx-auto" })} <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg"> <h3 class="font-semibold text-blue-800 mb-2">Test Features:</h3> <ul class="text-sm text-blue-700 space-y-1"> <li>• Phone number formatting and validation</li> <li>• Address autocomplete (if Mapbox token is configured)</li> <li>• CSRF protection</li> <li>• Rate limiting</li> <li>• Form submission to form_submissions table</li> <li>• Real-time validation feedback</li> </ul> </div> </div> </div> </div> ` })}`;
}, "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/test-form.astro", void 0);

const $$file = "/Users/Zach/Github_Projects/fix-my-furnace/src/pages/test-form.astro";
const $$url = "/test-form";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestForm,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
