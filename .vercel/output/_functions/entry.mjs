import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B8tNmBgG.mjs';
import { manifest } from './manifest_OfuE3_S0.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/contactanos.astro.mjs');
const _page2 = () => import('./pages/granitos-naturales.astro.mjs');
const _page3 = () => import('./pages/marmoles.astro.mjs');
const _page4 = () => import('./pages/nosotros.astro.mjs');
const _page5 = () => import('./pages/otros-servicios.astro.mjs');
const _page6 = () => import('./pages/piedra-sinterizada.astro.mjs');
const _page7 = () => import('./pages/quartzstone.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/contactanos.astro", _page1],
    ["src/pages/granitos-naturales.astro", _page2],
    ["src/pages/marmoles.astro", _page3],
    ["src/pages/nosotros.astro", _page4],
    ["src/pages/otros-servicios.astro", _page5],
    ["src/pages/piedra-sinterizada.astro", _page6],
    ["src/pages/quartzstone.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "1ec23e74-d8c1-4777-b38f-0ecc4e1ec842",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
