import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelProductos from './PanelProductos';
import PanelPaquetes from './PanelPaquetes';
import PanelPublicaciones from './PanelPublicaciones'; 
import PanelDoctores from './PanelDoctores';

export default function AdminDashboard() {
  const [seccionActiva, setSeccionActiva] = useState('productos');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderizarSeccion = () => {
    switch (seccionActiva) {
      case 'productos': return <PanelProductos />;
      case 'paquetes': return <PanelPaquetes />;
      case 'publicaciones': return <PanelPublicaciones />; 
      case 'doctores': return <PanelDoctores />;
      default: return <PanelProductos />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans pb-[70px] md:pb-0">
      
      {/* =========================================
          MENÚ LATERAL (SOLO VISIBLE EN PC / TABLET)
          ========================================= */}
      <aside className="hidden md:flex w-64 bg-[#2E4B34] text-white flex-col shadow-xl z-20">
        <div className="p-6 text-center border-b border-[#3e6345]">
          <h1 className="text-2xl font-serif font-bold tracking-wider">Orbital Admin</h1>
          <p className="text-xs text-[#A3B18A] mt-1">Panel de Control</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setSeccionActiva('productos')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${seccionActiva === 'productos' ? 'bg-[#A3B18A] text-[#2E4B34]' : 'hover:bg-[#3e6345]'}`}
          >
            💊 Productos
          </button>
          
          <button 
            onClick={() => setSeccionActiva('paquetes')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${seccionActiva === 'paquetes' ? 'bg-[#A3B18A] text-[#2E4B34]' : 'hover:bg-[#3e6345]'}`}
          >
            📋 Planes / Paquetes
          </button>

          <button 
            onClick={() => setSeccionActiva('publicaciones')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${seccionActiva === 'publicaciones' ? 'bg-[#A3B18A] text-[#2E4B34]' : 'hover:bg-[#3e6345]'}`}
          >
            📝 Blog y Videos
          </button>

          <button 
            onClick={() => setSeccionActiva('doctores')}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${seccionActiva === 'doctores' ? 'bg-[#A3B18A] text-[#2E4B34]' : 'hover:bg-[#3e6345] text-white'}`}
          >
            👨‍⚕️ Doctores
          </button>
        </nav>

        <div className="p-4 border-t border-[#3e6345]">
          <button onClick={cerrarSesion} className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* =========================================
          CONTENIDO CENTRAL DINÁMICO
          ========================================= */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white shadow-sm p-4 md:p-6 flex justify-between items-center z-10 sticky top-0">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 capitalize">
              Gestión de {seccionActiva}
            </h2>
            <span className="text-xs md:text-sm text-gray-500">Bienvenido, Administrador</span>
          </div>
          
          {/* Botón de cerrar sesión en la cabecera (Solo para celulares) */}
          <button onClick={cerrarSesion} className="md:hidden bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-200">
            Salir
          </button>
        </header>

        {/* El padding-bottom extra en celular evita que la barra inferior tape el contenido */}
        <div className="p-4 md:p-8 pb-24 md:pb-8">
          {renderizarSeccion()}
        </div>
      </main>

      {/* =========================================
          BOTTOM BAR (SOLO VISIBLE EN CELULAR)
          ========================================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[60] flex justify-around items-center px-1 py-2 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        
        {/* Productos */}
        <button onClick={() => setSeccionActiva('productos')} className={`flex flex-col items-center gap-1 w-1/4 transition-colors ${seccionActiva === 'productos' ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <span className="text-xl mb-0.5">💊</span>
          <span className={`text-[10px] ${seccionActiva === 'productos' ? 'font-bold' : 'font-medium'}`}>Productos</span>
        </button>

        {/* Paquetes */}
        <button onClick={() => setSeccionActiva('paquetes')} className={`flex flex-col items-center gap-1 w-1/4 transition-colors ${seccionActiva === 'paquetes' ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <span className="text-xl mb-0.5">📋</span>
          <span className={`text-[10px] ${seccionActiva === 'paquetes' ? 'font-bold' : 'font-medium'}`}>Paquetes</span>
        </button>

        {/* Publicaciones */}
        <button onClick={() => setSeccionActiva('publicaciones')} className={`flex flex-col items-center gap-1 w-1/4 transition-colors ${seccionActiva === 'publicaciones' ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <span className="text-xl mb-0.5">📝</span>
          <span className={`text-[10px] ${seccionActiva === 'publicaciones' ? 'font-bold' : 'font-medium'}`}>Blog</span>
        </button>

        {/* Doctores */}
        <button onClick={() => setSeccionActiva('doctores')} className={`flex flex-col items-center gap-1 w-1/4 transition-colors ${seccionActiva === 'doctores' ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <span className="text-xl mb-0.5">👨‍⚕️</span>
          <span className={`text-[10px] ${seccionActiva === 'doctores' ? 'font-bold' : 'font-medium'}`}>Doctores</span>
        </button>

      </div>

    </div>
  );
}