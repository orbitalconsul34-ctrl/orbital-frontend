import React, { useState, useEffect } from 'react';

const Planes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Array de planes actualizado: Se añadieron las consultas individuales y se movió el recomendado.
  const planes = [
    {
      badge: "",
      tag: "PAQUETE DE EVALUACIÓN",
      title: "Evaluación Híbrida",
      subtitle: "1 presencial + 1 virtual",
      price: "S/ 249",
      vigencia: "Vigencia 2 meses",
      imageText: "Evaluación completa para un plan a tu medida.",
      features: [
        "Evaluación presencial con InBody + reevaluación desde casa",
        "Diagnóstico y plan de tratamiento personalizado",
        "Gráficos de progreso en app"
      ],
      img: "/evaluacion-hibrida.jpg",
      recommended: false
    },
    {
      badge: "★ RECOMENDADO",
      tag: "PAQUETE DE EVALUACIÓN",
      title: "Endocrinología + Nutrición",
      subtitle: "1 endocrino + 1 nutrición · presencial",
      price: "S/ 289",
      vigencia: "Vigencia 2 meses",
      imageText: "Especialistas trabajando juntos por tus resultados.",
      features: [
        "Evaluación metabólica (endocrinología) con InBody",
        "Plan alimentario detallado y personalizado (nutrición)",
        "Gráficos de progreso en app"
      ],
      img: "/endocrinologia-nutricion.jpg",
      recommended: true
    },
    {
      badge: "",
      tag: "PAQUETE DE EVALUACIÓN",
      title: "Evaluación Presencial",
      subtitle: "1 inicial + 1 reevaluación · presencial",
      price: "S/ 279",
      vigencia: "Vigencia 2 meses",
      imageText: "Tu consulta, con el tiempo y la atención que necesitas.",
      features: [
        "Ambas consultas en consultorio, con examen físico e InBody",
        "Seguimiento de resultados y ajustes",
        "Gráficos de progreso en app"
      ],
      img: "/evaluacion-presencial.jpg",
      recommended: false
    },
    {
      badge: "",
      tag: "PAQUETE DE SEGUIMIENTO",
      title: "Seguimiento Virtual",
      subtitle: "3 consultas virtuales",
      price: "S/ 270",
      vigencia: "Vigencia 6 meses",
      imageText: "Continúa tu tratamiento, cómodo desde casa.",
      features: [
        "Continúa tu tratamiento desde casa",
        "Monitoreo de tu progreso y ajustes del manejo"
      ],
      img: "/seguimiento-virtual.jpg",
      recommended: false
    },
    {
      badge: "",
      tag: "PAQUETE DE SEGUIMIENTO",
      title: "Seguimiento Presencial",
      subtitle: "3 consultas presenciales",
      price: "S/ 360",
      vigencia: "Vigencia 6 meses",
      imageText: "Tu control de cerca, en el consultorio.",
      features: [
        "Control en consultorio con evaluación de tu evolución",
        "Ajuste del manejo según tu progreso"
      ],
      img: "/seguimiento-presencial.jpg",
      recommended: false
    },
    {
      badge: "",
      tag: "CONSULTA INDIVIDUAL",
      title: "Consulta Virtual",
      subtitle: "1 consulta · virtual",
      price: "S/ 120",
      vigencia: "Reevaluación es aparte",
      imageText: "Diagnóstico y plan de tratamiento personalizado desde tu casa.",
      features: [
        "Historia clínica completa",
        "Solicitud de exámenes según cada caso",
        "Evaluación de resultados (si los tiene)",
        "Plan de tratamiento y medicación"
      ],
      img: "/consulta-virtual.jpg", // Debes subir esta imagen
      recommended: false
    },
    {
      badge: "",
      tag: "CONSULTA INDIVIDUAL",
      title: "Consulta Presencial",
      subtitle: "1 consulta · presencial",
      price: "S/ 150",
      vigencia: "Reevaluación es aparte",
      imageText: "Evaluación física completa en nuestro consultorio.",
      features: [
        "Historia clínica y examen físico completo (peso, talla, perímetros)",
        "Análisis de % grasa y masa muscular",
        "Solicitud de exámenes y plan de tratamiento"
      ],
      img: "/consulta-presencial.jpg", // Debes subir esta imagen
      recommended: false
    },
  ];

  // Para que el recomendado (índice 3) quede en el medio en PC (mostrando 3 a la vez),
  // el desktopStartIndex debe ser el índice del paquete recomendado menos 1.
  // En este caso: índice 3 (Recomendado) - 1 = 2.
  const [desktopStartIndex, setDesktopStartIndex] = useState(2); 

  // Auto-slide en celular cada 4.5 segundos
  useEffect(() => {
    if (isPaused) return;
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

    </section>
  );
};

export default Planes;