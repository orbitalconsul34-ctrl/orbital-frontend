import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const DoctorGrid = ({ equipoData: propEquipoData, loading: propLoading, error: propError }) => {
  const [doctorSeleccionado, setDoctorSeleccionado] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(!propEquipoData);
  const [error, setError] = useState(null);

  // CONEXIÓN DIRECTA AL BACKEND SI NO PASAN PROPS
  useEffect(() => {
    if (propEquipoData) return;

    fetch(`${API_BASE_URL}/api/doctores/publicos`)
      .then(async (res) => {
        if (!res.ok) throw new Error('No se pudo cargar el staff médico del servidor.');
        return res.json();
      })
      .then((data) => {
        setFetchedData(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [propEquipoData]);

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

  const equipoParaUsar = propEquipoData || fetchedData;
  const isLoading = propLoading !== undefined ? propLoading : loading;
  const isError = propError || error;

  // PARSER SEGURO PARA CAMPOS JSON (Y ordenamos la formación del más actual al más antiguo)
  const parseJSONField = (field, reverse = false) => {
    if (!field) return [];
    let parsed = [];
    if (Array.isArray(field)) {
      parsed = [...field];
    } else {
      try {
        parsed = JSON.parse(field);
      } catch {
        parsed = [];
      }
    }
    return reverse ? parsed.reverse() : parsed;
  };

  // MAPEO AUTOMÁTICO DE LOS DATOS
  const dataToRender = equipoParaUsar && equipoParaUsar.length > 0 
    ? equipoParaUsar.map(doc => ({
        id: doc.id,
        nombre: doc.nombres,
        especialidad: doc.especialidad,
        imagen: doc.foto_url,
        detalle: {
          tituloCompleto: doc.titulo || doc.especialidad,
          formacion: parseJSONField(doc.formacion, true), // TRUE para mostrar lo más actual primero
          cursos: parseJSONField(doc.cursos),
          experiencia: parseJSONField(doc.experiencia)
        }
      }))
    : [];

  // ORDEN EXACTO SOLICITADO: Caycho, Zúñiga, Alcázar, Ángeles, Nizama y los demás
  const ordenDeseado = ["Caycho", "Zúñiga", "Alcázar", "Ángeles", "Nizama"];
  dataToRender.sort((a, b) => {
    const indexA = ordenDeseado.findIndex(apellido => a.nombre.includes(apellido));
    const indexB = ordenDeseado.findIndex(apellido => b.nombre.includes(apellido));
    
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });

  return (
    <>
      <section className="relative bg-[#efe8d8] pt-24 pb-24 md:pt-32 md:pb-32 font-raleway z-10 overflow-hidden">
        
        {/* ONDA SUPERIOR */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[180px] block">
            <path d="M0,100 C150,140 300,60 500,130 C650,170 750,100 800,118 L800,0 L0,0 Z" fill="#ffffff" />
            <path d="M-10,95 C140,145 310,55 510,125 C660,175 740,95 810,113" fill="none" stroke="#5c6e4e" strokeWidth="10" opacity="0.9" />
            <path d="M-10,120 C160,80 280,110 490,140 C630,155 770,80 810,90" fill="none" stroke="#8b9a7b" strokeWidth="5" opacity="0.9" />
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

          {isLoading && <p className="text-center text-[#6b7280] mb-8 font-raleway">Cargando equipo médico...</p>}
          {isError && <p className="text-center text-red-500 mb-8 font-raleway">{isError}</p>}

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

        {/* ONDA INFERIOR */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[180px] block -scale-y-100">
            <path d="M0,100 C150,140 300,60 500,130 C650,170 750,100 800,118 L800,0 L0,0 Z" fill="#ffffff" />
            <path d="M-10,95 C140,145 310,55 510,125 C660,175 740,95 810,113" fill="none" stroke="#5c6e4e" strokeWidth="10" opacity="0.9" />
            <path d="M-10,120 C160,80 280,110 490,140 C630,155 770,80 810,90" fill="none" stroke="#8b9a7b" strokeWidth="5" opacity="0.9" />
          </svg>
        </div>

      </section>

      {/* MODAL (Pop-up 100% responsivo, con padding superior para limpiar el Navbar y botón X integrado abajo/arriba en el header) */}
      {doctorSeleccionado && doctorSeleccionado.detalle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-24 sm:pt-28 font-raleway overflow-y-auto">
          <div className="absolute inset-0 bg-[#1e3325]/70 backdrop-blur-sm transition-opacity" onClick={() => setDoctorSeleccionado(null)}></div>
          
          <div className="relative bg-[#efe8d8] w-full max-w-3xl rounded-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden transform transition-all font-raleway my-auto z-10">
            
            {/* HEADER DEL MODAL CON BOTÓN DE CIERRE INTEGRADO */}
            <div className="flex justify-between items-center p-6 sm:px-10 sm:pt-8 pb-4 border-b border-gray-200/60 shrink-0 bg-[#efe8d8]">
              <div className="flex items-center gap-4 sm:gap-6 pr-4">
                <img 
                  src={doctorSeleccionado.imagen} 
                  alt={doctorSeleccionado.nombre} 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top shadow-md shrink-0 bg-white"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150/efe8d8/256b3c?text=Foto' }}
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-raleway font-bold text-[#1e3325] mb-1">{doctorSeleccionado.nombre}</h2>
                  <p className="text-[#256b3c] text-[12px] sm:text-[13px] font-bold leading-relaxed font-raleway">{doctorSeleccionado.detalle.tituloCompleto}</p>
                </div>
              </div>
              <button 
                onClick={() => setDoctorSeleccionado(null)}
                className="w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-[#1e3325] transition-colors shadow-sm shrink-0 border border-gray-200"
                aria-label="Cerrar modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* CONTENIDO SCROLLEABLE */}
            <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar flex-grow">
              {doctorSeleccionado.detalle.formacion && doctorSeleccionado.detalle.formacion.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-[#1e3325] text-[16px] font-raleway font-bold mb-6">Formación académica</h3>
                  <div className="space-y-6">
                    {doctorSeleccionado.detalle.formacion.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        
                        {item.logo_url ? (
                          <img src={item.logo_url} alt="Logo" className="w-10 h-10 rounded-xl shrink-0 object-contain shadow-sm bg-white p-1 border border-gray-100" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm bg-[#256b3c]">
                            <span className="text-white text-[10px] font-bold opacity-80 uppercase font-raleway">Uni</span>
                          </div>
                        )}

                        <div>
                          <h4 className="text-[#1e3325] font-bold text-[14px] leading-tight mb-1 font-raleway">{item.institucion}</h4>
                          <p className="text-[#6b7280] text-[13px] leading-snug mb-1 font-raleway">{item.grado}</p>
                          {item.periodo && <p className="text-[#a3b18a] text-[12px] font-bold font-raleway">{item.periodo}</p>}
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