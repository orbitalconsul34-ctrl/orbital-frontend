import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

const NoticiaDetalle = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relacionadas, setRelacionadas] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    const fetchNoticia = async () => {
      try {
        // Traemos todas las publicaciones desde tu base de datos real
        const response = await fetch(`${API_BASE_URL}/api/publicaciones`);
        if (response.ok) {
          const data = await response.json();
          // Filtramos solo las que están en estado ACTIVO
          const activas = data.filter(p => p.estado === 'ACTIVO');
          
          const noticiaId = parseInt(id);
          const noticiaEncontrada = activas.find(p => p.id === noticiaId);
          
          if (noticiaEncontrada) {
            setNoticia(noticiaEncontrada);
            
            // Noticias relacionadas (obtiene otras 3 publicaciones al azar/recientes)
            setRelacionadas(activas.filter(p => p.id !== noticiaId).slice(0, 3));
          }
        }
      } catch (err) {
        console.error('Error cargando la noticia:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  // Función mágica para extraer el ID de YouTube si es un video
  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-raleway bg-white">
        <div className="w-10 h-10 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!noticia) return (
    <div className="min-h-screen flex flex-col justify-center items-center font-raleway bg-white gap-4">
      <h2 className="text-2xl font-bold text-slate-800">Publicación no encontrada</h2>
      <Link to="/blog" className="text-[#256b3c] font-bold hover:underline">Volver a las noticias</Link>
    </div>
  );

  const isVideo = noticia.tipo_publicacion === 'VIDEO';
  const youtubeId = isVideo ? getYoutubeId(noticia.url_media) : null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      <main className="flex-grow max-w-[900px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 animate-fadeIn">
        
        {/* Migas de pan (Navegación) */}
        <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-[#8a9096] mb-8 font-raleway">
          <Link to="/" className="hover:text-[#256b3c] transition-colors">Inicio</Link>
          <span>/</span>
          {/* Ajusta este "/blog" según cómo se llame tu ruta de la lista de noticias */}
          <Link to="/blog" className="hover:text-[#256b3c] transition-colors">Noticias</Link> 
          <span>/</span>
          <span className="text-[#256b3c] line-clamp-1">{noticia.titulo}</span>
        </div>

        {/* Encabezado del Artículo */}
        <div className="mb-8 text-center">
          <span className="text-[#a3b18a] font-bold text-[11px] md:text-[13px] tracking-[0.2em] uppercase block mb-4 font-raleway">
            {isVideo ? '▶️ VIDEO INFORMATIVO' : '📝 ARTÍCULO MÉDICO'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1e3325] leading-tight mb-6 font-raleway">
            {noticia.titulo}
          </h1>
          <div className="text-[#8a9096] text-[13px] font-medium font-raleway">
            Publicado el: {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Renderizado de Media (Video de Youtube o Imagen de Cloudinary) */}
        <div className="mb-10 rounded-[32px] overflow-hidden shadow-sm border border-black/5 bg-[#F9F6F0]">
          {isVideo && youtubeId ? (
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                src={`https://www.youtube.com/embed/${youtubeId}`} 
                title={noticia.titulo}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            noticia.url_media && (
              <img 
                src={noticia.url_media} 
                alt={noticia.titulo}
                className="w-full h-auto max-h-[500px] object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )
          )}
        </div>

        {/* Contenido (separando por saltos de línea para hacer párrafos perfectos) */}
        <div className="prose prose-lg max-w-none text-[#4b5563] text-[16px] md:text-[18px] leading-relaxed font-raleway">
          {noticia.contenido_texto.split('\n').map((parrafo, idx) => (
            parrafo.trim() !== '' && <p key={idx} className="mb-6">{parrafo}</p>
          ))}
        </div>

      </main>

      {/* SECCIÓN: Noticias Relacionadas */}
      {relacionadas.length > 0 && (
        <section className="w-full py-16 bg-[#F9F6F0] border-t border-black/5">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h3 className="text-[28px] font-bold text-[#1e3325] font-raleway">Más Publicaciones</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relacionadas.map((rel) => {
                const relYoutubeId = rel.tipo_publicacion === 'VIDEO' ? getYoutubeId(rel.url_media) : null;
                return (
                  <Link key={rel.id} to={`/noticia/${rel.id}`} className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-black/5 group">
                    {rel.url_media && (
                      <div className="h-48 overflow-hidden bg-slate-100 relative">
                        {rel.tipo_publicacion === 'VIDEO' && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-rose-600 pl-1 text-xl shadow-lg">▶</div>
                          </div>
                        )}
                        <img 
                          src={relYoutubeId ? `https://img.youtube.com/vi/${relYoutubeId}/hqdefault.jpg` : rel.url_media} 
                          alt={rel.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-[#a3b18a] text-[10px] font-bold tracking-widest uppercase block mb-2 font-raleway">
                        {rel.tipo_publicacion === 'VIDEO' ? 'VIDEO' : 'ARTÍCULO'}
                      </span>
                      <h4 className="font-bold text-[#1e3325] text-[16px] leading-snug line-clamp-2 mb-3">
                        {rel.titulo}
                      </h4>
                      <span className="text-[#8a9096] text-[12px] font-medium font-raleway">
                        {new Date(rel.fecha_publicacion).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default NoticiaDetalle;