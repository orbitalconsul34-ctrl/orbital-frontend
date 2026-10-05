import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const ProductoDetalle = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);

  // === DATOS SIMULADOS IDÉNTICOS A PRODUCTOS PAGE ===
  const todosLosProductos = [
    {
      id: 1,
      nombre: "MetaSlim Berb",
      categoria: "BERBERINA 500MG",
      especialidad: "Endocrinología",
      descripcion: "Fórmula orientada al apoyo del metabolismo glucémico y lipídico; contribuye a mejorar la sensibilidad a la insulina. 60 cápsulas.",
      descripcionLarga: "Fórmula magistral orientada al apoyo del metabolismo glucémico y lipídico. La Berberina ha demostrado clínicamente contribuir a mejorar la sensibilidad a la insulina, ayudando a estabilizar los niveles de glucosa en sangre tras las comidas. Especialmente formulada para pacientes bajo seguimiento endocrinológico.",
      beneficios: [
        "Mejora la sensibilidad a la insulina",
        "Apoya el control del colesterol y triglicéridos",
        "Regula los niveles de glucosa en sangre",
        "Favorece el metabolismo lipídico"
      ],
      precio: 140,
      stock: 50,
      imagen: "/metaslim.png",
      presentacion: "Frasco con 60 cápsulas (Uso para 1 a 2 meses)"
    },
    {
      id: 2,
      nombre: "Ashwa Balance",
      categoria: "ASHWAGANDHA",
      especialidad: "Bienestar",
      descripcion: "Apoya el equilibrio neuroendocrino y metabólico; contribuye a moderar los efectos del estrés. 30 cápsulas.",
      descripcionLarga: "Adaptógeno natural que apoya el equilibrio neuroendocrino y metabólico. Ayuda al cuerpo a moderar y gestionar mejor las respuestas biológicas frente al estrés crónico, reduciendo los niveles de cortisol circulante que suelen estar vinculados a la retención de grasa abdominal.",
      beneficios: [
        "Reduce los niveles de cortisol (hormona del estrés)",
        "Mejora la calidad del sueño y el descanso profundo",
        "Apoya la función tiroidea saludable",
        "Reduce los antojos por ansiedad"
      ],
      precio: 99,
      stock: 50,
      imagen: "/ashwa.png",
      presentacion: "Frasco con 30 cápsulas"
    },
    {
      id: 3,
      nombre: "MagBio Active",
      categoria: "BISGLICINATO DE MAGNESIO",
      especialidad: "Nutrición",
      descripcion: "Apoya el sistema nervioso y favorece la relajación neuromuscular y un descanso más reparador. 30 cápsulas.",
      descripcionLarga: "El magnesio más biodisponible y suave para el estómago. Esta forma quelada de magnesio atraviesa fácilmente la barrera intestinal, apoyando directamente al sistema nervioso. Favorece una profunda relajación neuromuscular, siendo ideal para tomar por la noche y lograr un descanso verdaderamente reparador.",
      beneficios: [
        "Alta absorción sin causar molestias digestivas",
        "Favorece la relajación muscular profunda",
        "Ayuda a combatir el insomnio y mejorar el descanso",
        "Participa en más de 300 reacciones enzimáticas"
      ],
      precio: 79,
      stock: 50,
      imagen: "/magbio.png",
      presentacion: "Frasco con 30 cápsulas"
    },
    {
      id: 4,
      nombre: "Zenthera Zinc",
      categoria: "BISGLICINATO DE ZINC",
      especialidad: "Dermatología",
      descripcion: "Apoya el sistema inmunológico y la salud tiroidea; favorece la salud de piel, cabello y uñas. 30 cápsulas.",
      descripcionLarga: "Mineral esencial clave para la inmunidad y el equilibrio hormonal. Participa activamente en el metabolismo de las hormonas tiroideas y es fundamental para el tratamiento de problemas dermatológicos como acné adulto, caída de cabello y uñas frágiles causadas por desórdenes metabólicos.",
      beneficios: [
        "Fortalece el sistema inmunológico",
        "Mejora la cicatrización y salud de la piel",
        "Frena la caída del cabello de origen hormonal",
        "Apoya el metabolismo de las hormonas tiroideas"
      ],
      precio: 69,
      stock: 0, // Simulamos agotado
      imagen: "/zenthera.png",
      presentacion: "Frasco con 30 cápsulas"
    },
    {
      id: 5,
      nombre: "MagCitra Balance",
      categoria: "CITRATO DE MAGNESIO",
      especialidad: "Gastroenterología",
      descripcion: "Favorece la relajación mental y el bienestar digestivo. Contenido de 300 gr.",
      descripcionLarga: "Fórmula en polvo de rápida asimilación. El citrato de magnesio no solo ayuda a la relajación mental y muscular, sino que atrae agua a los intestinos, promoviendo el tránsito intestinal saludable y previniendo el estreñimiento, un síntoma muy común en alteraciones tiroideas.",
      beneficios: [
        "Regula el tránsito intestinal de forma suave y natural",
        "Disminuye los calambres musculares",
        "Fácil dosificación y rápida absorción en polvo",
        "Alivia dolores de cabeza tensionales"
      ],
      precio: 59,
      stock: 50,
      imagen: "/magcitra.png",
      presentacion: "Pote en polvo de 300 gr."
    },
    {
      id: 6,
      nombre: "Hemo Power",
      categoria: "HIERRO POLIMALTOSADO",
      especialidad: "Hematología",
      descripcion: "Ayuda a prevenir y tratar la anemia; contribuye a la formación normal de glóbulos rojos y hemoglobina. 30 cápsulas.",
      descripcionLarga: "Suplemento de hierro de nueva generación diseñado para no causar irritación gástrica ni estreñimiento. Esencial para el transporte de oxígeno celular, ayuda a prevenir y tratar la anemia ferropénica, combatiendo la fatiga crónica y mejorando los niveles de energía diarios.",
      beneficios: [
        "Excelente tolerancia gástrica (no estriñe)",
        "Eleva los niveles de hemoglobina y ferritina",
        "Combate el cansancio y la fatiga crónica",
        "Previene la caída de cabello por deficiencia de hierro"
      ],
      precio: 60,
      stock: 50,
      imagen: "/hemopower.png",
      presentacion: "Frasco con 30 cápsulas"
    }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);

    setTimeout(() => {
      const prodId = parseInt(id);
      const prodEncontrado = todosLosProductos.find(p => p.id === prodId) || todosLosProductos[0];
      setProducto(prodEncontrado);

      // Artículos relacionados: misma especialidad o categoría, max 3 para la grilla
      const filtrados = todosLosProductos
        .filter(p => (p.especialidad === prodEncontrado.especialidad || p.categoria === prodEncontrado.categoria) && p.id !== prodEncontrado.id)
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

  if (!producto) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      
      {/* SE CORRIGIÓ EL PADDING TOP: De pt-20 a pt-6 para que no quede muy abajo del navbar */}
      <main className="flex-grow max-w-[1250px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16">
        
        {/* Migas de pan */}
        <div className="flex items-center gap-2 text-[12px] md:text-[13px] font-bold text-[#8a9096] mb-8 lg:mb-10 font-raleway">
          <Link to="/" className="hover:text-[#256b3c] transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-[#256b3c] transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-[#256b3c]">{producto.nombre}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* LADO IZQUIERDO: Imagen */}
          <div className="bg-[#F9F6F0] rounded-[36px] p-8 md:p-16 flex items-center justify-center relative shadow-sm border border-black/5 animate-fadeIn">
            {producto.stock === 0 && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-[36px]">
                <span className="bg-red-500 text-white font-bold px-6 py-2 rounded-full text-[14px] transform -rotate-12 shadow-lg tracking-widest uppercase">
                  Agotado Temporalmente
                </span>
              </div>
            )}
            <img 
              src={producto.imagen} 
              alt={producto.nombre}
              className={`w-full max-w-[350px] h-auto object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-700 hover:scale-105 ${producto.stock === 0 ? 'opacity-50' : ''}`}
              onError={(e) => { e.target.src = "https://via.placeholder.com/400x500/FFFFFF/2E4B34?text=Sin+Imagen" }}
            />
          </div>

          {/* LADO DERECHO: Detalles e Info */}
          <div className="flex flex-col animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            
            <div className="mb-6 border-b border-gray-100 pb-6">
              <span className="text-[#a3b18a] font-bold text-[11px] md:text-[12px] tracking-[0.2em] uppercase block mb-3 font-raleway">
                {producto.categoria} · {producto.especialidad}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1e3325] leading-tight mb-4 font-raleway">
                {producto.nombre}
              </h1>
              
              <div className="flex items-center gap-4">
                <span className="font-bold text-[28px] md:text-[34px] text-[#256b3c] font-raleway">
                  S/ {producto.precio.toFixed(2)}
                </span>
                <span className="bg-[#F9F6F0] text-[#8a9096] text-[11px] md:text-[12px] px-3 py-1.5 rounded-full font-bold border border-black/5 font-raleway">
                  Bajo indicación médica
                </span>
              </div>
            </div>

            <p className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed mb-8 font-raleway">
              {producto.descripcionLarga}
            </p>

            {/* Lista de Beneficios */}
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

            <div className="flex items-center gap-2 mb-8 text-[13px] font-bold text-[#8a9096] font-raleway">
              <svg className="w-5 h-5 text-[#256b3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              Presentación: <span className="text-[#1e3325]">{producto.presentacion}</span>
            </div>

            {/* BOTÓN AGREGAR AL CARRITO */}
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

            {/* Nota de envío */}
            <div className="flex items-center justify-center gap-2 mt-6 text-[#8a9096] text-[12px] font-raleway font-medium">
              <span>🚚</span> Envíos a todo Lima y provincias vía Shalom
            </div>

          </div>
        </div>
      </main>

      {/* =========================================
          PRODUCTOS RELACIONADOS (CON DISEÑO DE TIENDA)
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

            {/* GRILLA EXACTA A LA DE PRODUCTOS PAGE */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {relacionados.map((prod) => (
                <div key={prod.id} className="bg-[#ffffff] rounded-[32px] p-4 md:p-6 shadow-sm border border-black/5 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group/card">
                  
                  <Link to={`/producto/${prod.id}`} className="block relative cursor-pointer flex-grow flex flex-col">
                    <div className="bg-[#F9F6F0] rounded-2xl p-4 mb-5 flex justify-center items-center relative h-[160px] md:h-[220px] shadow-sm border border-black/5">
                      {prod.stock === 0 && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-2xl">
                          <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-[11px] transform -rotate-12 font-raleway">Agotado</span>
                        </div>
                      )}
                      <img 
                        src={prod.imagen} 
                        alt={prod.nombre} 
                        className={`h-full object-contain mix-blend-multiply drop-shadow-md transition-transform duration-500 ${prod.stock > 0 ? 'group-hover/card:scale-110' : 'opacity-60'}`}
                        onError={(e) => { e.target.src = "https://via.placeholder.com/200x200/FFFFFF/2E4B34?text=Sin+Imagen" }}
                      />
                    </div>

                    <div className="flex-grow flex flex-col">
                      <h3 className="font-bold text-[#1e3325] text-[15px] md:text-[18px] leading-tight mb-1.5 font-raleway group-hover/card:text-[#256b3c] transition-colors">
                        {prod.nombre}
                      </h3>
                      <span className="text-[#a3b18a] text-[9px] md:text-[10px] font-bold tracking-widest uppercase block mb-3 font-raleway">
                        {prod.categoria || prod.especialidad}
                      </span>
                      <p className="text-[#6b7280] text-[11px] md:text-[13px] leading-snug line-clamp-3 mb-4 font-raleway">
                        {prod.descripcion}
                      </p>
                    </div>
                  </Link>

                  <div className="mt-auto">
                    <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-5 gap-2">
                      <span className="font-bold text-[18px] md:text-[22px] text-[#1e3325] font-raleway">
                        S/ {prod.precio.toFixed(0)}
                      </span>
                      <span className="bg-[#F9F6F0] text-[#8a9096] text-[9px] md:text-[10px] px-2.5 md:px-3 py-1.5 rounded-full font-bold border border-black/5 font-raleway">
                        Bajo indicación médica
                      </span>
                    </div>
                    
                    {/* Botón de agregar al carrito de la sección relacionados */}
                    <button
                      onClick={() => agregarAlCarrito(prod)}
                      disabled={prod.stock === 0}
                      className={`w-full font-bold text-[12px] md:text-[14px] py-3.5 md:py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-raleway shadow-sm
                        ${prod.stock > 0
                          ? 'bg-[#1e3325] text-white hover:bg-[#256b3c] hover:shadow-md'
                          : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                        }`}
                    >
                      + Agregar al carrito
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      <Footer />
      
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
};

export default ProductoDetalle;