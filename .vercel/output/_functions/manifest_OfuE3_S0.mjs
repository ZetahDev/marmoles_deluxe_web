import 'kleur/colors';
import { f as decodeKey } from './chunks/astro/server_PWDZLNn0.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CaE2bD4o.mjs';
import 'es-module-lexer';

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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/","cacheDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/.astro/","outDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/dist/","srcDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/src/","publicDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/public/","buildClientDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/dist/client/","buildServerDir":"file:///C:/Users/57313/Desktop/marmoles_deluxe_web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"},{"type":"inline","content":"iframe[data-astro-cid-l27khc52]{border-radius:.25rem}\n"}],"routeData":{"route":"/contactanos","isIndex":false,"type":"page","pattern":"^\\/contactanos\\/?$","segments":[[{"content":"contactanos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contactanos.astro","pathname":"/contactanos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/granitos-naturales","isIndex":false,"type":"page","pattern":"^\\/granitos-naturales\\/?$","segments":[[{"content":"granitos-naturales","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/granitos-naturales.astro","pathname":"/granitos-naturales","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/marmoles","isIndex":false,"type":"page","pattern":"^\\/marmoles\\/?$","segments":[[{"content":"marmoles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/marmoles.astro","pathname":"/marmoles","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"},{"type":"inline","content":"@media (max-width: 640px){.container[data-astro-cid-noeej2nj]{padding-left:1rem;padding-right:1rem}}\n"}],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/otros-servicios","isIndex":false,"type":"page","pattern":"^\\/otros-servicios\\/?$","segments":[[{"content":"otros-servicios","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/otros-servicios.astro","pathname":"/otros-servicios","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/piedra-sinterizada","isIndex":false,"type":"page","pattern":"^\\/piedra-sinterizada\\/?$","segments":[[{"content":"piedra-sinterizada","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/piedra-sinterizada.astro","pathname":"/piedra-sinterizada","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/quartzstone","isIndex":false,"type":"page","pattern":"^\\/quartzstone\\/?$","segments":[[{"content":"quartzstone","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/quartzstone.astro","pathname":"/quartzstone","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/assets/contactanos.COp0tVQ1.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://marmolesdeluxe.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/contactanos.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/granitos-naturales.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/marmoles.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/otros-servicios.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/piedra-sinterizada.astro",{"propagation":"none","containsHead":true}],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/quartzstone.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/contactanos@_@astro":"pages/contactanos.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/otros-servicios@_@astro":"pages/otros-servicios.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/granitos-naturales@_@astro":"pages/granitos-naturales.astro.mjs","\u0000@astro-page:src/pages/marmoles@_@astro":"pages/marmoles.astro.mjs","\u0000@astro-page:src/pages/piedra-sinterizada@_@astro":"pages/piedra-sinterizada.astro.mjs","\u0000@astro-page:src/pages/quartzstone@_@astro":"pages/quartzstone.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_GxBMdixX.mjs","\u0000@astrojs-manifest":"manifest_OfuE3_S0.mjs","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/PageLoader.tsx":"_astro/PageLoader.CvKGx_F6.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ProductCard.tsx":"_astro/ProductCard.CDkbRF-Z.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/CarouselWrapper":"_astro/CarouselWrapper.oD_ir61B.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/TestimonialCarousel":"_astro/TestimonialCarousel.p3xg6pov.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/ContactForm":"_astro/ContactForm.B_YGuPTc.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/WhatsAppButton":"_astro/WhatsAppButton.CYkqxL8K.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/components/MobileMenu":"_astro/MobileMenu.BDvwkvh3.js","@astrojs/react/client.js":"_astro/client.KJlOPP84.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/granitos-naturales.astro?astro&type=script&index=0&lang.ts":"_astro/granitos-naturales.astro_astro_type_script_index_0_lang.DPZgiZe6.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/piedra-sinterizada.astro?astro&type=script&index=0&lang.ts":"_astro/piedra-sinterizada.astro_astro_type_script_index_0_lang.DPZgiZe6.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/quartzstone.astro?astro&type=script&index=0&lang.ts":"_astro/quartzstone.astro_astro_type_script_index_0_lang.DPZgiZe6.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/pages/marmoles.astro?astro&type=script&index=0&lang.ts":"_astro/marmoles.astro_astro_type_script_index_0_lang.DPZgiZe6.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.XPElFBUw.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.D3Nh-HSP.js","C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts":"_astro/Layout.astro_astro_type_script_index_2_lang.4ifv5yub.js","C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CUqFY3xr.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){\"requestIdleCallback\"in window&&requestIdleCallback(()=>{[\"/logos/Altea.png\",\"/logos/silestone.png\"].forEach(e=>{const o=new Image;o.src=e})})});"],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"astro:before-navigation\",n=>{(document.body.classList.contains(\"uploading\")||document.body.classList.contains(\"saving\"))&&(confirm(\"Hay cambios pendientes. ¿Deseas abandonar la página?\")||n.preventDefault())});window.addEventListener(\"auth-change\",n=>{const{isAuthenticated:a}=n.detail,t=window.location.pathname,e=t.startsWith(\"/admin\");!a&&e&&t!==\"/admin\"&&(history.pushState({},\"\",\"/admin\"),window.dispatchEvent(new PopStateEvent(\"popstate\")))});"],["C:/Users/57313/Desktop/marmoles_deluxe_web/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts","window.dataLayer=window.dataLayer||[];function a(){dataLayer.push(arguments)}a(\"js\",new Date);a(\"config\",\"G-NXQ0SL5DBV\");"],["C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var o=\"@vercel/speed-insights\",u=\"1.2.0\",f=()=>{window.si||(window.si=function(...r){(window.siq=window.siq||[]).push(r)})};function l(){return typeof window<\"u\"}function h(){try{const e=\"production\"}catch{}return\"production\"}function d(){return h()===\"development\"}function v(e,r){if(!e||!r)return e;let n=e;try{const t=Object.entries(r);for(const[s,i]of t)if(!Array.isArray(i)){const a=c(i);a.test(n)&&(n=n.replace(a,`/[${s}]`))}for(const[s,i]of t)if(Array.isArray(i)){const a=c(i.join(\"/\"));a.test(n)&&(n=n.replace(a,`/[...${s}]`))}return n}catch{return e}}function c(e){return new RegExp(`/${g(e)}(?=[/?#]|$)`)}function g(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}function m(e){return e.scriptSrc?e.scriptSrc:d()?\"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js\":e.dsn?\"https://va.vercel-scripts.com/v1/speed-insights/script.js\":e.basePath?`${e.basePath}/speed-insights/script.js`:\"/_vercel/speed-insights/script.js\"}function w(e={}){var r;if(!l()||e.route===null)return null;f();const n=m(e);if(document.head.querySelector(`script[src*=\"${n}\"]`))return null;e.beforeSend&&((r=window.si)==null||r.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=n,t.defer=!0,t.dataset.sdkn=o+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=u,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/speed-insights/vitals`),e.dsn&&(t.dataset.dsn=e.dsn),d()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${n}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:s=>{t.dataset.route=s??void 0}}}function p(){try{return}catch{}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const r=JSON.parse(this.dataset.props??\"{}\"),n=JSON.parse(this.dataset.params??\"{}\"),t=v(this.dataset.pathname??\"\",n);w({route:t,...r,framework:\"astro\",basePath:p(),beforeSend:window.speedInsightsBeforeSend})}catch(r){throw new Error(`Failed to parse SpeedInsights properties: ${r}`)}}});"]],"assets":["/assets/contactanos.COp0tVQ1.css","/404.html","/CNAME","/favicon.ico","/index.html","/images/logo.png","/logos/Altea.png","/logos/catemar.png","/logos/dekton.png","/logos/neolith.webp","/logos/Sensa.webp","/logos/silestone.png","/_astro/carousel.B8InbKvp.js","/_astro/CarouselWrapper.oD_ir61B.js","/_astro/client.KJlOPP84.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.BZs-2RF_.js","/_astro/ContactForm.B_YGuPTc.js","/_astro/granitos-naturales.astro_astro_type_script_index_0_lang.DPZgiZe6.js","/_astro/index.6otl1p8d.js","/_astro/index.C4PlTqAK.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/marmoles.astro_astro_type_script_index_0_lang.DPZgiZe6.js","/_astro/MobileMenu.BDvwkvh3.js","/_astro/modal.BK1Sf2Fz.js","/_astro/PageLoader.CvKGx_F6.js","/_astro/piedra-sinterizada.astro_astro_type_script_index_0_lang.DPZgiZe6.js","/_astro/ProductCard.CDkbRF-Z.js","/_astro/quartzstone.astro_astro_type_script_index_0_lang.DPZgiZe6.js","/_astro/TestimonialCarousel.p3xg6pov.js","/_astro/WhatsAppButton.CYkqxL8K.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"iTpcSC9ud0wEbhC/hPaQ+Dn7E4dqxndaUrGuizi6I7U="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
