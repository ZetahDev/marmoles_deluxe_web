// Función para manejar transiciones de página sin forzar recarga
export function handleAuthNavigation(isAuthenticated: boolean) {
  const currentPath = window.location.pathname;
  const isAdminRoute = currentPath.startsWith('/admin');

  // Si no está autenticado y está en una ruta admin que no es /admin
  if (!isAuthenticated && isAdminRoute && currentPath !== '/admin') {
    history.pushState({}, '', '/admin');
    // Disparar evento para que Astro actualice la vista
    document.dispatchEvent(new CustomEvent('astro:page-load'));
  } else if (isAuthenticated && currentPath === '/admin') {
    // Si está autenticado y está en /admin, actualizar la vista
    document.dispatchEvent(new CustomEvent('astro:page-load'));
  }
}