import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_Biyn9gVN.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/Zach/Github_Projects/fix-my-furnace/","cacheDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/node_modules/.astro/","outDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/dist/","srcDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/src/","publicDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/public/","buildClientDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/dist/","buildServerDir":"file:///Users/Zach/Github_Projects/fix-my-furnace/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/cleanup-expired","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/cleanup-expired\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"cleanup-expired","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/cleanup-expired.js","pathname":"/api/cleanup-expired","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/resend-verification","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/resend-verification\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"resend-verification","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/resend-verification.js","pathname":"/api/resend-verification","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send-verification","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send-verification\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send-verification","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send-verification.js","pathname":"/api/send-verification","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-form","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-form\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-form.js","pathname":"/api/submit-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/verify-phone","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/verify-phone\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"verify-phone","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/verify-phone.js","pathname":"/api/verify-phone","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/furnace-diagnosis","isIndex":false,"type":"page","pattern":"^\\/furnace-diagnosis\\/?$","segments":[[{"content":"furnace-diagnosis","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/furnace-diagnosis.astro","pathname":"/furnace-diagnosis","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/home-visit","isIndex":false,"type":"page","pattern":"^\\/home-visit\\/?$","segments":[[{"content":"home-visit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/home-visit.astro","pathname":"/home-visit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/landing_page_1","isIndex":false,"type":"page","pattern":"^\\/landing_page_1\\/?$","segments":[[{"content":"landing_page_1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing_page_1.astro","pathname":"/landing_page_1","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/landing_page_2","isIndex":false,"type":"page","pattern":"^\\/landing_page_2\\/?$","segments":[[{"content":"landing_page_2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/landing_page_2.astro","pathname":"/landing_page_2","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/pricing","isIndex":false,"type":"page","pattern":"^\\/pricing\\/?$","segments":[[{"content":"pricing","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pricing.astro","pathname":"/pricing","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/services/[slug]","isIndex":false,"type":"page","pattern":"^\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/services/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"}],"routeData":{"route":"/test-form","isIndex":false,"type":"page","pattern":"^\\/test-form\\/?$","segments":[[{"content":"test-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/test-form.astro","pathname":"/test-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.C8TP7OHP.css"},{"type":"inline","content":"@media(max-width:768px){.grid[data-astro-cid-zzqkys7x]{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:1.5rem;padding-bottom:1rem}.grid[data-astro-cid-zzqkys7x]>div[data-astro-cid-zzqkys7x]{flex:0 0 85%;scroll-snap-align:center}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://fixmyfurnacedetroit.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/furnace-diagnosis.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/home-visit.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_2.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/pricing.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/services.astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/services/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/test-form.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/cleanup-expired@_@js":"pages/api/cleanup-expired.astro.mjs","\u0000@astro-page:src/pages/api/resend-verification@_@js":"pages/api/resend-verification.astro.mjs","\u0000@astro-page:src/pages/api/send-verification@_@js":"pages/api/send-verification.astro.mjs","\u0000@astro-page:src/pages/api/submit-form@_@js":"pages/api/submit-form.astro.mjs","\u0000@astro-page:src/pages/api/verify-phone@_@js":"pages/api/verify-phone.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/furnace-diagnosis@_@astro":"pages/furnace-diagnosis.astro.mjs","\u0000@astro-page:src/pages/home-visit@_@astro":"pages/home-visit.astro.mjs","\u0000@astro-page:src/pages/landing_page_1@_@astro":"pages/landing_page_1.astro.mjs","\u0000@astro-page:src/pages/landing_page_2@_@astro":"pages/landing_page_2.astro.mjs","\u0000@astro-page:src/pages/pricing@_@astro":"pages/pricing.astro.mjs","\u0000@astro-page:src/pages/services/[slug]@_@astro":"pages/services/_slug_.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/test-form@_@astro":"pages/test-form.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BADMdV9r.mjs","/Users/Zach/Github_Projects/fix-my-furnace/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/Zach/Github_Projects/fix-my-furnace/src/pages/furnace-diagnosis.astro?astro&type=script&index=0&lang.ts":"_astro/furnace-diagnosis.astro_astro_type_script_index_0_lang.CpqzEMls.js","/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.mLzkfoYK.js","/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro?astro&type=script&index=0&lang.ts":"_astro/landing_page_1.astro_astro_type_script_index_0_lang.CctTf5HS.js","/Users/Zach/Github_Projects/fix-my-furnace/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BHnsokuw.js","/Users/Zach/Github_Projects/fix-my-furnace/src/components/WhyChooseUs.astro?astro&type=script&index=0&lang.ts":"_astro/WhyChooseUs.astro_astro_type_script_index_0_lang.CqG9JLaJ.js","/Users/Zach/Github_Projects/fix-my-furnace/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BUmg8Eas.js","/Users/Zach/Github_Projects/fix-my-furnace/src/pages/home-visit.astro?astro&type=script&index=0&lang.ts":"_astro/home-visit.astro_astro_type_script_index_0_lang.CpqzEMls.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/contact.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{typeof lucide<\"u\"&&lucide.createIcons()});"],["/Users/Zach/Github_Projects/fix-my-furnace/src/pages/landing_page_1.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"zip\"),n=document.getElementById(\"step1\"),d=document.getElementById(\"step2\"),l=document.getElementById(\"nextStep\"),t=document.getElementById(\"leadForm\");l.addEventListener(\"click\",()=>{const e=s.value.trim();if(!e||e.length!==5){alert(\"Please enter a valid ZIP code.\");return}n.classList.add(\"hidden\"),d.classList.remove(\"hidden\")});t.addEventListener(\"submit\",e=>{e.preventDefault(),alert(\"Thanks! A local tech will reach out shortly.\"),t.reset(),d.classList.add(\"hidden\"),n.classList.remove(\"hidden\")});"],["/Users/Zach/Github_Projects/fix-my-furnace/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"site-header\"),t=document.querySelector(\"section.bg-red-600\"),n=document.getElementById(\"main-content\");if(n&&(n.style.paddingTop=`${t.offsetHeight+e.offsetHeight}px`),e&&t){const o=()=>{const d=t.offsetHeight;e.style.top=`${d}px`};o(),window.addEventListener(\"resize\",o)}});"],["/Users/Zach/Github_Projects/fix-my-furnace/src/components/WhyChooseUs.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{lucide.createIcons()});"],["/Users/Zach/Github_Projects/fix-my-furnace/src/components/Header.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"mobileMenuBtn\"),n=document.getElementById(\"mobileMenu\");e?.addEventListener(\"click\",()=>n.classList.toggle(\"hidden\"))});"]],"assets":["/_astro/about.C8TP7OHP.css","/Fix_My_Furnace_Hero_Image.png","/Screen Shot 2025-10-28 at 3.55.43 PM.png","/duct_cleaning_detroit.png","/favicon.svg","/fixmyfurnaceimage1.png","/fixmyfurnacewoman.png","/furnace-closeup.png","/furnace-side-angle.png","/furnace-straight.png","/furnace_installation_michigan.png","/group_photo.png","/hvac_pros.png","/logo.svg","/maintenance.png","/pros.png","/repair.png","/robots.txt","/save_money-michigan-furnace-repair.png","/sitemap.xml","/tinified (8).zip","/_astro/furnace-diagnosis.astro_astro_type_script_index_0_lang.CpqzEMls.js","/_astro/home-visit.astro_astro_type_script_index_0_lang.CpqzEMls.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"e34oY5EUeGKw0p2jtFjEQXBlRo/SK4MqOvXrXn+z5eA=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
