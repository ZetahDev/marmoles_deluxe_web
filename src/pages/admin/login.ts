import type { APIRoute } from 'astro';
import { API_URL } from '../../lib/config';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const username = form.get('username');
  const password = form.get('password');

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    return redirect('/admin?error=1');
  }

  const data = await res.json();
  cookies.set('auth-token', data.accessToken, {
    path: '/',
    httpOnly: false,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
  });

  return redirect('/admin');
}; 