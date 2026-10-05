import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const EspecialidadesCarousel = () => {
  const carouselRef = useRef(null);

  const especialidades = [
    {
      id: 1,
      titulo: "Endocrinología",
      subtitulo: "ADULTOS Y ADOLESCENTES",
      descripcion: "El corazón de Orbital Salud. Diagnóstico y tratamiento de diabetes, tiroides, obesidad y desórdenes hormonales — siempre buscando la causa metabólica de fondo, no solo el síntoma.",
      tags: ["Diabetes", "Tiroides", "Obesidad", "Resistencia a la insulina"],
      icon: <img src="/endocrinologia.png" alt="Endocrinología" className="w-full h-full object-contain" />
    },
    {
      id: 2,
      titulo: "Endocrinología Pediátrica",
      subtitulo: "NIÑOS Y ADOLESCENTES",
      descripcion: "Cuidamos el crecimiento y el metabolismo desde temprano: talla baja, pubertad adelantada, obesidad infantil y diabetes en los más chicos, con un enfoque preventivo.",
      tags: ["Crecimiento", "Pubertad", "Obesidad infantil", "Diabetes"],
      icon: <img src="/endocrinologia-pediatrica.png" alt="Endocrinología Pediátrica" className="w-full h-full object-contain" />
    },
    {
      id: 3,
      titulo: "Nutrición",
      subtitulo: "CON EVALUACIÓN INBODY INCLUIDA",
      descripcion: "Planes de alimentación personalizados según tu composición corporal real, orientados a resultados sostenibles en el tiempo — nada de dietas extremas ni temporales.",
      tags: ["Plan personalizado", "InBody", "Seguimiento"],
      icon: <img src="/nutricion.png" alt="Nutrición" className="w-full h-full object-contain" />
    },
    {
      id: 4,
      titulo: "Dermatología",
      subtitulo: "PIEL Y HORMONAS",
      descripcion: "La piel refleja tu equilibrio hormonal. Tratamos acné, caída del cabello y manchas relacionadas con desórdenes metabólicos y endocrinos, no solo de forma estética.",
      tags: ["Acné hormonal", "Caída de cabello", "Manchas"],
      icon: <img src="/dermatologia.png" alt="Dermatología" className="w-full h-full object-contain" />
    },
    {
      id: 5,
      titulo: "Cardiología",
      subtitulo: "PREVENCIÓN CARDIOVASCULAR",
      descripcion: "Cuidamos tu corazón frente al riesgo que traen la diabetes, la obesidad y el síndrome metabólico, con evaluación y prevención pensadas a largo plazo.",
      tags: ["Presión arterial", "Colesterol", "Riesgo cardiovascular"],
      icon: <img src="/cardiologia.png" alt="Cardiología" className="w-full h-full object-contain" />
    },
    {
      id: 6,
      titulo: "Bioimpedancia InBody",
      subtitulo: "INCLUIDO EN TUS CONSULTAS",
      descripcion: "Análisis de grasa, músculo, agua y grasa visceral con precisión médica en menos de un minuto. Incluido sin costo en Endocrinología y Nutrición.",
      tags: ["% Grasa", "Masa muscular", "Grasa visceral"],
      icon: <img src="/bioimpedancia-inbody.png" alt="Bioimpedancia InBody" className="w-full h-full object-contain" />
    }
  ];

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
    <section className="w-full pt-32 pb-32 md:pt-40 md:pb-40 bg-[#efe8d8] font-raleway relative overflow-hidden z-10">
      
      {/* =========================================
          ONDA SUPERIOR (Onda Oficial Gruesa)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
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

      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <div className="text-center mb-10">
          <h2 className="text-[#256b3c] font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase font-raleway">
            Las cinco especialidades del equipo
          </h2>
        </div>

        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto items-stretch gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 pt-2 px-2 -mx-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {especialidades.map((item) => (
              <div 
                key={item.id} 
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-white hover:bg-[#2e4b34] rounded-[24px] p-6 shadow-sm hover:shadow-xl flex flex-col h-auto border border-gray-100 transition-all duration-300 group cursor-default"
              >
                {/* --- CONTENEDOR DE IMAGEN --- */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 overflow-hidden shrink-0 shadow-sm border border-gray-50 bg-white">
                  {item.icon}
                </div>

                <h3 className="font-raleway text-[22px] font-bold text-[#1e3325] group-hover:text-white mb-1 transition-colors duration-300">
                  {item.titulo}
                </h3>
                
                <p className="text-[#a3b18a] group-hover:text-[#c7d6b8] text-[10px] font-bold tracking-[0.1em] uppercase mb-4 transition-colors duration-300 font-raleway">
                  {item.subtitulo}
                </p>
                
                <p className="text-[#6b7280] group-hover:text-white/90 text-[14px] leading-relaxed mb-8 flex-grow transition-colors duration-300 font-raleway">
                  {item.descripcion}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="bg-[#efe8d8] group-hover:bg-white/20 text-[#6b7280] group-hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-full transition-colors duration-300 font-raleway"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1e3325] hover:bg-[#2e4b34] hover:text-white hover:border-[#2e4b34] hover:shadow-md transition-all focus:outline-none relative z-30"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#1e3325] hover:bg-[#2e4b34] hover:text-white hover:border-[#2e4b34] hover:shadow-md transition-all focus:outline-none relative z-30"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>  

      </div>

      {/* =========================================
          ONDA INFERIOR (Onda Oficial Gruesa - Volteada)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 800 200" 
          preserveAspectRatio="none" 
          className="w-full h-[100px] md:h-[180px] block -scale-y-100"
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default EspecialidadesCarousel;