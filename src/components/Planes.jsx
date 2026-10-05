import React, { useState, useEffect } from 'react';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

const Planes = () => {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [desktopStartIndex, setDesktopStartIndex] = useState(0);

  // === CARGA DINÁMICA DESDE EL BACKEND ===
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/paquetes`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Filtramos solo los activos y adaptamos los nombres de los campos de la BD al frontend
          const paquetesActivos = data
            .filter(p => p.estado === 'ACTIVO')
            .map(p => ({
              id: p.id,
              badge: p.destacado ? "★ RECOMENDADO" : "",
              tag: p.categoria || "PAQUETE",
              title: p.titulo,
              subtitle: p.subtitulo,
              price: `S/ ${Number(p.precio).toFixed(0)}`, // Formatea el precio a entero (ej: S/ 250)
              vigencia: p.vigencia,
              imageText: p.encabezado || "Tu consulta, con la atención que necesitas.",
              features: p.beneficios ? p.beneficios.split('\n').filter(b => b.trim() !== '') : [],
              img: p.url_imagen || "https://via.placeholder.com/400x500/FFFFFF/2E4B34?text=Sin+Imagen",
              recommended: p.destacado === 1 || p.destacado === true
            }));

          setPlanes(paquetesActivos);

          // Lógica para que el recomendado (si existe) quede al medio en PC (mostrando 3)
          const indexRecomendado = paquetesActivos.findIndex(p => p.recommended);
          if (indexRecomendado !== -1 && paquetesActivos.length >= 3) {
            // Ponemos el recomendado en la posición del medio restando 1 a su índice original
            setDesktopStartIndex(Math.max(0, indexRecomendado - 1));
          } else {
            setDesktopStartIndex(0);
          }

        } else {
          setError('Error al cargar los planes');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
        setError('Error de conexión con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanes();
  }, []);

  // Auto-slide en celular cada 4.5 segundos
  useEffect(() => {
    if (isPaused || planes.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % planes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, planes.length]);

  // Funciones de navegación para móvil (1 a la vez)
  const handlePrevMobile = () => {
    setCurrentIndex((prev) => (prev === 0 ? planes.length - 1 : prev - 1));
  };
  const handleNextMobile = () => {
    setCurrentIndex((prev) => (prev + 1) % planes.length);
  };

  // Funciones de navegación para PC (3 a la vez)
  const handlePrevDesktop = () => {
    setDesktopStartIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNextDesktop = () => {
    setDesktopStartIndex((prev) => Math.min(planes.length - 3, prev + 1));
  };

  // === FUNCIÓN PARA GENERAR LINK DE WHATSAPP DINÁMICO ===
  const getWhatsAppLink = (plan) => {
    const numeroWhatsApp = "51981009863"; // Tu número
    const mensaje = `Hola, vengo desde la página web de Orbital Salud. Me gustaría agendar la siguiente opción:\n\n*${plan.title}*\n${plan.subtitle}\nPrecio: ${plan.price}\n\n¿Podrían brindarme información sobre la disponibilidad, por favor?`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  };

  if (loading) {
    return (
      <section id="planes" className="w-full pt-24 pb-20 bg-[#F9F6F0] flex justify-center items-center min-h-[500px]">
        <div className="w-10 h-10 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
      </section>
    );
  }

  if (error || planes.length === 0) {
    return (
      <section id="planes" className="w-full pt-24 pb-20 bg-[#F9F6F0] flex flex-col justify-center items-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-[#1e3325] mb-2 font-raleway">Planes no disponibles</h2>
        <p className="text-[#6b7280] font-raleway">No se pudieron cargar los paquetes en este momento.</p>
      </section>
    );
  }

  return (
    <section id="planes" className="w-full font-raleway pt-24 pb-20 bg-[#F9F6F0] overflow-hidden relative z-10">
      
      {/* =========================================
          ONDA SUPERIOR (Plana y elegante)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[70px] block"
        >
          {/* Fondo blanco para conectar suavemente con la sección anterior */}
          <path d="M0,0 L1440,0 L1440,40 C1000,80 400,10 0,50 Z" fill="#ffffff" />
          {/* Línea Verde Oscura */}
          <path d="M0,50 C400,10 1000,80 1440,40" fill="none" stroke="#5c6e4e" strokeWidth="10" opacity="0.9" />
          {/* Línea Verde Clara */}
          <path d="M0,40 C450,80 950,20 1440,50" fill="none" stroke="#8b9a7b" strokeWidth="5" opacity="0.9" />
        </svg>
      </div>

      <style>
        {`
          @keyframes fadeInSlide {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-slide {
            animation: fadeInSlide 0.6s ease-in-out forwards;
          }
        `}
      </style>

      {/* Contenedor Principal */}
      <div className="relative z-10">
        {/* Cabecera */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center mb-16 pt-6">
          <span className="font-raleway text-[#8a9096] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 block">
            CONSULTAS Y PAQUETES
          </span>
          <h2 className="font-raleway text-[34px] md:text-[44px] text-[#1e3325] font-bold leading-tight mb-4">
            Precios claros para cada <br className="hidden md:block"/> momento de tu tratamiento
          </h2>
          <p className="font-raleway text-[#6b7280] text-[15px] md:text-[16px] max-w-xl mx-auto">
            Desde una consulta puntual hasta el acompañamiento completo — elige la opción que mejor se adapte a tus objetivos.
          </p>
        </div>

        <div 
          className="max-w-[1200px] mx-auto px-4 lg:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* =======================================
              VISTA EN CELULAR (1 tarjeta a la vez)
              ======================================= */}
          <div className="block md:hidden mb-8">
            <div key={currentIndex} className={`animate-fade-slide bg-white rounded-[32px] flex flex-col justify-between overflow-visible relative transition-all duration-300 mt-6 ${planes[currentIndex].recommended ? 'border-[3px] border-[#256b3c] shadow-[0_20px_40px_-15px_rgba(37,107,60,0.3)]' : 'border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.04)]'}`}>
              
              {/* Insignia Recomendado flotando arriba */}
              {planes[currentIndex].recommended && (
                <div className="absolute -top-4 right-6 bg-[#256b3c] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20 border-[3px] border-white">
                  {planes[currentIndex].badge}
                </div>
              )}

              {/* Imagen superior con más altura (220px) */}
              <div className="relative h-[220px] w-full overflow-hidden rounded-t-[28px]">
                <img 
                  src={planes[currentIndex].img} 
                  alt={planes[currentIndex].title} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent flex items-start p-5">
                  <p className="font-raleway text-white text-[14px] font-bold leading-relaxed drop-shadow-md">
                    {planes[currentIndex].imageText}
                  </p>
                </div>
              </div>

              {/* Contenido del Card */}
              <div className="p-7 flex flex-col justify-between">
                <div>
                  <span className="font-raleway text-[#8a9096] text-[10.5px] font-bold tracking-[0.15em] uppercase block mb-1.5">
                    {planes[currentIndex].tag}
                  </span>
                  <h3 className="font-raleway text-[22px] font-bold text-[#1e3325] leading-tight mb-1">
                    {planes[currentIndex].title}
                  </h3>
                  <p className="font-raleway text-[#256b3c] text-[13.5px] font-semibold mb-4">
                    {planes[currentIndex].subtitle}
                  </p>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-raleway text-[32px] font-bold text-[#1e3325]">
                      {planes[currentIndex].price}
                    </span>
                  </div>
                  <span className="font-raleway text-[#8a9096] text-[12px] block mb-6 pb-4 border-b border-gray-100">
                    {planes[currentIndex].vigencia}
                  </span>

                  <ul className="space-y-3 mb-8">
                    {planes[currentIndex].features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[13.5px] text-[#4b5563] leading-snug">
                        <span className="text-[#256b3c] font-bold text-[15px]">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <a 
                  href={getWhatsAppLink(planes[currentIndex])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-raleway w-full py-3.5 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${planes[currentIndex].recommended ? 'bg-[#256b3c] text-white shadow-md hover:bg-[#1a4a2a]' : 'border border-gray-300 text-[#1e3325] hover:bg-[#2E4B34] hover:text-white hover:border-[#2E4B34]'}`}
                >
                  Agendar este paquete →
                </a>
              </div>

            </div>

            {/* Navegación móvil */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button onClick={handlePrevMobile} className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-[#256b3c] hover:text-white transition-colors shadow-sm focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button onClick={handleNextMobile} className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-[#256b3c] hover:text-white transition-colors shadow-sm focus:outline-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* =======================================
              VISTA EN PC / TABLET (3 tarjetas)
              ======================================= */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-6 lg:gap-8 mb-10 pt-6">
              {planes.slice(desktopStartIndex, desktopStartIndex + 3).map((plan, idx) => (
                <div 
                  key={desktopStartIndex + idx} 
                  className={`animate-fade-slide bg-white rounded-[32px] flex flex-col justify-between overflow-visible relative transition-all duration-500 hover:-translate-y-2 ${plan.recommended ? 'border-[3px] border-[#256b3c] shadow-[0_25px_50px_-12px_rgba(37,107,60,0.25)] md:-translate-y-4 z-10' : 'border border-black/5 shadow-[0_15px_35px_rgba(0,0,0,0.04)] mt-2 hover:shadow-xl'}`}
                >
                  {/* Insignia Recomendado flotando arriba a un costado */}
                  {plan.recommended && (
                    <div className="absolute -top-4 right-6 bg-[#256b3c] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg z-20 border-[3px] border-white">
                      {plan.badge}
                    </div>
                  )}

                  {/* Imagen superior con más altura (220px) */}
                  <div className="relative h-[220px] w-full overflow-hidden rounded-t-[28px]">
                    <img 
                      src={plan.img} 
                      alt={plan.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent flex items-start p-5">
                      <p className="font-raleway text-white text-[14px] font-bold leading-relaxed drop-shadow-md">
                        {plan.imageText}
                      </p>
                    </div>
                  </div>

                  {/* Contenido del Card */}
                  <div className="p-7 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="font-raleway text-[#8a9096] text-[10.5px] font-bold tracking-[0.15em] uppercase block mb-1.5">
                        {plan.tag}
                      </span>
                      <h3 className="font-raleway text-[22px] font-bold text-[#1e3325] leading-tight mb-1">
                        {plan.title}
                      </h3>
                      <p className="font-raleway text-[#256b3c] text-[13.5px] font-semibold mb-4">
                        {plan.subtitle}
                      </p>

                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-raleway text-[32px] font-bold text-[#1e3325]">
                          {plan.price}
                        </span>
                      </div>
                      <span className="font-raleway text-[#8a9096] text-[12px] block mb-6 pb-4 border-b border-gray-100">
                        {plan.vigencia}
                      </span>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-[13.5px] text-[#4b5563] leading-snug">
                            <span className="text-[#256b3c] font-bold text-[15px]">✓</span> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href={getWhatsAppLink(plan)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-raleway w-full py-3.5 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-all ${plan.recommended ? 'bg-[#256b3c] text-white shadow-md hover:bg-[#1a4a2a]' : 'border border-gray-300 text-[#1e3325] hover:bg-[#2E4B34] hover:text-white hover:border-[#2E4B34]'}`}
                    >
                      Agendar este paquete →
                    </a>
                  </div>

                </div>
              ))}
            </div>

            {/* Navegación Desktop */}
            <div className="flex items-center justify-center gap-6 mb-12 mt-4 relative z-10">
              <button 
                onClick={handlePrevDesktop} 
                disabled={desktopStartIndex === 0}
                className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-[#256b3c] hover:text-white transition-colors shadow-sm focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              
              <button 
                onClick={handleNextDesktop} 
                disabled={desktopStartIndex >= planes.length - 3}
                className="w-12 h-12 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-[#256b3c] hover:text-white transition-colors shadow-sm focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          {/* Notas legales inferiores */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-[11px] md:text-[12px] text-[#8a9096] text-center border-t border-black/5 relative z-10 mb-8">
            <span className="flex items-center gap-1.5"><span className="text-[#256b3c]">⊙</span> La reevaluación es una consulta aparte</span>
            <span className="flex items-center gap-1.5"><span className="text-[#256b3c]">⊙</span> La vigencia inicia desde la primera consulta</span>
            <span className="flex items-center gap-1.5"><span className="text-[#256b3c]">⊙</span> No incluye medicamentos ni exámenes de laboratorio</span>
          </div>

        </div>
      </div>

      {/* =========================================
          ONDA INFERIOR (Volteada)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[70px] block -scale-y-100"
        >
          {/* Fondo blanco para conectar suavemente con la sección siguiente */}
          <path d="M0,0 L1440,0 L1440,40 C1000,80 400,10 0,50 Z" fill="#ffffff" />
          {/* Línea Verde Oscura */}
          <path d="M0,50 C400,10 1000,80 1440,40" fill="none" stroke="#5c6e4e" strokeWidth="10" opacity="0.9" />
          {/* Línea Verde Clara */}
          <path d="M0,40 C450,80 950,20 1440,50" fill="none" stroke="#8b9a7b" strokeWidth="5" opacity="0.9" />
        </svg>
      </div>

    </section>
  );
};

export default Planes;