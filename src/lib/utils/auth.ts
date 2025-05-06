export function getTokenFromRequest(request: Request): string | null {
  const authCookie = request.headers.get('cookie')?.split(';')
    .find(cookie => cookie.trim().startsWith('auth-token='));

  if (!authCookie) {
    return null;
  }

  return authCookie.split('=')[1];
}