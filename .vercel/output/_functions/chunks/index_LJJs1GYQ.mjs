import { c as createAstro, a as createComponent, e as renderComponent, g as renderScript, f as renderTemplate } from './astro/server_Cx8UOM8M.mjs';
import 'kleur/colors';

const $$Astro = createAstro("https://marmolesdeluxe.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/57313/Desktop/marmoles_deluxe_web/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

export { $$Index as $ };
