import React, { useState } from 'react';

const ResultadosReales = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeCase, setActiveCase] = useState(0);
  const [direction, setDirection] = useState('next');

  // Datos corregidos: La paciente M.R. (Mujer) primero con sus imágenes, 
  // y E.H. (Hombre) segundo con sus imágenes correspondientes.
  const cases = [
    {
      tag: "CASO 1 - PROGRAMA METABÓLICO DE PESO",
      name: "Paciente M.R.",
      details: "39 años · 1.58 m · Endocrinología + Nutrición",
      stats: [
        { label: "Peso", value: "82 kg → 66 kg", highlight: "(-16 kg · -20%)" },
        { label: "IMC", value: "32.8 → 26.4" },
        { label: "Grasa corporal (InBody)", value: "38% → 28%" },
        { label: "Masa muscular", value: "Mantenida" },
        { label: "Duración", value: "26 semanas" }
      ],
      causa: "Hipotiroidismo subclínico + resistencia a la insulina",
      tratamiento: "manejo de tiroides + plan nutricional + tratamiento médico supervisado (análogo de GLP-1) + seguimiento con InBody.",
      quote: `"Me trataron la tiroides y la insulina, no solo el peso. Por eso esta vez sí se mantuvo."`,
      imgAntes: "/antes-mujer.png",
      imgDespues: "/despues-mujer.png"
    },
    {
      tag: "CASO 2 - PROGRAMA METABÓLICO DE PESO",
      name: "Paciente E.H.",
      details: "47 años · 1.70 m · Endocrinología + Nutrición",
      stats: [
        { label: "Peso", value: "98 kg → 79 kg", highlight: "(-19 kg · -19%)" },
        { label: "IMC", value: "33.9 → 27.3" },
        { label: "Grasa corporal (InBody)", value: "34% → 24%" },
        { label: "Masa muscular", value: "Mantenida" },
        { label: "Duración", value: "24 semanas" }
      ],
      causa: "Resistencia a la insulina + prediabetes",
      tratamiento: "plan nutricional personalizado + tratamiento médico supervisado (análogo de GLP-1 cuando estuvo indicado) + seguimiento con InBody.",
      quote: `"Había intentado mil dietas. Recién cuando encontraron por qué mi cuerpo no bajaba, todo cambió."`,
      imgAntes: "/antes-hombre.png",
      imgDespues: "/despues-hombre.png"
    }
  ];

  const currentCase = cases[activeCase];

  const handlePrev = () => {
    setDirection('prev');
    setActiveCase((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
    setSliderPos(50);
  };

  const handleNext = () => {
    setDirection('next');
    setActiveCase((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
    setSliderPos(50);
  };

  return (
    <section id="resultados" className="w-full font-raleway pb-20 pt-20 overflow-hidden relative bg-white border-t border-black/5">
      
      {/* ==============================================
          FONDO ANIMADO TIPO ÓRBITAS (Color #6B7C5A) 
          ============================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30 z-0">
        <div className="absolute w-[800px] h-[800px] border-[1.5px] border-[#6B7C5A] rounded-full animate-[spin_60s_linear_infinite] opacity-40"></div>
        <div className="absolute w-[1100px] h-[1100px] border-[1px] border-[#6B7C5A] rounded-full animate-[spin_80s_linear_infinite_reverse] opacity-30"></div>
        <div className="absolute w-[1400px] h-[1400px] border border-[#6B7C5A] rounded-full animate-[spin_100s_linear_infinite] opacity-20"></div>
        
        {/* Nebulosas suaves de fondo para dar volumen a las órbitas */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#6B7C5A] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#6B7C5A] opacity-5 rounded-full blur-3xl"></div>
      </div>

      <style>
        {`
          @keyframes slideInNext {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInPrev {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-next {
            animation: slideInNext 0.5s ease-out forwards;
          }
          .animate-slide-prev {
            animation: slideInPrev 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Todo el contenido envuelto en z-10 para estar sobre las órbitas */}
      <div className="relative z-10">
        
        {/* CABECERA */}
        <div className="max-w-[1050px] mx-auto px-6 lg:px-8 text-center mb-12">
          <span className="font-raleway text-[#6B7C5A] font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase mb-4 block">
            RESULTADOS REALES
          </span>
          <h2 className="font-raleway text-3xl sm:text-4xl md:text-[46px] text-[#1e3325] mb-4 font-bold leading-tight">
            Antes y después de <span className="font-raleway text-[#256b3c] italic">nuestros pacientes</span>
          </h2>
          <p className="font-raleway text-[#6b7280] text-[15px] md:text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed">
            No es solo peso: recuperamos tu metabolismo. Mira cómo cambia el cuerpo cuando se trata la causa de fondo en equipo.
          </p>
        </div>

        {/* CONTENEDOR DE TARJETAS */}
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mb-10">
          
          <div className="bg-[#112318] rounded-[32px] overflow-hidden shadow-2xl shadow-[#112318]/20 border border-[#294B37]/50 flex flex-col lg:flex-row min-h-[500px]">
            
            <div 
              key={activeCase} 
              className={`flex flex-col lg:flex-row w-full ${direction === 'next' ? 'animate-slide-next' : 'animate-slide-prev'}`}
            >
              
              {/* Columna Izquierda: Textos */}
              <div className="order-2 lg:order-1 p-8 lg:p-12 lg:w-[50%] flex flex-col justify-center text-white bg-gradient-to-br from-[#112318] to-[#1a3524]">
                <span className="font-raleway text-[#4ADE80] text-[10px] font-bold tracking-widest uppercase mb-3 block opacity-90">
                  {currentCase.tag}
                </span>
                <h3 className="font-raleway text-[32px] font-bold text-white mb-2">
                  {currentCase.name}
                </h3>
                <p className="font-raleway text-[#A0AAB2] text-[13px] mb-8">
                  {currentCase.details}
                </p>

                <div className="space-y-4 mb-8 text-[14px]">
                  {currentCase.stats.map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-[#294B37]/50 pb-2">
                      <span className="font-raleway text-[#A0AAB2]">{stat.label}</span>
                      <span className="font-raleway font-bold text-white text-right">
                        {stat.value} {stat.highlight && <span className="font-raleway text-[#4ADE80] ml-1">{stat.highlight}</span>}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#F9F6F0]/90 p-5 rounded-2xl border border-white/20 mb-6 backdrop-blur-md shadow-lg">
                  <span className="font-raleway text-[10px] font-bold tracking-widest text-[#256b3c] uppercase block mb-2">
                    CAUSA DE FONDO DETECTADA
                  </span>
                  <p className="font-raleway text-[#1e3325] font-bold text-[14px]">
                    {currentCase.causa}
                  </p>
                </div>

                <p className="font-raleway text-[13px] text-[#A0AAB2] leading-relaxed mb-6">
                  <strong className="font-raleway text-white">Tratamiento:</strong> {currentCase.tratamiento}
                </p>

                <blockquote className="font-raleway italic text-[14px] text-white border-l-[3px] border-[#4ADE80] pl-5 py-1 opacity-90">
                  {currentCase.quote}
                </blockquote>
              </div>

              {/* Columna Derecha: Imagen Slider */}
              <div className="order-1 lg:order-2 lg:w-[50%] relative bg-[#EAE6DF] h-[350px] sm:h-[450px] lg:h-auto select-none flex items-center justify-center overflow-hidden">
                
                <img 
                  src={currentCase.imgDespues} 
                  alt="Paciente Después" 
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x1000/112318/FFFFFF?text=FOTO+DESPUES' }}
                />
                <img 
                  src={currentCase.imgAntes} 
                  alt="Paciente Antes" 
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x1000/F9F6F0/112318?text=FOTO+ANTES' }}
                />
                
                {/* Etiquetas Antes / Después */}
                <div className="font-raleway absolute top-6 left-6 bg-[#112318]/70 backdrop-blur-md text-white text-[10px] md:text-[11px] font-bold px-4 py-2 rounded-full z-10 uppercase tracking-widest pointer-events-none">
                  ANTES
                </div>
                <div className="font-raleway absolute top-6 right-6 bg-[#256b3c]/80 backdrop-blur-md text-white text-[10px] md:text-[11px] font-bold px-4 py-2 rounded-full z-10 uppercase tracking-widest shadow-lg shadow-[#256b3c]/30 pointer-events-none">
                  DESPUÉS
                </div>

                {/* Línea divisoria */}
                <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none" style={{ left: `calc(${sliderPos}% - 2px)` }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-gray-100">
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#112318]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-4 4 4 4m8-8l4 4-4 4"></path>
                    </svg>
                  </div>
                </div>

                {/* Input rango invisible que controla todo */}
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={sliderPos} 
                  onChange={(e) => setSliderPos(e.target.value)} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0" 
                />
              </div>

            </div>
          </div>

          {/* CONTROLES DE NAVEGACIÓN */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={handlePrev} className="w-12 h-12 rounded-full border border-[#6B7C5A]/30 bg-white flex items-center justify-center text-[#1e3325] hover:bg-[#6B7C5A] hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            <div className="flex gap-2.5">
              {cases.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { 
                    setDirection(idx > activeCase ? 'next' : 'prev');
                    setActiveCase(idx); 
                    setSliderPos(50); 
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeCase === idx ? 'w-8 bg-[#6B7C5A]' : 'w-2.5 bg-[#6B7C5A]/20'}`}
                />
              ))}
            </div>

            <button onClick={handleNext} className="w-12 h-12 rounded-full border border-[#6B7C5A]/30 bg-white flex items-center justify-center text-[#1e3325] hover:bg-[#6B7C5A] hover:text-white transition-all shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          {/* TEXTO DE DISCLAIMER */}
          <div className="mt-10 flex flex-col items-center">
            <p className="font-raleway text-[11.5px] text-[#8a9096] text-center max-w-[850px] leading-relaxed px-4">
              * En Orbital Salud protegemos la identidad de nuestros pacientes; las fotografías han sido adaptadas para preservar la confidencialidad médica. Los casos mostrados representan resultados clínicos documentados. Los resultados individuales varían según la fisiología de cada persona, adherencia al tratamiento y evaluación endocrinológica y nutricional específica.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ResultadosReales;