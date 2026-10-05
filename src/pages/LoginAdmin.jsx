import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// === CONFIGURACIÓN DE LA RUTA API ===
// Si usas Vite, se accede con import.meta.env.
// Si no existe la variable, usa localhost por defecto para que no se rompa en local.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; 
// ------------------------------------

export default function LoginAdmin() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // === REEMPLAZO DE LA RUTA AQUÍ ===
      // Usamos comillas invertidas (backticks) `` para interpolar la variable
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      // ==================================

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        
        // --- AQUÍ ESTÁ EL CAMBIO ---
        // Ahora redirige al panel maestro en lugar del panel suelto
        navigate('/admin/dashboard'); 
        // ---------------------------
        
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      console.error('Error detallado:', err);
      setError('Error de conexión con el servidor. Asegúrate de que el backend esté encendido.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2EFE6] font-raleway">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          {/* Aquí podrías poner el logo de Orbital Salud */}
          <div className="w-16 h-16 bg-[#2E4B34] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            OS
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-[#1a2e1f] mb-2">Bienvenido</h2>
        <p className="text-center text-gray-600 mb-8">Ingresa tus credenciales de administrador</p>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm border border-red-200 flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[#1a2e1f] text-sm font-semibold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@orbitalsalud.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a68a61] focus:border-[#a68a61] transition"
              required 
            />
          </div>
          <div>
            <label className="block text-[#1a2e1f] text-sm font-semibold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a68a61] focus:border-[#a68a61] transition"
              required 
            />
          </div>
          
          <div className="pt-2">
            <button type="submit" className="w-full bg-[#2E4B34] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1f3323] transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg">
              Ingresar al Panel
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          Orbital Salud &copy; 2024 - Panel de Control
        </div>
      </div>
    </div>
  );
}