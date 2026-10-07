import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2E4B34] text-[#F1F2F3] font-raleway pt-20 relative overflow-hidden">
      
      {/* =========================================
          EFECTO DE FONDO "ORBITAL"
          ========================================= */}
      {/* Órbitas Izquierdas */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full border border-[#6B7C5A]/30 pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[350px] h-[350px] rounded-full border border-[#6B7C5A]/20 pointer-events-none"></div>
      
      {/* Órbitas Derechas */}
      <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] rounded-full border border-[#A3B18A]/10 pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full border border-[#256B3C]/40 pointer-events-none"></div>
      <div className="absolute bottom-[0%] right-[0%] w-[300px] h-[300px] rounded-full border border-[#A3B18A]/20 pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* === GRID PRINCIPAL (4 Columnas) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] gap-12 lg:gap-10 pb-14 border-b border-[#6B7C5A]/40">
          
          {/* Columna 1: Logo y Descripción */}
          <div className="flex flex-col items-start">
            <Link to="/" onClick={() => window.scrollTo(0,0)}>
              <img 
                src="/logo.png" 
                alt="Orbital Salud" 
                className="h-[48px] w-auto object-contain mb-6 brightness-0 invert opacity-90 transition-opacity hover:opacity-100" 
              />
            </Link>
            <p className="text-[#A3B18A] text-[14.5px] leading-relaxed max-w-[280px] font-raleway font-medium">
              Centro de metabolismo y obesidad.<br className="hidden lg:block" />
              Bajamos de peso tratando la causa metabólica y hormonal, no solo la balanza — para adultos y niños. 
            </p>
          </div>

          {/* Columna 2: Menú Principal */}
          <div>
            <h5 className="text-white font-raleway text-[16px] font-bold mb-6 tracking-widest uppercase">
              Menú Principal
            </h5>
            <ul className="flex flex-col gap-4 text-[14.5px] font-raleway font-medium">
              <li>
                <Link to="/" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/equipo" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Equipo
                </Link>
              </li>
              <li>
                <Link to="/noticias" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/productos" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legal y Ayuda */}
          <div>
            <h5 className="text-white font-raleway text-[16px] font-bold mb-6 tracking-widest uppercase">
              Atención al Paciente
            </h5>
            <ul className="flex flex-col gap-4 text-[14.5px] font-raleway font-medium">
              <li>
                <Link to="/contacto" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Contacto y FAQ
                </Link>
              </li>
              <li>
                <Link to="/politicas-citas" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Políticas de citas
                </Link>
              </li>
              <li>
                <Link to="/terminos-condiciones" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" onClick={() => window.scrollTo(0,0)} className="text-[#F1F2F3] hover:text-[#A3B18A] hover:translate-x-1.5 transition-all duration-300 inline-block">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h5 className="text-white font-raleway text-[16px] font-bold mb-6 tracking-widest uppercase">
              Contacto
            </h5>
            <ul className="flex flex-col gap-4 text-[14.5px] font-raleway text-[#F1F2F3]">
              
              <li className="flex items-start gap-3 group">
                <svg className="w-5 h-5 text-[#A3B18A] shrink-0 mt-0.5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="https://wa.me/51981009863" target="_blank" rel="noreferrer" className="font-medium hover:text-[#A3B18A] transition-colors">
                  WhatsApp: 981 009 863
                </a>
              </li>
              
              <li className="flex items-start gap-3 group">
                <svg className="w-5 h-5 text-[#A3B18A] shrink-0 mt-0.5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="font-medium leading-snug">Av. Brasil 2730, of. 1106<br/>Edif. Qualis, Pueblo Libre, Lima</span>
              </li>
              
              <li className="flex items-start gap-3 group">
                <svg className="w-5 h-5 text-[#A3B18A] shrink-0 mt-0.5 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="font-medium">Lun-Sáb 9:00 am - 8:00 pm</span>
              </li>
            
            </ul>
          </div>

        </div>

        {/* === COPYRIGHT Y REDES (Bottom) === */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 text-[13px] font-raleway">
          <p className="text-[#A3B18A] font-medium mb-4 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} Orbital Salud. Todos los derechos reservados.
          </p>
          
          {/* Enlaces de Redes en línea */}
          <div className="flex gap-4 items-center font-bold text-[#F1F2F3]">
            <a href="#" className="hover:text-[#A3B18A] transition-colors">Instagram</a>
            <span className="text-[#6B7C5A]">•</span>
            <a href="#" className="hover:text-[#A3B18A] transition-colors">TikTok</a>
            <span className="text-[#6B7C5A]">•</span>
            <a href="https://wa.me/51981009863" target="_blank" rel="noreferrer" className="hover:text-[#A3B18A] transition-colors">WhatsApp</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;