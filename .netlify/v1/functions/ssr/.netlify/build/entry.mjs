import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BADMdV9r.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/cleanup-expired.astro.mjs');
const _page3 = () => import('./pages/api/resend-verification.astro.mjs');
const _page4 = () => import('./pages/api/send-verification.astro.mjs');
const _page5 = () => import('./pages/api/submit-form.astro.mjs');
const _page6 = () => import('./pages/api/verify-phone.astro.mjs');
const _page7 = () => import('./pages/contact.astro.mjs');
const _page8 = () => import('./pages/furnace-diagnosis.astro.mjs');
const _page9 = () => import('./pages/home-visit.astro.mjs');
const _page10 = () => import('./pages/landing_page_1.astro.mjs');
const _page11 = () => import('./pages/landing_page_2.astro.mjs');
const _page12 = () => import('./pages/pricing.astro.mjs');
const _page13 = () => import('./pages/services/_slug_.astro.mjs');
const _page14 = () => import('./pages/services.astro.mjs');
const _page15 = () => import('./pages/test-form.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/cleanup-expired.js", _page2],
    ["src/pages/api/resend-verification.js", _page3],
    ["src/pages/api/send-verification.js", _page4],
    ["src/pages/api/submit-form.js", _page5],
    ["src/pages/api/verify-phone.js", _page6],
    ["src/pages/contact.astro", _page7],
    ["src/pages/furnace-diagnosis.astro", _page8],
    ["src/pages/home-visit.astro", _page9],
    ["src/pages/landing_page_1.astro", _page10],
    ["src/pages/landing_page_2.astro", _page11],
    ["src/pages/pricing.astro", _page12],
    ["src/pages/services/[slug].astro", _page13],
    ["src/pages/services.astro", _page14],
    ["src/pages/test-form.astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3cc95553-7f04-44e9-9d09-48c58109bde2"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
