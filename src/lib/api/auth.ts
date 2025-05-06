import type { AuthResponse, LoginCredentials } from '@/types/auth';
import { API_URL } from '../config';

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  console.log('Login function called with credentials:', { username: credentials.username });
  console.log('API URL:', API_URL);
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    if (!response.ok) {
      throw new AuthError(
        data.message || 'Error en el inicio de sesión',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    console.error('Error in login function:', error);
    if (error instanceof AuthError) {
      throw error;
    }

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new AuthError(
        'No se pudo conectar con el servidor. Por favor, verifica tu conexión.',
        0
      );
    }

    throw new AuthError(
      'Error inesperado durante el inicio de sesión',
      500,
      error
    );
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AuthError(
        'Error al cerrar sesión',
        response.status
      );
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    throw new AuthError(
      'Error inesperado al cerrar sesión',
      500,
      error
    );
  }
};

export const validateToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/auth/validate`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};