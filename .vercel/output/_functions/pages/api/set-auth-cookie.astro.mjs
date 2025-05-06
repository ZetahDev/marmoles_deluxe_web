export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies, redirect }) => {
  const { token } = await request.json();
  cookies.set("auth-token", token, {
    path: "/",
    httpOnly: false,
    // Cambia a true si solo quieres acceso desde el servidor
    sameSite: "strict",
    maxAge: 60 * 60 * 24
    // 1 día
  });
  return redirect("/admin");
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
