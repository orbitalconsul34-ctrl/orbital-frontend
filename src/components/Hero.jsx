import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="pt-16 pb-12 overflow-hidden font-raleway relative z-10">
      <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
        
        {/* Columna Izquierda: Textos y Botones */}
        <div className="max-w-xl">
          <span className="font-raleway text-[#8a9096] font-bold text-[13px] tracking-[0.14em] uppercase mb-4 block">
            Centro de Metabolismo y Obesidad · Pueblo Libre, Lima
          </span>
          
          <h1 className="font-raleway text-[40px] lg:text-[46px] leading-[1.1] mb-4 font-bold text-os-ink">
            Si haces todo bien y no bajas, <br /> 
            <span className="font-raleway text-[#256b3c] italic font-medium">la causa está en tu metabolismo</span>
          </h1>
          
          <p className="font-raleway text-os-ink-soft text-[17.5px] leading-[1.55] mb-8 max-w-[480px]">
            Años de dietas y efecto rebote no son falta de voluntad. Encontramos <b className="font-raleway">por qué</b> tu cuerpo retiene peso — tiroides, resistencia a la insulina, hormonas — y recién ahí diseñamos tu tratamiento.
          </p>
          
          <div className="flex flex-wrap gap-4">
            
            {/* 1. BOTÓN WHATSAPP */}
            <a 
              href="https://wa.me/51981009863?text=Hola,%20me%20gustar%C3%ADa%20agendar%20mi%20evaluaci%C3%B3n" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-raleway bg-[#256b3c] text-white px-7 py-[14px] rounded-full font-bold hover:bg-[#1f5a33] transition-all shadow-[0_12px_24px_-10px_rgba(37,107,60,0.5)] flex items-center justify-center gap-2.5 text-[15px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.399A7.968 7.968 0 0 0 8 0C3.582 0 0 3.582 0 8a7.95 7.95 0 0 0 1.121 4.094L.133 15.867l3.905-1.02A7.95 7.95 0 0 0 8 16c4.418 0 8-3.582 8-8a7.96 7.96 0 0 0-2.399-5.601zM8 14.653a6.59 6.59 0 0 1-3.364-1.22l-.241-.143-2.502.655.666-2.438-.157-.25A6.574 6.574 0 0 1 1.408 8c0-3.626 2.951-6.577 6.592-6.577 3.626 0 6.577 2.951 6.577 6.577 0 3.626-2.951 6.577-6.577 6.577zm3.46-4.736c-.19-.095-1.121-.553-1.295-.616-.174-.063-.301-.095-.428.095-.127.19-.489.616-.599.742-.111.127-.222.143-.413.048-.19-.095-.8-.295-1.523-.935-.562-.498-.941-1.111-1.052-1.302-.111-.19-.012-.293.083-.388.084-.084.19-.222.285-.332.095-.111.127-.19.19-.317.063-.127.032-.238-.016-.332-.048-.095-.428-1.032-.587-1.413-.156-.37-.313-.32-.428-.326-.111-.006-.238-.006-.365-.006-.127 0-.332.048-.506.238-.174.19-.665.65-.665 1.587 0 .936.681 1.841.776 1.968.095.127 1.341 2.049 3.242 2.868.452.194.805.31 1.08.397.453.144.865.123 1.19.075.364-.054 1.121-.458 1.279-.901.159-.443.159-.822.111-.901-.048-.079-.174-.127-.365-.222z"/>
              </svg>
              Agendar mi evaluación
            </a>
            
            {/* 2. BOTÓN CALCULADORA (Scroll suave usando ancla) */}
            <a 
              href="#calculadora" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-raleway border-[1px] border-os-ink-soft text-os-ink px-7 py-[14px] rounded-full font-semibold hover:bg-os-plomo transition-colors flex items-center justify-center text-[15px]"
            >
              ¿Es para mí? Calcula tu IMC
            </a>
          </div>
        </div>

        {/* Columna Derecha: Imagen Horizontal */}
        <div className="relative flex justify-center md:justify-end mt-12 md:mt-0 w-full">
          <div className="relative inline-block w-full max-w-[560px]">
            <div className="absolute top-4 left-4 w-full h-full bg-[#F1F2F3] rounded-[24px] z-0"></div>
            <img 
              src="/hero-home.jpg" 
              alt="Doctoras en Orbital Salud" 
              className="relative z-10 w-full h-auto object-cover rounded-[24px] border-[6px] border-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;