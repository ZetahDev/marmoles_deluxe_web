// Log the environment variables for debugging
console.log('Environment variables:', {
  'PUBLIC_API_URL': import.meta.env.PUBLIC_API_URL,
  'DEV': import.meta.env.DEV,
  'PROD': import.meta.env.PROD,
});

// Fallback a la URL de producción si la variable de entorno no está definida
// export const API_URL = import.meta.env.PUBLIC_API_URL || 'https://api.marmolesdeluxe.com';
export const API_URL = 'http://localhost:3000';
