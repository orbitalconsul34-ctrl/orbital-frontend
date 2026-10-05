import React from 'react';
import Footer from '../components/Footer';

const NosotrosPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      
      {/* === HEADER DE LA PÁGINA === */}
      <section className="bg-[#F9F6F0] pt-20 pb-24 md:pt-28 md:pb-32 px-6 lg:px-8 text-center relative overflow-hidden z-10">
        <div className="max-w-3xl mx-auto relative z-20">
          <span className="text-[#a68a61] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 block font-raleway">
            Nuestra Clínica
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3325] mb-6 leading-tight font-raleway">
            Conoce nuestra <br className="md:hidden"/> historia
          </h1>
          <p className="text-[#6b7280] text-[16px] md:text-[18px] font-medium leading-relaxed font-raleway">
            Somos más que un centro médico; somos un equipo multidisciplinario dedicado a sanar tu metabolismo desde la raíz.
          </p>
        </div>
        
        {/* === ONDA INFERIOR === */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1440 120" className="block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none">
            <path 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" 
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* === CONTENIDO PRINCIPAL === */}
      <main className="flex-grow pt-12 pb-20 md:pb-32 relative z-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

          {/* === SECCIÓN: NUESTRO ENFOQUE === */}
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-24 md:mb-32">
            <div className="w-full md:w-1/2 relative group">
              {/* === ALTURA REDUCIDA AQUÍ PARA HACERLO MÁS HORIZONTAL === */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg h-[250px] md:h-[320px] lg:h-[380px] bg-[#F9F6F0]">
                <img 
                  src="/nosotros.png" 
                  alt="Equipo Médico Orbital Salud" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80" }}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <span className="text-[#256b3c] font-bold text-[12px] tracking-[0.2em] uppercase mb-4 block font-raleway">
                El enfoque Orbital
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3325] mb-6 leading-tight font-raleway">
                Tratamos la causa, no solo los síntomas.
              </h2>
              <div className="space-y-6">
                <p lang="es" className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed font-raleway text-justify hyphens-auto">
                  En la medicina tradicional, los pacientes suelen pasar de una consulta a otra sin encontrar una respuesta integral a sus problemas de peso, fatiga o alteraciones en la piel. Orbital Salud nació con un propósito claro: transformar la manera en que entendemos y cuidamos nuestra salud, con una visión integral que va más allá de los síntomas.
                </p>
                <p lang="es" className="text-[#6b7280] text-[15px] md:text-[16px] leading-relaxed font-raleway text-justify hyphens-auto">
                  Entendemos que tu cuerpo es un ecosistema interconectado. Por eso, nuestros especialistas no trabajan aislados, sino que colaboran en equipo para diseñar un plan integral que devuelva el balance a tu metabolismo de forma sostenida y saludable.
                </p>
              </div>
            </div>
          </div>

          {/* === SECCIÓN: MISIÓN Y VISIÓN === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-24 md:mb-32">
            
            {/* Misión */}
            <div className="bg-[#F9F6F0] rounded-[32px] p-8 md:p-12 border border-black/5 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm text-[#256b3c]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="text-[#1e3325] font-bold text-[22px] mb-4 font-raleway">Nuestra Misión</h3>
              <p lang="es" className="text-[#6b7280] text-[15px] leading-relaxed font-raleway text-justify hyphens-auto">
                Transformar la vida de nuestros pacientes brindando diagnósticos médicos precisos y tratamientos integrales. Educamos, acompañamos y tratamos la salud metabólica desde una perspectiva multidisciplinaria, basada siempre en la ciencia y la evidencia médica.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-[#1e3325] rounded-[32px] p-8 md:p-12 border border-black/5 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-6 text-[#A68A61]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <h3 className="text-white font-bold text-[22px] mb-4 font-raleway">Nuestra Visión</h3>
              <p lang="es" className="text-white/80 text-[15px] leading-relaxed font-raleway text-justify hyphens-auto">
                Ser el centro clínico de referencia líder a nivel nacional en el abordaje integral de la salud endocrinológica, nutricional y dermatológica, destacando por nuestra calidez humana, tecnología de vanguardia y resultados reales y sostenibles en el tiempo.
              </p>
            </div>

          </div>

          {/* === SECCIÓN: NUESTROS VALORES === */}
          <div className="text-center mb-16">
            <span className="text-[#a68a61] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 block font-raleway">
              Nuestros Pilares
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3325] font-raleway">
              Valores que nos definen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Valor 1 */}
            <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#256b3c]"></span>
                <h4 className="text-[16px] font-bold text-[#1e3325] uppercase font-raleway">Ética Médica</h4>
              </div>
              <p lang="es" className="text-[#6b7280] text-[14px] leading-relaxed font-raleway text-justify hyphens-auto">
                Actuamos con total honestidad y rigor científico. Cada diagnóstico y recomendación está pensado estrictamente en el beneficio y la salud del paciente.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#256b3c]"></span>
                <h4 className="text-[16px] font-bold text-[#1e3325] uppercase font-raleway">Empatía</h4>
              </div>
              <p lang="es" className="text-[#6b7280] text-[14px] leading-relaxed font-raleway text-justify hyphens-auto">
                Escuchamos tu historia sin juzgar. Comprendemos que cada proceso de salud es único, brindándote un trato cálido y humanizado en todo momento.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#256b3c]"></span>
                <h4 className="text-[16px] font-bold text-[#1e3325] uppercase font-raleway">Trabajo en Equipo</h4>
              </div>
              <p lang="es" className="text-[#6b7280] text-[14px] leading-relaxed font-raleway text-justify hyphens-auto">
                Creemos que la medicina fragmentada no funciona. Nuestros especialistas se comunican constantemente para asegurar que tu tratamiento sea coherente.
              </p>
            </div>

            {/* Valor 4 */}
            <div className="bg-white rounded-[24px] p-8 border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#256b3c]"></span>
                <h4 className="text-[16px] font-bold text-[#1e3325] uppercase font-raleway">Excelencia</h4>
              </div>
              <p lang="es" className="text-[#6b7280] text-[14px] leading-relaxed font-raleway text-justify hyphens-auto">
                Buscamos la mejora continua mediante la constante actualización médica, permitiéndonos ofrecerte las opciones de tratamiento más innovadoras y seguras.
              </p>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NosotrosPage;
