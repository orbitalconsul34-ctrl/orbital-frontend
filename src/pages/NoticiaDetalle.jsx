import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const NoticiaDetalle = () => {
  const { id } = useParams(); // Obtiene el ID de la URL (ej. /noticias/1)
  const [articulo, setArticulo] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  // === DATOS SIMULADOS CON CONTENIDO LARGO ===
  const todosLosArticulos = [
    {
      id: 1,
      categoria: "Endocrinología",
      tiempoLectura: "6 min de lectura",
      titulo: "Resistencia a la insulina: qué es y cómo revertirla",
      descripcion: "La resistencia a la insulina es el primer paso hacia la diabetes tipo 2. Aprende cómo la alimentación y el músculo pueden revertir este proceso de manera natural y sostenida.",
      fecha: "24 de septiembre de 2026",
      imagen: "/noticia-destacada.jpg",
      colorPunto: "bg-[#256b3c]",
      contenido: `
        <p>La resistencia a la insulina es una condición metabólica silenciosa en la que las células de tu cuerpo (músculos, grasa e hígado) dejan de responder correctamente a la insulina, la hormona encargada de permitir que la glucosa ingrese a las células para ser utilizada como energía.</p>
        <br/>
        <h3 class="text-[22px] font-bold text-[#1e3325] mt-6 mb-3 font-raleway">¿Por qué ocurre esto?</h3>
        <p>Cuando consumimos un exceso de carbohidratos refinados y azúcares a lo largo del tiempo, el páncreas se ve obligado a producir cantidades masivas de insulina. Eventualmente, las células se "saturan" y cierran sus puertas, dejando el azúcar libre en el torrente sanguíneo. Esto no solo promueve el almacenamiento de grasa (especialmente abdominal), sino que es el primer paso hacia la prediabetes y la diabetes tipo 2.</p>
        <br/>
        <blockquote class="border-l-4 border-[#256b3c] pl-5 italic text-[#256b3c] font-semibold my-8 bg-[#F9F6F0] p-4 rounded-r-xl">
          "No se trata de comer menos, sino de comer mejor y enviar la señal correcta a nuestras hormonas. El músculo es el mejor aliado contra la resistencia a la insulina."
        </blockquote>
        <h3 class="text-[22px] font-bold text-[#1e3325] mt-6 mb-3 font-raleway">Cómo revertirla de forma natural</h3>
        <p>A diferencia de lo que se creía hace décadas, la resistencia a la insulina es completamente reversible si se detecta a tiempo y se toman medidas en el estilo de vida:</p>
        <ul class="list-disc pl-5 mt-4 space-y-2">
          <li><strong>Entrenamiento de fuerza:</strong> El músculo es el órgano que más glucosa consume. Al ganar masa muscular, mejoras la sensibilidad a la insulina.</li>
          <li><strong>Descanso reparador:</strong> Dormir menos de 6 horas aumenta el cortisol, lo que eleva el azúcar en la sangre y empeora la resistencia a la insulina.</li>
          <li><strong>Nutrición estratégica:</strong> Priorizar proteínas y grasas saludables, y reducir drásticamente los ultraprocesados.</li>
        </ul>
        <br/>
        <p>Si sientes fatiga constante, antojos incontrolables por los dulces o dificultad para perder grasa abdominal a pesar de hacer dieta, es momento de realizarte una evaluación metabólica completa.</p>
      `
    },
    {
      id: 2,
      categoria: "Nutrición",
      tiempoLectura: "5 min de lectura",
      titulo: "Composición corporal vs. Peso en la balanza",
      descripcion: "Por qué el número en la balanza no cuenta toda la historia sobre tu salud metabólica.",
      fecha: "20 de septiembre de 2026",
      imagen: "/noticia-2.jpg",
      colorPunto: "bg-[#a68a61]",
      contenido: "<p>El peso es solo un número que agrupa hueso, agua, músculo y grasa. Centrarse solo en la balanza puede ser frustrante y engañoso. En Orbital Salud utilizamos InBody para evaluar tu verdadera composición corporal...</p>"
    },
    {
      id: 3,
      categoria: "Dermatología",
      tiempoLectura: "4 min de lectura",
      titulo: "Cómo las hormonas afectan la caída del cabello",
      descripcion: "Descubre la relación directa entre el estrés, las hormonas y la salud de tu cuero cabelludo.",
      fecha: "18 de septiembre de 2026",
      imagen: "/noticia-3.jpg",
      colorPunto: "bg-[#8a9096]",
      contenido: "<p>La pérdida de cabello no siempre es genética. Alteraciones en la tiroides, síndrome de ovario poliquístico (SOP) o deficiencias nutricionales son factores clave que debemos descartar...</p>"
    },
    {
      id: 4,
      categoria: "Endocrinología",
      tiempoLectura: "6 min de lectura",
      titulo: "Semaglutida: indicaciones y uso correcto",
      descripcion: "Conoce cómo funcionan los nuevos fármacos GLP-1 y por qué deben ser supervisados por un médico.",
      fecha: "12 de septiembre de 2026",
      imagen: "/noticia-5.jpg",
      colorPunto: "bg-[#256b3c]",
      contenido: "<p>Los análogos de GLP-1 han revolucionado el tratamiento de la obesidad y la resistencia a la insulina. Sin embargo, no son mágicos ni para todos. Requieren un acompañamiento nutricional estricto para evitar la pérdida de masa muscular...</p>"
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    // Simulamos la búsqueda de la noticia (Aquí harías tu fetch al backend real)
    setTimeout(() => {
      // Como id puede venir como string de la URL, lo convertimos a número
      const noticiaId = id ? parseInt(id) : 1; 
      const noticiaEncontrada = todosLosArticulos.find(art => art.id === noticiaId) || todosLosArticulos[0];
      
      setArticulo(noticiaEncontrada);

      // Filtrar relacionados: Misma categoría, distinto ID (máximo 3)
      const filtrados = todosLosArticulos
        .filter(art => art.categoria === noticiaEncontrada.categoria && art.id !== noticiaEncontrada.id)
        .slice(0, 3);
      
      setRelacionados(filtrados);
      setLoading(false);
    }, 400);

  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-raleway bg-white">
        <div className="w-10 h-10 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!articulo) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-raleway bg-white">
        <h1 className="text-3xl font-bold text-[#1e3325]">Artículo no encontrado</h1>
        <Link to="/noticias" className="mt-4 text-[#256b3c] font-bold hover:underline">Volver a noticias</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      
      {/* =========================================
          ENCABEZADO DE LA NOTICIA (Sin fondo gris, todo limpio)
          ========================================= */}
      <main className="flex-grow pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1000px] mx-auto w-full">
        
        {/* Breadcrumb (Migas de pan) */}
        <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-[#8a9096] mb-8 font-raleway">
          <Link to="/" className="hover:text-[#256b3c] transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/noticias" className="hover:text-[#256b3c] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-[#256b3c]">{articulo.categoria}</span>
        </div>

        {/* Título y Metadatos */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className={`w-2.5 h-2.5 rounded-full ${articulo.colorPunto}`}></span>
            <span className="text-[#256b3c] font-bold text-[13px] uppercase tracking-widest">{articulo.categoria}</span>
          </div>
          
          <h1 className="text-[32px] md:text-[46px] lg:text-[54px] font-bold text-[#1e3325] leading-[1.1] mb-6 font-raleway">
            {articulo.titulo}
          </h1>
          
          <div className="flex items-center justify-between border-y border-black/5 py-4">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Orbital Salud" className="w-10 h-10 rounded-full object-cover bg-[#F9F6F0] p-1 border border-black/5" />
              <div>
                <p className="text-[13px] font-bold text-[#1e3325]">Equipo Orbital Salud</p>
                <p className="text-[12px] text-[#8a9096]">{articulo.fecha} · {articulo.tiempoLectura}</p>
              </div>
            </div>
            
            {/* Botones de Compartir (Visuales) */}
            <div className="flex gap-2">
              <button className="w-9 h-9 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1e3325] hover:bg-[#256b3c] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-[#F9F6F0] flex items-center justify-center text-[#1e3325] hover:bg-[#256b3c] hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            IMAGEN PRINCIPAL DEL ARTÍCULO
            ========================================= */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] md:rounded-[36px] overflow-hidden bg-[#F9F6F0] mb-12 shadow-[0_10px_30px_rgba(0,0,0,0.06)] relative border border-black/5">
          <img 
            src={articulo.imagen} 
            alt={articulo.titulo}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600/efe8d8/256b3c?text=Imagen+del+Artículo' }}
          />
        </div>

        {/* =========================================
            CUERPO DEL ARTÍCULO
            ========================================= */}
        <div className="max-w-[800px] mx-auto">
          {/* Introducción / Descripción destacada */}
          <p className="text-[18px] md:text-[20px] font-semibold text-[#1e3325] leading-relaxed mb-8 font-raleway">
            {articulo.descripcion}
          </p>

          {/* Renderizado del HTML simulado */}
          <div 
            className="prose prose-lg prose-green max-w-none text-[#4b5563] font-raleway leading-[1.8] tracking-wide"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          ></div>
          
          {/* Sección de Tags y Volver */}
          <div className="mt-16 pt-8 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-[#1e3325] mr-2 font-raleway">Etiquetas:</span>
              <span className="bg-[#F9F6F0] text-[#6b7280] text-[12px] px-4 py-1.5 rounded-full font-raleway">Salud</span>
              <span className="bg-[#F9F6F0] text-[#6b7280] text-[12px] px-4 py-1.5 rounded-full font-raleway">{articulo.categoria}</span>
            </div>
            <Link to="/noticias" className="font-raleway text-[#256b3c] font-bold text-[14px] hover:text-[#1e3325] transition-colors flex items-center gap-2">
              ← Volver a todas las noticias
            </Link>
          </div>
        </div>
      </main>

      {/* =========================================
          ARTÍCULOS RELACIONADOS
          ========================================= */}
      {relacionados.length > 0 && (
        <section className="w-full py-20 bg-[#F9F6F0] border-t border-black/5 relative z-10">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[#A68A61] font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase mb-2 block font-raleway">
                  Sigue leyendo
                </span>
                <h3 className="text-[28px] md:text-[36px] font-bold text-[#1e3325] font-raleway leading-tight">
                  Artículos Relacionados
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relacionados.map((rel) => (
                <div key={rel.id} className="bg-white rounded-[24px] overflow-hidden group cursor-pointer flex flex-col h-full border border-black/5 hover:border-[#256b3c]/30 hover:shadow-xl transition-all duration-300">
                  <Link to={`/noticias/${rel.id}`} className="flex flex-col h-full">
                    <div className="w-full aspect-[4/3] overflow-hidden bg-[#efe8d8]">
                      <img 
                        src={rel.imagen} 
                        alt={rel.titulo}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/efe8d8/256b3c?text=Noticia' }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`w-1.5 h-1.5 rounded-full ${rel.colorPunto}`}></span>
                          <span className="text-[#256b3c] font-bold text-[11px] font-raleway uppercase tracking-wider">{rel.categoria}</span>
                        </div>
                        <span className="text-[#8a9096] text-[11px] shrink-0 font-raleway">· {rel.tiempoLectura}</span>
                      </div>
                      <h4 className="text-[18px] font-bold text-[#1e3325] leading-snug mb-3 group-hover:text-[#256b3c] transition-colors font-raleway">
                        {rel.titulo}
                      </h4>
                      <p className="text-[#6b7280] text-[13px] leading-relaxed mb-6 flex-grow font-raleway line-clamp-2">
                        {rel.descripcion}
                      </p>
                      <span className="font-raleway text-[#256b3c] font-bold text-[13px] mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                        Leer artículo <span className="text-[16px]">→</span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NoticiaDetalle;