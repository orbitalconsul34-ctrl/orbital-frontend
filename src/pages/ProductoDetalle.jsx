import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para calcular el descuento
  const calcularDescuento = (precioActual, precioAnterior) => {
    if (precioAnterior && precioAnterior > precioActual) {
      return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
    }
    return 0;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    const fetchDetalle = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/productos`);
        if (response.ok) {
          const data = await response.json();
          
          // Mapeamos los datos, asegurándonos de convertir los precios a números
          const activos = data
            .filter(p => p.estado === 'ACTIVO')
            .map(p => ({
              ...p,
              precio: Number(p.precio),
              precio_antes: p.precio_antes ? Number(p.precio_antes) : null,
              categoria: p.marca || '',
              imagen: p.url_imagen_cloudinary || '',
              descripcionLarga: p.descripcion,
              beneficios: p.beneficios ? p.beneficios.split('\n').filter(b => b.trim() !== '') : [],
              presentacion: p.presentacion || 'Presentación estándar'
            }));

          const prodId = parseInt(id);
          const prodEncontrado = activos.find(p => p.id === prodId);

          if (prodEncontrado) {
            setProducto(prodEncontrado);

            // Artículos relacionados (misma especialidad o categoría)
            const filtrados = activos
              .filter(p => (p.especialidad === prodEncontrado.especialidad || p.categoria === prodEncontrado.categoria) && p.id !== prodEncontrado.id)
              .slice(0, 3); 
            
            setRelacionados(filtrados);
          }
        }
      } catch (err) {
        console.error('Error cargando el producto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetalle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center font-raleway bg-white">
        <div className="w-10 h-10 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!producto) return (
    <div className="min-h-screen flex flex-col justify-center items-center font-raleway bg-white gap-4">
      <h2 className="text-2xl font-bold text-slate-800">Producto no encontrado</h2>
      <Link to="/productos" className="text-[#256b3c] font-bold hover:underline">Volver a la tienda</Link>
    </div>
  );

  const descuentoPrincipal = calcularDescuento(producto.precio, producto.precio_antes);

  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      <main className="flex-grow max-w-[1250px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16">
        
        {/* MIGAS DE PAN */}
        <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-[#8a9096] mb-8 lg:mb-10 font-raleway">
          <Link to="/" className="hover:text-[#256b3c] transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-[#256b3c] transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-[#256b3c]">{producto.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* LADO IZQUIERDO: IMAGEN DEL PRODUCTO (0 SOMBRAS, 0 FONDO) */}
          <div className="bg-transparent p-4 md:p-8 flex items-center justify-center relative animate-fadeIn">
            
            {/* ETIQUETA DE DESCUENTO FLOTANTE */}
            {descuentoPrincipal > 0 && (
              <div className="absolute top-4 left-4 bg-[#ff4d4f] text-white font-bold px-4 py-1.5 rounded-full text-[14px] z-20 shadow-md">
                -{descuentoPrincipal}% OFF
              </div>
            )}

            {producto.stock === 0 && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-[36px]">
                <span className="bg-red-500 text-white font-bold px-6 py-2 rounded-full text-[14px] transform -rotate-12 shadow-lg tracking-widest uppercase">
                  Agotado Temporalmente
                </span>
              </div>
            )}
            
            {/* IMAGEN TOTALMENTE LIMPIA */}
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className={`w-full max-w-[350px] md:max-w-[450px] h-auto object-contain transition-transform duration-700 hover:scale-105 ${producto.stock === 0 ? 'opacity-50' : ''}`}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x500/FFFFFF/2E4B34?text=Sin+Imagen" }}
            />
          </div>

          {/* LADO DERECHO: DETALLES DEL PRODUCTO */}
          <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="mb-6 border-b border-gray-100 pb-6">
              <span className="text-[#a3b18a] font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase block mb-3 font-raleway">
                {producto.categoria} · {producto.especialidad}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1e3325] leading-tight mb-4 font-raleway">
                {producto.nombre}
              </h1>
              
              {/* PRECIOS */}
              <div className="flex flex-col mb-2">
                {producto.precio_antes && producto.precio_antes > producto.precio && (
                  <span className="text-[16px] md:text-[18px] text-slate-400 line-through font-semibold mb-1">
                    S/ {producto.precio_antes.toFixed(2)}
                  </span>
                )}
                <span className="font-bold text-[36px] md:text-[42px] text-[#1e3325] font-raleway leading-none">
                  S/ {producto.precio.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed mb-8 font-raleway whitespace-pre-line">
              {producto.descripcionLarga}
            </p>

            {producto.beneficios.length > 0 && (
              <div className="bg-[#f8faf7] rounded-[24px] p-6 mb-8 border border-[#256b3c]/10">
                <h4 className="font-bold text-[#1e3325] mb-4 text-[15px] font-raleway">Beneficios principales:</h4>
                <ul className="space-y-3">
                  {producto.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[14px] text-[#4b5563] leading-snug font-raleway">
                      <span className="text-[#256b3c] font-bold text-[16px] shrink-0 mt-0.5">✓</span> 
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-2 mb-8 text-[13px] font-bold text-[#8a9096] font-raleway">
              <svg className="w-5 h-5 text-[#256b3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              Presentación: <span className="text-[#1e3325]">{producto.presentacion}</span>
            </div>

            {/* BOTÓN Y ETIQUETA INFERIOR */}
            <div className="flex flex-col gap-3 mt-auto">
              <button
                onClick={() => agregarAlCarrito(producto)}
                disabled={producto.stock === 0}
                className={`w-full py-4 md:py-5 rounded-full font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-3 font-raleway
                  ${producto.stock > 0
                    ? 'bg-[#1e3325] hover:bg-[#256b3c] text-white hover:shadow-lg hover:-translate-y-1'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                {producto.stock > 0 ? 'Agregar al carrito' : 'Agotado por el momento'}
              </button>
              
              <div className="text-center">
                <span className="text-[#8a9096] text-[11px] md:text-[12px] font-bold font-raleway uppercase tracking-wider">
                  {producto.indicacion || 'Venta libre'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 text-[#8a9096] text-[12px] font-raleway font-medium">
              <span>🚚</span> Envíos a todo Lima y provincias vía Shalom
            </div>
          </div>
        </div>
      </main>

      {/* =========================================
          PRODUCTOS RELACIONADOS (CON NUEVO DISEÑO)
          ========================================= */}
      {relacionados.length > 0 && (
        <section className="w-full py-16 md:py-20 bg-[#F9F6F0] border-t border-black/5 relative z-10">
          <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-[#A68A61] font-bold text-[11px] tracking-[0.2em] uppercase mb-2 block font-raleway">
                Recomendados
              </span>
              <h3 className="text-[28px] md:text-[34px] font-bold text-[#1e3325] font-raleway leading-tight">
                Productos Relacionados
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relacionados.map((rel) => {
                const descuentoRel = calcularDescuento(rel.precio, rel.precio_antes);
                return (
                  <div 
                    key={rel.id} 
                    className="bg-white rounded-[32px] p-5 md:p-7 flex flex-col h-full 
                               border border-[#256b3c]/20 shadow-sm 
                               transition-all duration-300 group/card 
                               hover:-translate-y-2 hover:border-[#256b3c]/50 hover:shadow-[0_15px_30px_-10px_rgba(37,107,60,0.15)]"
                  >
                    <Link to={`/producto/${rel.id}`} className="block relative cursor-pointer flex-grow flex flex-col">
                      
                      {/* IMAGEN SIN FONDO Y SIN SOMBRA */}
                      <div className="bg-transparent mb-4 flex justify-center items-center relative h-[200px] md:h-[280px]">
                        {descuentoRel > 0 && (
                          <div className="absolute top-0 left-0 bg-[#ff4d4f] text-white font-bold px-3 py-1.5 rounded-full text-[12px] z-20 shadow-md">
                            -{descuentoRel}% OFF
                          </div>
                        )}
                        {rel.stock === 0 && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
                            <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-[11px] transform -rotate-12 font-raleway shadow-md">Agotado</span>
                          </div>
                        )}
                        <img 
                          src={rel.imagen} 
                          alt={rel.nombre} 
                          className={`h-full w-full object-contain transition-transform duration-500 ${rel.stock > 0 ? 'group-hover/card:scale-105' : 'opacity-60'}`}
                          onError={(e) => { e.target.src = "https://via.placeholder.com/200x200/FFFFFF/2E4B34?text=Sin+Imagen" }}
                        />
                      </div>

                      <div className="flex-grow flex flex-col">
                        <h3 className="font-bold text-[#1e3325] text-[16px] md:text-[19px] leading-tight mb-1.5 font-raleway group-hover/card:text-[#256b3c] transition-colors">
                          {rel.nombre}
                        </h3>
                        <span className="text-[#a3b18a] text-[10px] md:text-[11px] font-bold tracking-widest uppercase block mb-3 font-raleway">
                          {rel.categoria || rel.especialidad}
                        </span>
                        <p className="text-[#6b7280] text-[11px] md:text-[13px] leading-snug line-clamp-3 mb-4 font-raleway">
                          {rel.descripcionLarga}
                        </p>
                      </div>
                    </Link>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <div className="mb-4">
                        <div className="flex flex-col">
                          {rel.precio_antes && rel.precio_antes > rel.precio && (
                            <span className="text-[13px] md:text-[14px] text-slate-400 line-through font-semibold mb-0.5">
                              S/ {rel.precio_antes.toFixed(2)}
                            </span>
                          )}
                          <span className="font-bold text-[24px] md:text-[28px] text-[#1e3325] font-raleway leading-none whitespace-nowrap">
                            S/ {rel.precio.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => agregarAlCarrito(rel)}
                        disabled={rel.stock === 0}
                        className={`w-full font-bold text-[13px] md:text-[15px] py-3.5 md:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-raleway shadow-sm mb-3
                          ${rel.stock > 0
                            ? 'bg-[#1e3325] text-white hover:bg-[#256b3c] hover:shadow-lg hover:-translate-y-0.5'
                            : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                          }`}
                      >
                        + Agregar al carrito
                      </button>

                      <div className="text-center">
                        <span className="text-[#8a9096] text-[10px] md:text-[11px] font-bold font-raleway uppercase tracking-wider">
                          {rel.indicacion || 'Venta libre'}
                        </span>
                      </div>
                    </div>
                  </div>
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

export default ProductoDetalle;