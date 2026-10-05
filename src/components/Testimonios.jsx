import React, { useState, useEffect } from 'react';

const Testimonios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      name: "Kelly Trigoso",
      initial: "K",
      bgColor: "bg-[#6b8e23]",
      time: "hace un mes",
      text: "Me gustó mucho la atención. Desde que llegas, el personal es muy amable y te hace sentir cómodo. Los médicos son muy profesionales y se toman el tiempo para escuchar y explicar todo con paciencia. He tenido una muy buena experiencia. Sin duda, es un centro de salud en el que confío y que recomendaría a familiares y amigos."
    },
    {
      name: "Silvia Wong",
      initial: "S",
      bgColor: "bg-[#b8860b]",
      time: "hace un mes",
      text: "Buscaba una Dra que pudiera ayudarme con mi problema de resistencia a la insulina, me recomendaron este centro y desde el inicio supieron entenderme, y guiarme con el tratamiento adecuado para mí. He notado cambios que no los veía en años. Sin duda lo recomendaría."
    },
    {
      name: "Valery Bedón Naveros",
      initial: "V",
      bgColor: "bg-[#4682b4]",
      time: "hace 3 horas",
      text: "La Dra. Angélica fue muy minuciosa y acertada, me aclaró todas las dudas y brindó indicaciones claras. Me sentí muy cómoda en la consulta y noté el interés en el seguimiento al tratamiento que me brindaron."
    },
    {
      name: "Rosa María Paredes",
      initial: "R",
      bgColor: "bg-[#cd853f]",
      time: "hace 2 semanas",
      text: "Excelente atención multidisciplinaria. Por fin encontré un lugar donde ven la causa raíz de mi problema hormonal y no solo recetan por encimita. El equipo es increíble."
    },
    {
      name: "Juan Carlos Miranda",
      initial: "J",
      bgColor: "bg-[#800080]",
      time: "hace 2 meses",
      text: "El estudio InBody es súper detallado y me ayudó a entender por qué no bajaba de peso a pesar de hacer dieta. La atención es A1, muy recomendado para quienes buscan resultados reales."
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const getVisibleReviewsDesktop = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviewsDesktop();

  return (
    <section className="w-full font-raleway bg-[rgb(248,249,250)] flex flex-col relative z-10 pb-20">
      
      {/* =========================================
          SVGs SUPERPUESTOS: ONDAS EXACTAS (INTACTAS)
          ========================================= */}
      <div className="w-full leading-none">
        <svg 
          viewBox="0 0 800 200" 
          preserveAspectRatio="none" 
          className="w-full h-[100px] md:h-[180px] block"
        >
          {/* 1. Relleno blanco superior que recorta el fondo y forma los montesitos */}
          <path 
            d="M0,100 C150,140 300,60 500,130 C650,170 750,100 800,118 L800,0 L0,0 Z" 
            fill="#ffffff"
          />

          {/* 2. Línea Verde Oscura */}
          <path 
            d="M-10,95 C140,145 310,55 510,125 C660,175 740,95 810,113" 
            fill="none" 
            stroke="#5c6e4e" 
            strokeWidth="10" 
            opacity="0.9"
          />
          
          {/* 3. Línea Verde Clara */}
          <path 
            d="M-10,120 C160,80 280,110 490,140 C630,155 770,80 810,90" 
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

      {/* =========================================
          CONTENIDO TESTIMONIOS
          ========================================= */}
      <div className="pt-8 md:pt-12 max-w-[1200px] mx-auto px-4 lg:px-8 w-full">
        
        {/* Cabecera */}
        <div className="text-center mb-12">
          <span className="font-raleway text-[#6B7C5A] font-bold text-[12px] md:text-[14px] tracking-[0.2em] uppercase mb-3 block">
            TESTIMONIOS
          </span>
          <h2 className="font-raleway text-[30px] md:text-[42px] text-[#1e3325] font-bold leading-tight mb-4">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="font-raleway text-[#6b7280] text-[14px] md:text-[16px] mb-10">
            Reseñas reales de pacientes en Google — con una valoración de 5.0<span className="text-[#facc15] ml-1 text-[18px]">★</span>.
          </p>

          {/* =========================================
              CONTENEDOR DEL VIDEO PRINCIPAL
              ========================================= */}
          <div className="w-full max-w-[800px] mx-auto bg-black rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.15)] relative aspect-video border-4 border-white">
            
            {/* Aquí puedes reemplazar el iframe con tu video real de YouTube, Vimeo o una etiqueta <video> */}
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/TU_VIDEO_AQUI?rel=0&modestbranding=1" 
              title="Testimonio Paciente Orbital Salud"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            
            {/* Placeholder por si no has puesto el link del video aún. 
                (Puedes borrar este div cuando coloques tu video real en el iframe de arriba) */}
            <div className="absolute inset-0 bg-[#1e3325] flex flex-col items-center justify-center text-white pointer-events-none">
              <svg className="w-16 h-16 opacity-50 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-raleway text-sm opacity-70 tracking-widest uppercase">Espacio para Video Testimonio</span>
            </div>
            
          </div>
        </div>

        {/* Carrusel de reseñas escritas */}
        <div 
          className="mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* VISTA EN CELULAR (1 Tarjeta) */}
          <div className="block md:hidden mb-8">
            <div key={currentIndex} className="animate-fade-slide bg-white rounded-[16px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white flex flex-col justify-between min-h-[300px]">
              <div>
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${reviews[currentIndex].bgColor} text-white font-bold flex items-center justify-center text-[20px]`}>
                      {reviews[currentIndex].initial}
                    </div>
                    <div>
                      <h4 className="font-raleway font-bold text-[15px] text-[#1e3325] leading-none mb-1">
                        {reviews[currentIndex].name}
                      </h4>
                      <span className="font-raleway text-[13px] text-[#8a9096]">{reviews[currentIndex].time}</span>
                    </div>
                  </div>
                  <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.23 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-3.18z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.19 6.58l4.09 3.18c.95-2.83 3.6-4.93 6.72-4.93z"/>
                  </svg>
                </div>
                
                <p className="font-raleway text-[#4b5563] text-[15px] leading-relaxed mb-5">
                  {reviews[currentIndex].text.length > 180 ? reviews[currentIndex].text.substring(0, 180) + '...' : reviews[currentIndex].text}
                </p>
                
                <div className="flex text-[#facc15] text-[18px] tracking-widest">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>

          {/* VISTA EN PC (3 Tarjetas) */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {visibleReviews.map((review, idx) => (
              <div 
                key={currentIndex + idx} 
                className="animate-fade-slide bg-white rounded-[16px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              >
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${review.bgColor} text-white font-bold flex items-center justify-center text-[20px]`}>
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="font-raleway font-bold text-[16px] text-[#1e3325] leading-none mb-1.5">
                          {review.name}
                        </h4>
                        <span className="font-raleway text-[13px] text-[#8a9096]">{review.time}</span>
                      </div>
                    </div>
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.32 7.23 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-3.18z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.68 1.19 6.58l4.09 3.18c.95-2.83 3.6-4.93 6.72-4.93z"/>
                    </svg>
                  </div>
                  
                  <p className="font-raleway text-[#4b5563] text-[15px] leading-relaxed mb-6">
                    {review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text}
                  </p>
                  
                  <div className="flex text-[#facc15] text-[18px] tracking-widest mt-auto">
                    ★★★★★
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* =========================================
              CONTROLES: FLECHAS Y PUNTOS
              ========================================= */}
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-10">
            <button 
              onClick={handlePrev} 
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-[#6B7C5A] hover:text-white hover:border-[#6B7C5A] transition-colors shadow-sm focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <div className="flex gap-2.5 mx-2">
              {reviews.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-[10px] w-[10px] rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-[#6B7C5A] scale-110' : 'bg-[#d1d5db] hover:bg-[#9ca3af]'}`}
                  aria-label={`Ir al testimonio ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext} 
              className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-[#6B7C5A] hover:text-white hover:border-[#6B7C5A] transition-colors shadow-sm focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonios;