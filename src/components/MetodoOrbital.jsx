import React, { useRef, useEffect } from 'react';

const pasosAtencion = [
  {
    paso: 1,
    titulo: "Evaluación inicial",
    descripcion: "Conversamos sobre tu historia, hábitos, estilo de vida y objetivos.",
    icono: "/icon-evaluacion.png",
    imagen: "/Evaluación inicial-imagen.jpg"
  },
  {
    paso: 2,
    titulo: "Laboratorio y bioimpedancia",
    descripcion: "Medimos lo que importa, no solo el peso. Incluye análisis de laboratorio y evaluación de composición corporal con InBody.",
    icono: "/icon-Laboratorio.png",
    imagen: "/imagne-laboratorio.jpg"
  },
  {
    paso: 3,
    titulo: "Revisión médica",
    descripcion: "El equipo analiza tus resultados para definir el diagnóstico y el mejor plan de tratamiento.",
    icono: "/icon-Revisión.png",
    imagen: "/Revisión médica-imagen.jpg"
  },
  {
    paso: 4,
    titulo: "Inicio del plan",
    descripcion: "Diseñamos un plan personalizado, con metas claras y realistas, que se adapta estrictamente a tu estilo de vida.",
    icono: "/icon-Inicio del plan.png",
    imagen: "/Inicio del plan-imagen.jpg"
  },
  {
    paso: 5,
    titulo: "Seguimiento",
    descripcion: "Controles periódicos y ajustes en equipo para asegurar tu progreso a largo plazo de manera completamente sostenible.",
    icono: "/icon-Seguimiento.png",
    imagen: "/Seguimiento-imagen.jpg"
  }
];

const ProcesoAtencion = () => {
  const carouselRef = useRef(null);

  // === LÓGICA PARA AUTO-SCROLL ===
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = window.innerWidth < 768 ? carouselRef.current.offsetWidth : carouselRef.current.offsetWidth / 3;
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // === CONTROLES MANUALES (FLECHAS) ===
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 768 ? carouselRef.current.offsetWidth : carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 768 ? carouselRef.current.offsetWidth : carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#F9F6F0] font-raleway relative z-10 py-16 md:py-20">
      
      {/* =========================================
          ONDA SUPERIOR (Con configuración gruesa)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[70px] block"
        >
          {/* Fondo blanco para conectar suavemente con la sección anterior */}
          <path 
            d="M0,0 L1440,0 L1440,40 C1000,80 400,10 0,50 Z" 
            fill="#ffffff"
          />
          {/* Línea Verde Oscura */}
          <path 
            d="M0,50 C400,10 1000,80 1440,40" 
            fill="none" 
            stroke="#5c6e4e" 
            strokeWidth="10" 
            opacity="0.9"
          />
          {/* Línea Verde Clara */}
          <path 
            d="M0,40 C450,80 950,20 1440,50" 
            fill="none" 
            stroke="#8b9a7b" 
            strokeWidth="5" 
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* === CABECERA === */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[#6b7280] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase block mb-4 font-raleway">
            EL MÉTODO ORBITAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-bold text-[#1e3325] leading-tight mb-6 font-raleway">
            Todo tu caso, coordinado <span className="text-[#256b3c] italic font-normal">en un <br className="hidden md:block"/>mismo lugar</span>
          </h2>
        </div>

        {/* === CONTENEDOR DEL CARRUSEL === */}
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto items-stretch gap-6 snap-x snap-mandatory hide-scrollbar pb-8 pt-2 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            
            {pasosAtencion.map((item) => (
              <div
                key={item.paso}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-center bg-white rounded-[32px] p-6 md:p-8 flex flex-col group border border-black/5 hover:border-[#256b3c]/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(37,107,60,0.25)] transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-default relative"
              >
                
                {/* 1. SECCIÓN SUPERIOR: Ícono + Título */}
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={item.icono}
                      alt={`Paso ${item.paso}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-[#1e3325] font-bold text-[19px] md:text-[21px] leading-tight font-raleway group-hover:text-[#256b3c] transition-colors duration-300">
                    {item.titulo}
                  </h3>
                </div>

                {/* 2. SECCIÓN MEDIA: Descripción */}
                <p className="text-[#6b7280] text-[14.5px] md:text-[15.5px] leading-relaxed font-raleway mb-8 flex-grow">
                  {item.descripcion}
                </p>

                {/* 3. SECCIÓN INFERIOR: Fotografía */}
                <div className="w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-[#e9e6df] relative">
                  <img
                    src={item.imagen}
                    alt={item.titulo}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/efe8d8/256b3c?text=' + encodeURIComponent(item.titulo);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* === ACENTO INFERIOR ANIMADO === */}
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#256b3c] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-[32px]"></div>
                
              </div>
            ))}

          </div>

          {/* === CONTROLES INFERIORES: FLECHAS Y BOTÓN === */}
          <div className="flex flex-col items-center gap-8 mt-6">
            
            {/* Flechas de Navegación */}
            <div className="flex gap-4">
              <button 
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1e3325] hover:bg-[#256b3c] hover:text-white hover:border-[#256b3c] hover:shadow-md transition-all focus:outline-none"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button 
                onClick={scrollRight}
                className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1e3325] hover:bg-[#256b3c] hover:text-white hover:border-[#256b3c] hover:shadow-md transition-all focus:outline-none"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>

            {/* BOTÓN WHATSAPP ACTUALIZADO */}
            <a 
              href="https://wa.me/51981009863?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita%20para%20iniciar%20mi%20tratamiento%20en%20Orbital%20Salud,%20por%20favor." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#256b3c] text-white px-8 py-3.5 rounded-full font-bold text-[14px] md:text-[15px] hover:bg-[#1a4a2a] transition-all shadow-[0_4px_14px_rgba(37,107,60,0.39)] font-raleway mb-12"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Agendar mi evaluación
            </a>

          </div>

        </div>

      </div>

      {/* =========================================
          ONDA INFERIOR (Con configuración gruesa y volteada)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[70px] block -scale-y-100"
        >
          {/* Fondo para conectar suavemente con la sección siguiente (blanco) */}
          <path 
            d="M0,0 L1440,0 L1440,40 C1000,80 400,10 0,50 Z" 
            fill="#ffffff"
          />
          {/* Línea Verde Oscura */}
          <path 
            d="M0,50 C400,10 1000,80 1440,40" 
            fill="none" 
            stroke="#5c6e4e" 
            strokeWidth="10" 
            opacity="0.9"
          />
          {/* Línea Verde Clara */}
          <path 
            d="M0,40 C450,80 950,20 1440,50" 
            fill="none" 
            stroke="#8b9a7b" 
            strokeWidth="5" 
            opacity="0.9"
          />
        </svg>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProcesoAtencion;