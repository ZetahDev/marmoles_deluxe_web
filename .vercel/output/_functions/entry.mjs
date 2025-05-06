import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CMh6YjSP.mjs';
import { manifest } from './manifest_ZElq2Gzs.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/login.astro.mjs');
const _page2 = () => import('./pages/admin/materiales.astro.mjs');
const _page3 = () => import('./pages/admin/testimonios.astro.mjs');
const _page4 = () => import('./pages/admin.astro.mjs');
const _page5 = () => import('./pages/api/set-auth-cookie.astro.mjs');
const _page6 = () => import('./pages/contactanos.astro.mjs');
const _page7 = () => import('./pages/granitos-naturales.astro.mjs');
const _page8 = () => import('./pages/marmoles.astro.mjs');
const _page9 = () => import('./pages/nosotros.astro.mjs');
const _page10 = () => import('./pages/otros-servicios.astro.mjs');
const _page11 = () => import('./pages/piedra-sinterizada.astro.mjs');
const _page12 = () => import('./pages/quartzstone.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/login.ts", _page1],
    ["src/pages/admin/materiales.astro", _page2],
    ["src/pages/admin/testimonios.astro", _page3],
    ["src/pages/admin/index.astro", _page4],
    ["src/pages/api/set-auth-cookie.ts", _page5],
    ["src/pages/contactanos.astro", _page6],
    ["src/pages/granitos-naturales.astro", _page7],
    ["src/pages/marmoles.astro", _page8],
    ["src/pages/nosotros.astro", _page9],
    ["src/pages/otros-servicios.astro", _page10],
    ["src/pages/piedra-sinterizada.astro", _page11],
    ["src/pages/quartzstone.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "89debd63-3ee1-4b7b-b526-5d9b4c1cb446",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
