import React, { useState, useEffect } from 'react';

const DoctorGrid = ({ equipoData, loading, error }) => {
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);

  useEffect(() => {
    if (doctorSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [doctorSeleccionado]);

  const defaultEquipo = [
    { 
      id: 1, nombre: "Dra. Angélica Caycho", especialidad: "Endocrinología", imagen: "/angelica-caycho.jpg",
      detalle: {
        tituloCompleto: "Médica Endocrinóloga · Especialista en Obesidad, Diabetes y Salud Metabólica",
        formacion: [
          { institucion: "UNMSM", grado: "Médico-cirujana", periodo: "2011 – 2017", logoBg: "bg-[#256b3c]" },
          { institucion: "UNMSM", grado: "Médica Endocrinóloga", periodo: "2020 – 2023", logoBg: "bg-[#256b3c]" },
          { institucion: "UPCH", grado: "Maestría en desórdenes de metabolismo", periodo: "2024 – 2025", logoBg: "bg-[#1e3325]" },
          { institucion: "Universidad Austral, Argentina", grado: "Diplomatura en Cirugía Metabólica", periodo: "2022", logoBg: "bg-[#8a9096]" }
        ],
        cursos: ["Certificación SCOPE — World Obesity Federation"],
        experiencia: ["Speaker, Novo Nordisk (2025 – actualidad)", "Médica Endocrinóloga, Clínica Tezza"]
      }
    },
    { 
      id: 2, nombre: "Dra. Antonella Zúñiga", especialidad: "Endocrinología", imagen: "/antonella-zuniga.jpg",
      detalle: {
        tituloCompleto: "Médica Endocrinóloga · Especialista en control hormonal",
        formacion: [{ institucion: "Universidad Ejemplo", grado: "Médica Cirujana", periodo: "2012 - 2018" }],
        cursos: ["Curso Avanzado de Tiroides"], experiencia: ["Hospital Nacional"]
      }
    },
    { 
      id: 3, nombre: "Dra. Norah Alcázar", especialidad: "Endocrinología Pediátrica", imagen: "/norah-alcazar.jpg",
      detalle: {
        tituloCompleto: "Médica Endocrinóloga Pediatra · Crecimiento y desarrollo infantil",
        formacion: [{ institucion: "Universidad Ejemplo", grado: "Especialidad Pediátrica", periodo: "2015 - 2019" }],
        cursos: [], experiencia: []
      }
    },
    { 
      id: 4, nombre: "Dra. Karen Ángeles", especialidad: "Dermatología", imagen: "/karen-angeles.jpg",
      detalle: {
        tituloCompleto: "Médica Dermatóloga · Especialista en cuidado integral de la piel",
        formacion: [
          { institucion: "Universidad Peruana", grado: "Médica Cirujana", periodo: "2010 - 2016" },
          { institucion: "UNMSM", grado: "Especialidad en Dermatología", periodo: "2018 - 2021", logoBg: "bg-[#256b3c]" }
        ],
        cursos: ["Diplomado en Dermatología Estética y Láser"], experiencia: ["Consulta privada"]
      }
    },
    { 
      id: 5, nombre: "Dr. Luis Nizama", especialidad: "Cardiología", imagen: "/luis-nizama.jpg",
      detalle: {
        tituloCompleto: "Médico Cardiólogo · Prevención cardiovascular y riesgo metabólico",
        formacion: [{ institucion: "Universidad Ejemplo", grado: "Especialidad en Cardiología", periodo: "2014 - 2018" }],
        cursos: [], experiencia: []
      }
    },
    { 
      id: 6, nombre: "Lic. Leonardo Palacios", especialidad: "Nutrición Clínica", imagen: "/leonardo-palacios.jpg",
      detalle: {
        tituloCompleto: "Licenciado en Nutrición y Dietética · CNP 8839",
        formacion: [
          { institucion: "Universidad Privada del Norte (UPN)", grado: "Licenciado en Nutrición y Dietética", periodo: "Formativo", logoBg: "bg-[#256b3c]" },
          { institucion: "Universidad Peruana Cayetano Heredia (UPCH)", grado: "Estudios de Posgrado", periodo: "Formativo", logoBg: "bg-[#1e3325]" },
          { institucion: "Instituto Universitario Vive Sano (Brasil)", grado: "Estudios Internacionales", periodo: "Formativo", logoBg: "bg-[#8a9096]" }
        ],
        cursos: [
          "1er Congreso Peruano y Conferencia Anual del Medicamento Individualizado",
          "Certificación por la Escuela de Salud Rebagliati"
        ],
        experiencia: [
          "Nutricionista en AndoSalud (Centro Especializado en Diabetes, Obesidad & Pie Diabético)",
          "Nutricionista en NutraMed (Nutrición y Medicina Clínica)",
          "MINSA - Dirección de Redes Integradas de Salud (DIRIS) Lima Centro"
        ]
      }
    },
    { 
      id: 7, nombre: "Lic. Alexia Iza Farfan", especialidad: "Nutrición Clínica", imagen: "/alexia-iza.jpg",
      detalle: {
        tituloCompleto: "Nutricionista Clínica · Licenciada en Nutrición y Dietética CNP 9882",
        formacion: [
          { institucion: "Universidad Nacional", grado: "Licenciada en Nutrición y Dietética", periodo: "Formativo", logoBg: "bg-[#256b3c]" }
        ],
        cursos: [
          "Abordaje nutricional en Diabetes Mellitus e Hipertensión Arterial",
          "Manejo dietético de Dislipidemias, Hígado Graso y Enfermedad Renal"
        ],
        experiencia: [
          "Nutricionista Clínica en Centro de Salud Bodhisana (Jul 2025 - Actualidad)",
          "Nutricionista en Servicio de Alimentación - California, EE.UU. (Dic 2023 - Abr 2024)"
        ]
      }
    }
  ];

  const dataToRender = equipoData && equipoData.length > 0 ? equipoData : defaultEquipo;

  return (
    <>
      <section className="relative bg-[#efe8d8] pt-24 pb-24 md:pt-32 md:pb-32 font-raleway z-10 overflow-hidden">
        
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

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-10 md:mb-14 pt-8">
            <span className="text-[#8a9096] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-raleway block mb-3 md:mb-4">
              Nuestro equipo
            </span>
            <h2 className="text-[#1e3325] font-raleway text-[32px] md:text-[42px] font-bold leading-tight mb-3 md:mb-4">
              Un equipo, un mismo enfoque
            </h2>
            <p className="text-[#6b7280] text-[14px] md:text-[16px] font-raleway">
              Tratar la causa, no solo el síntoma — en cada especialidad.
            </p>
          </div>

          {loading && <p className="text-center text-[#6b7280] mb-8 font-raleway">Cargando equipo médico...</p>}
          {error && <p className="text-center text-red-500 mb-8 font-raleway">{error}</p>}

          {/* AQUÍ ESTÁ EL CAMBIO: grid-cols-2 md:grid-cols-4 lg:grid-cols-7 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-4 lg:gap-5">
            {dataToRender.map((doc) => (
              <div 
                key={doc.id} 
                onClick={() => setDoctorSeleccionado(doc)}
                className="bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-black/5 group flex flex-col cursor-pointer"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f4f5f3]">
                   <img 
                     src={doc.imagen} 
                     alt={doc.nombre} 
                     className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                     onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400/efe8d8/256b3c?text=Foto' }} 
                   />
                   
                   <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-8 h-8 md:w-10 md:h-10 bg-[#1e3325]/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                     <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                     </svg>
                   </div>
                </div>
                
                <div className="p-3 md:p-3 xl:p-4 text-center flex-grow flex flex-col justify-center items-center bg-white relative z-10">
                  <h3 className="font-raleway text-[12px] md:text-[13px] xl:text-[15px] font-bold text-[#1e3325] mb-1 leading-tight transition-colors duration-300 group-hover:text-[#256b3c]">
                    {doc.nombre}
                  </h3>
                  <p className="text-[#6b7280] font-raleway text-[10px] md:text-[11px] font-bold">
                    {doc.especialidad}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center flex flex-col items-center">
            <p className="text-[11px] md:text-[12px] text-[#8a9096] mb-6 md:mb-8 font-raleway italic px-4">
              Haz click en la foto de cada especialista para ver su formación profesional.
            </p>
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

      </section>

      {/* MODAL (Pop-up) */}
      {doctorSeleccionado && doctorSeleccionado.detalle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-raleway">
          <div className="absolute inset-0 bg-[#1e3325]/70 backdrop-blur-sm transition-opacity" onClick={() => setDoctorSeleccionado(null)}></div>
          
          <div className="relative bg-[#efe8d8] w-full max-w-3xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all font-raleway">
            <button 
              onClick={() => setDoctorSeleccionado(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-[#1e3325] transition-colors z-10 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-10 border-b border-gray-200 pb-8 pr-8">
                <img 
                  src={doctorSeleccionado.imagen} 
                  alt={doctorSeleccionado.nombre} 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover object-top shadow-md shrink-0 bg-white"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150/efe8d8/256b3c?text=Foto' }}
                />
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl sm:text-3xl font-raleway font-bold text-[#1e3325] mb-2">{doctorSeleccionado.nombre}</h2>
                  <p className="text-[#256b3c] text-[13px] sm:text-[14px] font-bold leading-relaxed font-raleway">{doctorSeleccionado.detalle.tituloCompleto}</p>
                </div>
              </div>

              {doctorSeleccionado.detalle.formacion && doctorSeleccionado.detalle.formacion.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[#1e3325] text-[16px] font-raleway font-bold mb-6">Formación académica</h3>
                  <div className="space-y-6">
                    {doctorSeleccionado.detalle.formacion.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${item.logoBg || 'bg-gray-200'}`}>
                          <span className="text-white text-[10px] font-bold opacity-80 uppercase font-raleway">Uni</span>
                        </div>
                        <div>
                          <h4 className="text-[#1e3325] font-bold text-[14px] leading-tight mb-1 font-raleway">{item.institucion}</h4>
                          <p className="text-[#6b7280] text-[13px] leading-snug mb-1 font-raleway">{item.grado}</p>
                          <p className="text-[#a3b18a] text-[12px] font-bold font-raleway">{item.periodo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {doctorSeleccionado.detalle.cursos && doctorSeleccionado.detalle.cursos.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[#1e3325] text-[16px] font-raleway font-bold mb-4">Cursos y certificaciones</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {doctorSeleccionado.detalle.cursos.map((curso, index) => (
                      <li key={index} className="text-[#6b7280] text-[13px] font-raleway">{curso}</li>
                    ))}
                  </ul>
                </div>
              )}

              {doctorSeleccionado.detalle.experiencia && doctorSeleccionado.detalle.experiencia.length > 0 && (
                <div>
                  <h3 className="text-[#1e3325] text-[16px] font-raleway font-bold mb-4">Experiencia</h3>
                  <ul className="list-disc list-inside space-y-2 text-[#6b7280] text-[13px] font-raleway">
                    {doctorSeleccionado.detalle.experiencia.map((exp, index) => (
                      <li key={index} className="font-raleway">{exp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #efe8d8; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
      `}</style>
    </>
  );
};

export default DoctorGrid;