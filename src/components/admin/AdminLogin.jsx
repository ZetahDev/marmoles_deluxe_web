import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Contraseña simple para propósitos de demostración
  const ADMIN_PASSWORD = 'marmoles123';
  
  useEffect(() => {
    // Verificar si ya está autenticado en localStorage
    const authStatus = localStorage.getItem('marmolesAdmin');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('marmolesAdmin', 'authenticated');
      setIsAuthenticated(true);
      toast.success('Inicio de sesión exitoso');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('marmolesAdmin');
    setIsAuthenticated(false);
    toast.success('Sesión cerrada');
  };
  
  if (isAuthenticated) {
    return (
      <div className="flex justify-end mb-6">
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Acceso Administrador</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
} 