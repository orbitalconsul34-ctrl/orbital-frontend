import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// === CONFIGURACIÓN DE LA RUTA API ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
// ====================================

const ProductosPage = () => {
  const { agregarAlCarrito } = useCart();
  
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recomendados");
  const [categoriasActivas, setCategoriasActivas] = useState([]);
  const [especialidadesActivas, setEspecialidadesActivas] = useState([]);
  
  const [bottomSheetActivo, setBottomSheetActivo] = useState(null);
  
  const [maxPrecioReal, setMaxPrecioReal] = useState(1000);
  const [precioFiltro, setPrecioFiltro] = useState(1000);

  const aliados = [
    "expert (1).png", "imaginesmedicas.png", "comercio.jpg", "antaria.png", "apre.png",
    "intermedica.png", "saludTools.png", "vanttive.png"
  ];

  // === CARGA DINÁMICA DESDE EL BACKEND ===
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/productos`);
        if (response.ok) {
          const data = await response.json();
          const activos = data
            .filter(p => p.estado === 'ACTIVO')
            .map(p => ({
              ...p,
              precio: Number(p.precio),
              precio_antes: p.precio_antes ? Number(p.precio_antes) : null,
              categoria: p.marca || '', 
              imagen: p.url_imagen_cloudinary || ''
            }));

          setProductos(activos);
          
          if (activos.length > 0) {
            const maxP = Math.max(...activos.map(p => p.precio));
            setMaxPrecioReal(maxP);
            setPrecioFiltro(maxP);
          }
        } else {
          setError('Error al cargar productos');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
        setError('Error de conexión con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria).filter(c => c !== ''))];
  const especialidadesUnicas = [...new Set(productos.map(p => p.especialidad).filter(e => e !== ''))];

  const toggleFiltro = (valor, tipo) => {
    if (tipo === 'categoria') {
      setCategoriasActivas(prev => prev.includes(valor) ? prev.filter(c => c !== valor) : [...prev, valor]);
    } else {
      setEspecialidadesActivas(prev => prev.includes(valor) ? prev.filter(e => e !== valor) : [...prev, valor]);
    }
  };

  const limpiarFiltros = () => {
    setCategoriasActivas([]);
    setEspecialidadesActivas([]);
    setPrecioFiltro(maxPrecioReal);
    setSearchTerm("");
    setBottomSheetActivo(null);
  };

  const calcularDescuento = (precioActual, precioAnterior) => {
    if (precioAnterior && precioAnterior > precioActual) {
      return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
    }
    return 0;
  };

  let productosProcesados = productos.filter(p => {
    const textoBuscado = searchTerm.toLowerCase();
    const matchTexto =
      p.nombre.toLowerCase().includes(textoBuscado) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(textoBuscado));
    
    const matchCategoria = categoriasActivas.length === 0 || categoriasActivas.includes(p.categoria);
    const matchEspecialidad = especialidadesActivas.length === 0 || especialidadesActivas.includes(p.especialidad);
    const matchPrecio = p.precio <= precioFiltro;

    return matchTexto && matchCategoria && matchEspecialidad && matchPrecio;
  });

  if (sortBy === 'menor-precio') {
    productosProcesados.sort((a, b) => a.precio - b.precio);
  } else if (sortBy === 'mayor-precio') {
    productosProcesados.sort((a, b) => b.precio - a.precio);
  }

  const filtrosActivosCount = categoriasActivas.length + especialidadesActivas.length + (precioFiltro < maxPrecioReal ? 1 : 0);

  return (
    <div className="min-h-screen bg-white font-raleway flex flex-col relative z-10 pb-[70px] lg:pb-0">
      
      <section className="w-full pt-20 md:pt-28 bg-[#F9F6F0] relative overflow-hidden z-10">
        <div className="max-w-[1050px] mx-auto px-6 text-center pb-8 md:pb-12 relative z-20">
          <span className="text-[#A68A61] font-bold text-[11px] md:text-[13px] tracking-[0.2em] uppercase mb-4 block font-raleway">
            Tienda Virtual — Orbital Salud
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[54px] font-raleway font-bold text-[#1e3325] mb-6 leading-tight">
            Suplementos <span className="text-[#256b3c] italic">Orbital Salud</span>
          </h1>
          <p className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed max-w-3xl mx-auto font-raleway">
            Fórmulas magistrales bajo indicación médica, formuladas en exclusiva para Orbital Salud. Arma tu pedido, revisa el total y coordina el pago — sin medicamentos.
          </p>
          <div className="inline-flex items-center justify-center gap-2 bg-white border border-black/5 px-6 py-2.5 mt-8 rounded-full text-[12px] md:text-[13px] font-bold text-[#1e3325] shadow-sm font-raleway text-center leading-snug">
            <span>🚚 Entrega a domicilio en Lima y envíos a provincia por Shalom · Pago vía Yape o transferencia</span>
          </div>
        </div>
        <div className="w-full overflow-hidden leading-none z-0 relative">
          <svg viewBox="0 0 1440 120" className="block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <div className="flex-grow relative flex flex-col z-20 bg-white">
        <main className="flex-grow max-w-[1250px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-16 relative z-10">

          <div className="flex flex-col items-center mb-8 gap-4">
            <div className="relative w-full max-w-[500px]">
              <input type="text" placeholder="Buscar producto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3.5 rounded-full border border-gray-200 bg-[#F9F6F0] focus:outline-none focus:border-[#256b3c] focus:ring-1 focus:ring-[#256b3c] text-[#1e3325] text-sm shadow-sm transition-all font-raleway" />
              <svg className="w-5 h-5 absolute left-5 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-24 bg-[#F9F6F0] p-6 rounded-[32px] border border-black/5 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#1e3325] font-raleway">Filtrar por</h3>
                  {filtrosActivosCount > 0 && <button onClick={limpiarFiltros} className="text-[12px] text-red-500 font-bold hover:underline font-raleway">Limpiar</button>}
                </div>

                <div className="mb-8 border-b border-black/5 pb-6">
                  <h4 className="text-[12px] font-bold text-[#8a9096] mb-4 uppercase tracking-wider font-raleway">Precio Máximo</h4>
                  <input type="range" min="0" max={maxPrecioReal} value={precioFiltro} onChange={(e) => setPrecioFiltro(Number(e.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[#256b3c]"/>
                  <div className="flex justify-between text-xs font-bold text-[#1e3325] mt-3 font-raleway">
                    <span>S/ 0</span>
                    <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-black/5">S/ {precioFiltro.toFixed(0)}</span>
                  </div>
                </div>
                
                {especialidadesUnicas.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-[12px] font-bold text-[#8a9096] mb-4 uppercase tracking-wider font-raleway">Especialidad</h4>
                    <ul className="space-y-3 font-raleway">
                      {especialidadesUnicas.map((esp, idx) => (
                        <li key={`esp-${idx}`} className="flex items-center justify-between cursor-pointer group" onClick={() => toggleFiltro(esp, 'especialidad')}>
                          <span className={`text-[13px] transition-colors ${especialidadesActivas.includes(esp) ? 'text-[#256b3c] font-bold' : 'text-[#6b7280] group-hover:text-[#1e3325]'}`}>{esp}</span>
                          <input type="checkbox" checked={especialidadesActivas.includes(esp)} readOnly className="w-4 h-4 rounded border-gray-300 accent-[#256b3c]" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {categoriasUnicas.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-[12px] font-bold text-[#8a9096] mb-4 uppercase tracking-wider font-raleway">Categoría</h4>
                    <ul className="space-y-3 font-raleway">
                      {categoriasUnicas.map((cat, idx) => (
                        <li key={`cat-${idx}`} className="flex items-center justify-between cursor-pointer group" onClick={() => toggleFiltro(cat, 'categoria')}>
                          <span className={`text-[13px] transition-colors ${categoriasActivas.includes(cat) ? 'text-[#256b3c] font-bold' : 'text-[#6b7280] group-hover:text-[#1e3325]'}`}>{cat}</span>
                          <input type="checkbox" checked={categoriasActivas.includes(cat)} readOnly className="w-4 h-4 rounded border-gray-300 accent-[#256b3c]" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>

            <div className="flex-grow">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#6b7280] text-[13px] font-medium font-raleway">{productosProcesados.length} productos encontrados</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 rounded-full border border-black/5 bg-[#F9F6F0] text-[#1e3325] text-[13px] font-raleway focus:outline-none cursor-pointer shadow-sm font-bold">
                  <option value="recomendados">Ordenar por Recomendados</option>
                  <option value="menor-precio">Menor precio</option>
                  <option value="mayor-precio">Mayor precio</option>
                </select>
              </div>

              {loading && (
                <div className="flex justify-center items-center py-20">
                  <div className="w-8 h-8 border-4 border-[#256b3c] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {!loading && !error && productosProcesados.length === 0 && (
                <div className="text-center py-20 bg-[#F9F6F0] rounded-[32px] border border-black/5 shadow-sm">
                  <p className="text-lg font-bold text-[#1e3325] mb-2 font-raleway">No encontramos productos</p>
                  <p className="text-sm text-[#6b7280] font-raleway">Intenta ajustar tu búsqueda o limpiar los filtros.</p>
                  <button onClick={limpiarFiltros} className="mt-6 px-6 py-2.5 bg-[#1e3325] text-white text-sm font-bold rounded-full font-raleway hover:bg-[#256b3c] transition-colors">Limpiar filtros</button>
                </div>
              )}

              {/* === GRID DE PRODUCTOS === */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {!loading && !error && productosProcesados.map((prod) => {
                  const descuento = calcularDescuento(prod.precio, prod.precio_antes);
                  
                  return (
                    <div 
                      key={prod.id} 
                      className="bg-white rounded-[32px] p-5 md:p-7 flex flex-col h-full 
                                 border border-[#256b3c]/20 shadow-sm 
                                 transition-all duration-300 group/card 
                                 hover:-translate-y-2 hover:border-[#256b3c]/50 hover:shadow-[0_15px_30px_-10px_rgba(37,107,60,0.15)]"
                    >
                      <Link to={`/producto/${prod.id}`} className="block relative cursor-pointer flex-grow flex flex-col">
                        
                        <div className="bg-transparent mb-4 flex justify-center items-center relative h-[200px] md:h-[280px]">
                          
                          {descuento > 0 && (
                            <div className="absolute top-0 left-0 bg-[#ff4d4f] text-white font-bold px-3 py-1.5 rounded-full text-[12px] z-20 shadow-md">
                              -{descuento}% OFF
                            </div>
                          )}

                          {prod.stock === 0 && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
                              <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-[11px] transform -rotate-12 font-raleway shadow-md">
                                Agotado
                              </span>
                            </div>
                          )}

                          <img 
                            src={prod.imagen} 
                            alt={prod.nombre} 
                            className={`h-full w-full object-contain transition-transform duration-500 ${prod.stock > 0 ? 'group-hover/card:scale-105' : 'opacity-60'}`}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/200x200/FFFFFF/2E4B34?text=Sin+Imagen" }}
                          />
                        </div>

                        <div className="flex-grow flex flex-col">
                          <h3 className="font-bold text-[#1e3325] text-[16px] md:text-[19px] leading-tight mb-1.5 font-raleway group-hover/card:text-[#256b3c] transition-colors">
                            {prod.nombre}
                          </h3>
                          <span className="text-[#a3b18a] text-[10px] md:text-[11px] font-bold tracking-widest uppercase block mb-3 font-raleway">
                            {prod.categoria || prod.especialidad}
                          </span>
                          <p className="text-[#6b7280] text-[11px] md:text-[13px] leading-snug line-clamp-3 mb-4 font-raleway">
                            {prod.descripcion}
                          </p>
                        </div>
                      </Link>

                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="mb-4">
                          <div className="flex flex-col">
                            {prod.precio_antes && prod.precio_antes > prod.precio && (
                              <span className="text-[13px] md:text-[14px] text-slate-400 line-through font-semibold mb-0.5">
                                S/ {prod.precio_antes.toFixed(2)}
                              </span>
                            )}
                            <span className="font-bold text-[24px] md:text-[28px] text-[#1e3325] font-raleway leading-none whitespace-nowrap">
                              S/ {prod.precio.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => agregarAlCarrito(prod)}
                          disabled={prod.stock === 0}
                          className={`w-full font-bold text-[13px] md:text-[15px] py-3.5 md:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-raleway shadow-sm mb-3
                            ${prod.stock > 0
                              ? 'bg-[#1e3325] text-white hover:bg-[#256b3c] hover:shadow-lg hover:-translate-y-0.5'
                              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                            }`}
                        >
                          + Agregar al carrito
                        </button>
                        
                        <div className="text-center">
                          <span className="text-[#8a9096] text-[10px] md:text-[11px] font-bold font-raleway uppercase tracking-wider">
                            {prod.indicacion || 'Venta libre'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </main>

        <div className="text-center max-w-4xl mx-auto mb-16 px-6">
          <p className="text-[#8a9096] text-[12px] md:text-[13px] font-medium leading-relaxed font-raleway bg-[#F9F6F0] p-4 rounded-2xl border border-black/5">
            También contamos con Basestar (Vitamina D 25,000 y 50,000 UI), Myo Inositol/D-Chiro y Vitamina B12 — consulta disponibilidad con tu médico antes de agregarlos a tu pedido.
          </p>
        </div>

        {/* =========================================================================
            NUESTROS ALIADOS ESTRATÉGICOS (Misma magia del Home, sin huecos blancos)
            ========================================================================= */}
        <section className="py-12 border-t border-black/5 bg-white overflow-hidden flex flex-col items-center relative z-10">
          <h3 className="text-[#8a9096] font-bold text-[12px] tracking-[0.2em] uppercase mb-10 font-sans text-center relative z-10">
            Nuestros aliados estratégicos
          </h3>
          
          <div className="carousel-container relative w-full overflow-hidden flex z-10 mb-4">
            <style>
              {`
                @keyframes slide { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
                .animate-slide { animation: slide 40s linear infinite; }
                .carousel-container:hover .animate-slide { animation-play-state: paused; }
                @keyframes slideUpModal { from { transform: translateY(100%); } to { transform: translateY(0); } }
                .animate-slide-up-modal { animation: slideUpModal 0.3s ease-out forwards; }
              `}
            </style>
            
            {/* PISTA 1: w-max evita que deje huecos, pr-8/16 crea el puente exacto hacia la pista 2 */}
            <div className="flex animate-slide items-center shrink-0 w-max gap-8 md:gap-16 pr-8 md:pr-16">
              {[...aliados, ...aliados].map((logo, index) => (
                <img 
                  key={`logo-1-${index}`} 
                  src={`/${logo}`} 
                  alt={`Aliado ${index}`} 
                  className="h-10 md:h-12 w-auto max-w-none object-contain transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>

            {/* PISTA 2: El clon exacto que persigue a la Pista 1 */}
            <div className="flex animate-slide items-center shrink-0 w-max gap-8 md:gap-16 pr-8 md:pr-16">
              {[...aliados, ...aliados].map((logo, index) => (
                <img 
                  key={`logo-2-${index}`} 
                  src={`/${logo}`} 
                  alt={`Aliado clon ${index}`} 
                  className="h-10 md:h-12 w-auto max-w-none object-contain transition-transform duration-300 hover:scale-105"
                />
              ))}
            </div>

          </div>
        </section>
        {/* ========================================================================= */}

      </div>
      <Footer />

      {/* MENÚ MÓVIL (BOTTOM SHEET) */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-[60] flex justify-around items-center px-2 py-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] pb-safe">
        <button onClick={() => setBottomSheetActivo('categoria')} className={`flex flex-col items-center gap-1 w-1/3 transition-colors font-raleway ${bottomSheetActivo === 'categoria' || categoriasActivas.length > 0 ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h7" /></svg>
          <span className="text-[10px] font-bold">Categorías</span>
        </button>
        <button onClick={() => setBottomSheetActivo('especialidad')} className={`flex flex-col items-center gap-1 w-1/3 transition-colors font-raleway ${bottomSheetActivo === 'especialidad' || especialidadesActivas.length > 0 ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          <span className="text-[10px] font-bold">Especialidad</span>
        </button>
        <button onClick={() => setBottomSheetActivo('precio')} className={`flex flex-col items-center gap-1 w-1/3 transition-colors font-raleway ${bottomSheetActivo === 'precio' || precioFiltro < maxPrecioReal ? 'text-[#256b3c]' : 'text-[#8a9096]'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          <span className="text-[10px] font-bold">Precio</span>
        </button>
      </div>

      {bottomSheetActivo && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center lg:hidden">
          <div className="absolute inset-0 bg-[#1e3325]/40 backdrop-blur-sm transition-opacity" onClick={() => setBottomSheetActivo(null)}></div>
          <div className="bg-white w-full rounded-t-3xl p-6 relative z-10 max-h-[80vh] flex flex-col shadow-2xl animate-slide-up-modal font-raleway">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-[#1e3325] uppercase tracking-wide">
                {bottomSheetActivo === 'categoria' && 'Categorías'}
                {bottomSheetActivo === 'especialidad' && 'Especialidades'}
                {bottomSheetActivo === 'precio' && 'Rango de Precio'}
              </h3>
              <button onClick={() => setBottomSheetActivo(null)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-y-auto pb-6">
              {bottomSheetActivo === 'categoria' && categoriasUnicas.map(cat => (
                <button key={cat} onClick={() => { toggleFiltro(cat, 'categoria'); setBottomSheetActivo(null); }} className={`w-full text-left py-4 px-4 rounded-2xl transition-colors mb-2 ${categoriasActivas.includes(cat) ? 'bg-[#F9F6F0] text-[#256b3c] font-bold border border-[#256b3c]/20' : 'text-[#6b7280] bg-gray-50 hover:bg-gray-100'}`}>{cat}</button>
              ))}
              {bottomSheetActivo === 'especialidad' && especialidadesUnicas.map(esp => (
                <button key={esp} onClick={() => { toggleFiltro(esp, 'especialidad'); setBottomSheetActivo(null); }} className={`w-full text-left py-4 px-4 rounded-2xl transition-colors mb-2 ${especialidadesActivas.includes(esp) ? 'bg-[#F9F6F0] text-[#256b3c] font-bold border border-[#256b3c]/20' : 'text-[#6b7280] bg-gray-50 hover:bg-gray-100'}`}>{esp}</button>
              ))}
              {bottomSheetActivo === 'precio' && (
                <div className="flex flex-col gap-6 py-4 px-2">
                  <div className="flex justify-between items-center text-[#1e3325] font-bold text-lg">
                    <span>Hasta:</span>
                    <span className="bg-[#F9F6F0] px-4 py-1.5 rounded-full text-[#256b3c]">S/ {precioFiltro}</span>
                  </div>
                  <input type="range" min="0" max={maxPrecioReal} step="10" value={precioFiltro} onChange={(e) => setPrecioFiltro(Number(e.target.value))} className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#256b3c]" />
                  <button onClick={() => setBottomSheetActivo(null)} className="mt-8 w-full bg-[#1e3325] text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#256b3c] transition-colors shadow-md">Aplicar Precio</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductosPage;