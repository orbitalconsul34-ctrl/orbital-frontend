import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Scroll suave al cargar la página si hay un hash
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleHashClick = (e, id, targetPath) => {
    setIsOpen(false);
    if (location.pathname === targetPath) {
      e.preventDefault(); 
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `${targetPath}#${id}`);
      }
    }
  };

  const closeMenu = () => setIsOpen(false);

  // === FUNCIÓN PARA DETERMINAR EL COLOR DEL ENLACE ACTIVO ===
  const getLinkClass = (path, hash = '') => {
    const isActive = location.pathname === path && location.hash === hash;
    const baseClass = "text-[14.5px] font-raleway whitespace-nowrap transition-colors flex items-center";
    return `${baseClass} ${isActive ? "text-[#256b3c] font-bold" : "text-os-ink font-semibold hover:text-[#256b3c]"}`;
  };

  // Versión para el menú móvil
  const getMobileLinkClass = (path, hash = '') => {
    const isActive = location.pathname === path && location.hash === hash;
    const baseClass = "font-bold text-[17px] border-b border-black/5 pb-3 font-raleway transition-colors flex items-center";
    return `${baseClass} ${isActive ? "text-[#256b3c]" : "text-os-ink"}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#F9F6F0]/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-2.5">
        
        {/* === VERSIÓN ESCRITORIO === */}
        {/* grid-cols-[1fr_auto_1fr] asegura que el logo (auto) siempre esté 100% en el centro de la pantalla */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          
          {/* Lado Izquierdo (Agrupado hacia el centro con justify-end) */}
          <div className="flex gap-5 xl:gap-8 items-center justify-end pr-6 xl:pr-10">
            <Link to="/" onClick={() => window.scrollTo(0,0)} className={getLinkClass('/', '')}>
              Inicio
            </Link>
            <Link to="/nosotros" className={getLinkClass('/nosotros', '')}>
              Nosotros
            </Link>
            <Link to="/equipo" className={getLinkClass('/equipo', '')}>
              Equipo
            </Link>
            <Link to="/noticias" className={getLinkClass('/noticias', '')}>
              Noticias
            </Link>
          </div>
          
          {/* Logo Central (Inamovible en el medio) */}
          <div className="flex justify-center shrink-0">
            <Link to="/" onClick={() => window.scrollTo(0,0)}>
              <img src="/logo.png" alt="Logo Orbital Salud" className="h-[64px] w-auto object-contain shrink-0" />
            </Link>
          </div>

          {/* Lado Derecho (Agrupado hacia el centro con justify-start) */}
          <div className="flex gap-5 xl:gap-7 items-center justify-start pl-6 xl:pl-10">
            <Link to="/productos" className={getLinkClass('/productos', '')}>
              Tienda
            </Link>
            <Link to="/contacto" className={getLinkClass('/contacto', '')}>
              Contacto
            </Link>
            
            {/* PORTAL */}
            <Link to="/login" className="flex items-center text-[14.5px] font-raleway whitespace-nowrap transition-colors text-[#256b3c] font-bold hover:text-[#1e542f]">
              <svg className="w-[18px] h-[18px] mr-1.5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Portal
            </Link>
            
            {/* Botón de Reserva */}
            <Link to="/reservar-cita" className="bg-[#256b3c] hover:bg-[#1e542f] text-white px-6 py-[11px] rounded-full text-[14px] font-bold transition-all shadow-md hover:shadow-lg font-raleway whitespace-nowrap shrink-0 ml-1">
              Agendar evaluación
            </Link>
          </div>
        </div>

        {/* === VERSIÓN MÓVIL === */}
        <div className="flex lg:hidden justify-between items-center">
          <Link to="/" onClick={() => window.scrollTo(0,0)}>
            <img src="/logo.png" alt="Logo Orbital Salud" className="h-[52px] object-contain shrink-0" />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#1e3325] p-2 focus:outline-none shrink-0" aria-label="Abrir menú">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* === MENÚ DESPLEGABLE MÓVIL === */}
        {isOpen && (
          <div className="lg:hidden flex flex-col gap-4 pt-4 pb-4 border-t border-black/5 mt-3 animate-fadeIn">
            <Link to="/" onClick={() => { closeMenu(); window.scrollTo(0,0); }} className={getMobileLinkClass('/', '')}>Inicio</Link>
            
            {/* CORRECCIÓN: Actualizado a /nosotros en la versión móvil */}
            <Link to="/nosotros" onClick={closeMenu} className={getMobileLinkClass('/nosotros', '')}>Nosotros</Link>
            
            <Link to="/equipo" onClick={closeMenu} className={getMobileLinkClass('/equipo', '')}>Equipo</Link>
            <Link to="/noticias" onClick={closeMenu} className={getMobileLinkClass('/noticias', '')}>Noticias</Link>
            <Link to="/productos" onClick={closeMenu} className={getMobileLinkClass('/productos', '')}>Tienda</Link>
            <Link to="/contacto" onClick={closeMenu} className={getMobileLinkClass('/contacto', '')}>Contacto</Link>
            
            {/* PORTAL MÓVIL */}
            <Link to="/login" onClick={closeMenu} className="font-bold text-[17px] border-b border-black/5 pb-3 font-raleway transition-colors flex items-center text-[#256b3c]">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Portal
            </Link>
            
            {/* Botón de Reserva Móvil */}
            <Link to="/reservar-cita" onClick={closeMenu} className="bg-[#256b3c] text-center text-white px-6 py-3.5 rounded-full text-[16px] font-bold shadow-md mt-4 font-raleway block w-full">
              Agendar evaluación
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;