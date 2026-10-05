import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const NoticiasPage = () => {
  const [filtroActivo, setFiltroActivo] = useState('Todos los temas');
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // === CARGA DINÁMICA DESDE EL BACKEND ===
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/publicaciones`);
        if (response.ok) {
          const data = await response.json();
          // Filtramos solo las activas y mapeamos a la estructura de la UI
          const activas = data
            .filter(pub => pub.estado === 'ACTIVO')
            .map(pub => {
              // Extraer categoría de los tags o asignarle el tipo
              let categoriaVisual = pub.tipo_publicacion === 'VIDEO' ? 'Video' : 'Artículo';
              
              // Determinar color de puntito basado en tipo (puedes ajustar esta lógica)
              const colorPunto = pub.tipo_publicacion === 'VIDEO' ? 'bg-violet-600' : 'bg-[#256b3c]';
              
              // Formatear la fecha
              const fechaObj = new Date(pub.fecha_publicacion);
              const opcionesFecha = { day: 'numeric', month: 'long', year: 'numeric' };
              const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opcionesFecha);

              // Estimación de tiempo de lectura (aprox 200 palabras por minuto)
              const palabras = pub.contenido_texto ? pub.contenido_texto.split(' ').length : 0;
              const minutosLectura = Math.max(1, Math.ceil(palabras / 200));
              const tiempoLectura = pub.tipo_publicacion === 'VIDEO' ? 'Ver Video' : `${minutosLectura} min`;

              return {
                ...pub,
                categoria: categoriaVisual,
                tiempoLectura: tiempoLectura,
                descripcion: pub.contenido_texto ? pub.contenido_texto.substring(0, 150) + '...' : '',
                fecha: fechaFormateada,
                imagen: pub.url_media || '/placeholder-image.jpg',
                colorPunto: colorPunto
              };
            });
            
          setPublicaciones(activas);
        }
      } catch (err) {
        console.error('Error al cargar publicaciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, []);

  // Extraer las categorías únicas de los datos reales (o tipos)
  const categoriasUnicas = [...new Set(publicaciones.map(p => p.categoria))];
  
  const categorias = [
    { nombre: "Todos los temas", cantidad: `${publicaciones.length} pub.`, colorPunto: "bg-gray-400" },
    ...categoriasUnicas.map(cat => {
      const cantidad = publicaciones.filter(p => p.categoria === cat).length;
      return {
        nombre: cat,
        cantidad: `${cantidad} pub.`,
        colorPunto: cat === 'Video' ? 'bg-violet-600' : 'bg-[#256b3c]'
      };
    })
  ];

  const articulosFiltrados = filtroActivo === 'Todos los temas' 
    ? publicaciones 
    : publicaciones.filter(art => art.categoria === filtroActivo);

  const articuloDestacado = publicaciones.length > 0 ? publicaciones[0] : null; // Tomamos el más reciente
  const articulosRestantes = publicaciones.length > 1 ? articulosFiltrados.filter(a => a.id !== articuloDestacado?.id) : articulosFiltrados;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-raleway bg-white">
        <div className="w-10 h-10 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      
      <section className="w-full pt-20 md:pt-28 bg-[#F9F6F0] relative overflow-hidden z-10">
        <div className="max-w-[1050px] mx-auto px-6 text-center pb-8 md:pb-12 relative z-20">
          <span className="text-[#A68A61] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 block font-raleway">
            Blog Médico
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E4B34] mb-6 leading-tight font-raleway">
            Noticias Semanales
          </h1>
          <p className="text-[#6b7280] text-[15px] md:text-[17px] leading-relaxed max-w-2xl mx-auto font-raleway">
            Salud explicada de forma simple, directa y científica. Lee nuestros últimos artículos y mantente informado sobre metabolismo, nutrición y bienestar integral.
          </p>
        </div>
        <div className="w-full overflow-hidden leading-none z-0 relative">
          <svg viewBox="0 0 1440 120" className="block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <main className="flex-grow pt-10 pb-20 bg-white">
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">

          {articuloDestacado && (
            <div className="mb-12 md:mb-16 group cursor-pointer animate-fadeIn">
              <span className="text-[#8a9096] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase block mb-4 font-raleway">
                Destacado de la semana
              </span>
              <Link to={`/noticias/${articuloDestacado.id}`} className="flex flex-col lg:flex-row bg-[#F9F6F0] rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-black/5">
                
                <div className="w-full lg:w-3/5 lg:order-2 aspect-[16/9] lg:aspect-auto overflow-hidden bg-[#efe8d8] relative">
                  {articuloDestacado.tipo_publicacion === 'VIDEO' ? (
                     <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                        <span className="text-white text-6xl opacity-80 group-hover:opacity-100 transition-opacity">▶</span>
                     </div>
                  ) : (
                    <img 
                      src={articuloDestacado.imagen} 
                      alt={articuloDestacado.titulo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500/efe8d8/256b3c?text=Noticia+Destacada' }}
                    />
                  )}
                </div>

                <div className="w-full lg:w-2/5 lg:order-1 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${articuloDestacado.colorPunto}`}></span>
                      <span className="text-[#256b3c] font-bold text-[12px] md:text-[13px] font-raleway uppercase tracking-wider">{articuloDestacado.categoria}</span>
                    </div>
                    <span className="text-[#8a9096] text-[12px] md:text-[13px] font-raleway">{articuloDestacado.tiempoLectura}</span>
                  </div>
                  
                  <h2 className="text-[24px] md:text-[32px] font-bold text-[#1e3325] mb-4 leading-snug group-hover:text-[#256b3c] transition-colors font-raleway">
                    {articuloDestacado.titulo}
                  </h2>
                  <p className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed mb-8 font-raleway">
                    {articuloDestacado.descripcion}
                  </p>
                  <span className="text-[#8a9096] text-[13px] font-raleway font-medium mt-auto">{articuloDestacado.fecha}</span>
                </div>
              </Link>
            </div>
          )}

          <div className="mb-10 overflow-x-auto hide-scrollbar pb-2">
            <div className="flex flex-nowrap md:flex-wrap gap-3 w-max md:w-auto">
              {categorias.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setFiltroActivo(cat.nombre)}
                  className={`border rounded-full px-5 py-2.5 shadow-sm transition-all duration-300 flex items-center gap-2 group whitespace-nowrap font-raleway
                    ${filtroActivo === cat.nombre 
                      ? 'bg-[#1e3325] border-[#1e3325] text-white' 
                      : 'bg-[#F9F6F0] border-black/5 hover:border-[#1e3325]/30 text-[#1e3325]'
                    }`}
                >
                  <span className={`w-2 h-2 rounded-full ${filtroActivo === cat.nombre ? 'bg-white' : cat.colorPunto}`}></span>
                  <span className="font-bold text-[13px] font-raleway">{cat.nombre}</span>
                  <span className={`text-[12px] font-raleway ml-1 ${filtroActivo === cat.nombre ? 'text-white/80' : 'text-[#8a9096]'}`}>
                    {cat.cantidad}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-8">
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-[22px] md:text-[28px] font-bold text-[#1e3325] font-raleway">
                  {filtroActivo === 'Todos los temas' ? 'Lo más reciente' : `Publicaciones de ${filtroActivo}`}
                </h3>
              </div>

              {articulosRestantes.length === 0 ? (
                <p className="text-[#6b7280] font-raleway py-10">No se encontraron más artículos para esta categoría.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articulosRestantes.map((articulo) => (
                    <Link 
                      key={articulo.id} 
                      to={`/noticias/${articulo.id}`}
                      className="bg-white rounded-[20px] overflow-hidden group cursor-pointer flex flex-col h-full border border-black/10 hover:border-[#256b3c]/40 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                    >
                      <div className="w-full aspect-[4/3] overflow-hidden bg-[#efe8d8] relative">
                         {articulo.tipo_publicacion === 'VIDEO' ? (
                           <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 group-hover:scale-105 transition-transform duration-700">
                             <span className="text-white text-5xl opacity-80 group-hover:opacity-100 transition-opacity">▶</span>
                           </div>
                         ) : (
                          <img 
                            src={articulo.imagen} 
                            alt={articulo.titulo}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/efe8d8/256b3c?text=Noticia' }}
                          />
                         )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow bg-white">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`w-1.5 h-1.5 rounded-full ${articulo.colorPunto}`}></span>
                            <span className="text-[#256b3c] font-bold text-[11px] font-raleway uppercase tracking-wider">{articulo.categoria}</span>
                          </div>
                          <span className="text-[#8a9096] text-[11px] shrink-0 font-raleway">· {articulo.tiempoLectura}</span>
                        </div>
                        <h4 className="text-[18px] font-bold text-[#1e3325] leading-snug mb-2 group-hover:text-[#256b3c] transition-colors font-raleway">
                          {articulo.titulo}
                        </h4>
                        <p className="text-[#6b7280] text-[13px] leading-relaxed mb-6 flex-grow font-raleway line-clamp-2">
                          {articulo.descripcion}
                        </p>
                        <span className="text-[#8a9096] text-[11px] font-raleway mt-auto">{articulo.fecha}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              
              <div className="bg-[#1e3325] rounded-[24px] p-6 shadow-md font-raleway">
                <h4 className="text-[#a3b18a] font-bold text-[10px] tracking-[0.2em] uppercase mb-3 font-raleway">
                  Boletín Semanal
                </h4>
                <h3 className="text-white text-[22px] md:text-[24px] font-bold mb-3 leading-tight font-raleway">
                  Suscríbete para recibir el contenido que más te importa.
                </h3>
                <p className="text-[13px] font-raleway text-white mb-6 leading-relaxed">
                  Cada semana te enviaremos información médica clara, actualizada y directa a tu correo. Tú controlas lo que quieres leer.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="tu@correo.com" 
                    className="w-full bg-white text-[#1e3325] rounded-xl px-4 py-3.5 text-[14px] font-raleway focus:outline-none focus:ring-2 focus:ring-[#256b3c]"
                  />
                  <button className="w-full bg-[#256b3c] hover:bg-[#1a4a2a] text-white rounded-xl py-3.5 font-bold font-raleway transition-colors shadow-sm">
                    Suscribirme gratis
                  </button>
                </form>
                <p className="text-[10px] text-white/70 mt-4 text-center font-raleway">
                  Pronto configuraremos tu bandeja. Sin spam, baja en un clic.
                </p>
              </div>

              <div className="bg-white border border-black/10 rounded-[24px] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[#256b3c]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  <span className="text-[#256b3c] font-bold text-[11px] uppercase tracking-[0.1em] font-raleway">Resolver Dudas</span>
                </div>
                <p className="font-bold text-[18px] text-[#1e3325] mb-4 leading-snug font-raleway">
                  ¿Tienes dudas sobre tu tratamiento o quieres reservar?
                </p>
                <a 
                  href="https://wa.me/51981009863?text=Hola,%20tengo%20una%20duda%20sobre%20los%20tratamientos%20y%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n,%20por%20favor." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-center w-full bg-[#256b3c] hover:bg-[#1a4a2a] text-white rounded-xl py-3.5 font-bold font-raleway transition-colors shadow-sm"
                >
                  Abrir WhatsApp →
                </a>
              </div>

            </div>
          </div>

        </div>
      </main>

      <style>{`
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <Footer />
    </div>
  );
};

export default NoticiasPage;