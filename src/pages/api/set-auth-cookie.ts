import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { token } = await request.json();
  cookies.set('auth-token', token, {
    path: '/',
    httpOnly: false, // Cambia a true si solo quieres acceso desde el servidor
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 1 día
  });
  return redirect('/admin');
}; 