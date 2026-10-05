import React from 'react';

const HorarioAtencion = () => {
  return (
    <section className="w-full font-raleway pt-24 pb-20 bg-[#F9F6F0] overflow-hidden relative z-10">
      
      {/* =========================================
          ONDA SUPERIOR
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          viewBox="0 0 1440 80" 
          preserveAspectRatio="none" 
          className="w-full h-[40px] md:h-[70px] block"
        >
          {/* Fondo para conectar suavemente con la sección anterior (blanco) */}
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

      <div className="max-w-[1050px] mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Cabecera */}
        <div className="text-center mb-12 mt-6">
          <span className="font-raleway text-[#8a9096] font-bold text-[11px] tracking-[0.2em] uppercase mb-3 block">
            HORARIO DE ATENCIÓN
          </span>
          <h2 className="font-raleway text-[34px] md:text-[42px] text-[#1e3325] font-bold leading-tight mb-3">
            Cuándo puedes visitarnos
          </h2>
          <p className="font-raleway text-[#6b7280] text-[15px]">
            Av. Brasil 2730, consultorio 1106 — Edificio Qualis, Pueblo Libre, Lima.
          </p>
        </div>

        {/* Tarjeta principal gris claro */}
        <div className="bg-[#f4f5f3] rounded-[36px] p-8 md:p-12 border border-gray-200/60 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Lado izquierdo: Horarios */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4.5 px-6 flex items-center justify-between shadow-sm border border-gray-100">
              <span className="font-raleway font-bold text-[15px] text-[#1e3325]">Lunes a Sábado</span>
              <span className="font-raleway text-[14px] text-[#6b7280]">9:00 am – 6:00 pm</span>
            </div>
            <div className="bg-white rounded-2xl p-4.5 px-6 flex items-center justify-between shadow-sm border border-gray-100">
              <span className="font-raleway font-bold text-[15px] text-[#1e3325]">Domingos y feriados</span>
              <span className="font-raleway text-[14px] text-[#8a9096]">Cerrado</span>
            </div>
          </div>

          {/* Lado derecho: Texto y botón WhatsApp */}
          <div className="flex flex-col justify-center">
            <h3 className="font-raleway text-[20px] font-bold text-[#1e3325] mb-2">
              ¿Prefieres coordinar directo?
            </h3>
            <p className="font-raleway text-[#6b7280] text-[13.5px] leading-relaxed mb-6">
              Escríbenos por WhatsApp y te confirmamos el horario disponible según la especialidad que necesites — algunas atienden también de forma virtual.
            </p>
            <div>
              {/* BOTÓN WHATSAPP ACTUALIZADO CON LINK Y MENSAJE */}
              <a 
                href="https://wa.me/51981009863?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20cita.%20%C2%BFQu%C3%A9%20horarios%20tienen%20disponibles,%20por%20favor?" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-raleway inline-flex items-center gap-2.5 bg-[#1b6132] text-white font-bold text-[14px] px-7 py-3.5 rounded-full shadow-[0_10px_25px_rgba(27,97,50,0.3)] hover:bg-[#154e28] transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HorarioAtencion;