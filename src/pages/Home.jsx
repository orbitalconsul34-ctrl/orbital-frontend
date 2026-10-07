import { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import ResultadosReales from '../components/ResultadosReales';
import CalculadoraIMC from '../components/CalculadoraIMC';
import MetodoOrbital from '../components/MetodoOrbital';
import EnfoqueIntegral from '../components/EnfoqueIntegral';
import Testimonios from '../components/Testimonios';
import DiferenciaOrbital from '../components/DiferenciaOrbital';
import Planes from '../components/Planes';
import FAQ from '../components/FAQ';
import HorarioAtencion from '../components/HorarioAtencion'; // NUEVO NOMBRE IMPORTADO
import Footer from '../components/Footer';

const Home = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [planes, setPlanes] = useState([]);
  const [loadingPlanes, setLoadingPlanes] = useState(true);
  const [errorPlanes, setErrorPlanes] = useState('');

  const aliados = [
    "expert (1).png", "imaginesmedicas.png", "comercio.jpg" , "antaria.png" , "apre.png" ,
    "intermedica.png", "saludTools.png", "vanttive.png"
  ];

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/publicaciones');
        const activas = response.data.filter(pub => pub.estado === 'ACTIVO');
        setPublicaciones(activas);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar las publicaciones');
        setLoading(false);
      }
    };
    fetchPublicaciones();
  }, []);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/paquetes');
        const activos = response.data.filter(plan => plan.estado === 'ACTIVO');
        setPlanes(activos);
        setLoadingPlanes(false);
      } catch (err) {
        console.error(err);
        setErrorPlanes('Error al cargar los planes');
        setLoadingPlanes(false);
      }
    };
    fetchPlanes();
  }, []);

  return (
    <div className="font-raleway min-h-screen flex flex-col bg-white relative">
      
      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-slide {
            animation: slide 40s linear infinite; 
          }
          .carousel-container:hover .animate-slide {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Fondo con brillo sutil */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none w-full max-w-[780px] h-[640px] bg-[radial-gradient(circle_at_74%_34%,_#EFE8D8_0%,_rgba(239,232,216,0.55)_36%,_rgba(239,232,216,0)_70%)]"></div>

      <main className="flex-grow relative z-10 font-raleway">
        
        {/* === ORDEN DE COMPONENTES === */}
        <Hero />
        <Stats />
        <ResultadosReales />
        <CalculadoraIMC />
        <MetodoOrbital />
        <EnfoqueIntegral />
        <Testimonios />
        <DiferenciaOrbital />
        <Planes />

        {/* Sección de Aliados Estratégicos */}
        <section className="pt-12 pb-20 md:pb-28 bg-white overflow-hidden flex flex-col items-center relative z-10">
          <h3 className="text-[#8a9096] font-bold text-[12px] tracking-[0.2em] uppercase mb-10 font-sans text-center relative z-10">
            Nuestros aliados estratégicos
          </h3>
          
          <div className="carousel-container relative w-full overflow-hidden flex z-10 mb-4">
            
            {/* PISTA 1: w-max evita que deje huecos, pr-8/16 crea el puente exacto hacia la pista 2 */}
            <div className="flex animate-slide items-center shrink-0 w-max gap-8 md:gap-16 pr-8 md:pr-16">
              {/* Duplicamos los aliados aquí adentro para garantizar que llene monitores 4K sin romperse */}
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

          {/* =========================================
              ONDA INFERIOR (Volteada)
              ========================================= */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
            <svg 
              viewBox="0 0 1440 80" 
              preserveAspectRatio="none" 
              className="w-full h-[40px] md:h-[70px] block -scale-y-100"
            >
              <path d="M0,0 L1440,0 L1440,40 C1000,80 400,10 0,50 Z" fill="#FFFFFF" />
              <path d="M0,50 C400,10 1000,80 1440,40" fill="none" stroke="#5c6e4e" strokeWidth="10" opacity="0.9" />
              <path d="M0,40 C450,80 950,20 1440,50" fill="none" stroke="#8b9a7b" strokeWidth="5" opacity="0.9" />
            </svg>
          </div>
          
        </section>

        {/* Sección de Preguntas Frecuentes (Acordeón) */}
        <FAQ />

        {/* Sección de Horarios de Atención */}
        <HorarioAtencion />

      </main>
      <Footer />
    </div>
  );
};

export default Home;