import React from 'react';
import Footer from '../components/Footer';

const ContactoPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-raleway">
      
      {/* === HEADER DE LA PÁGINA === */}
      <section className="bg-[#F9F6F0] pt-20 pb-24 md:pt-28 md:pb-32 px-6 lg:px-8 text-center relative overflow-hidden z-10">
        <div className="max-w-3xl mx-auto relative z-20">
          <span className="text-[#a68a61] font-bold text-[11px] md:text-[13px] tracking-[0.25em] uppercase mb-4 block font-raleway">
            Contacto
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3325] mb-6 leading-tight font-raleway">
            Estamos aquí <br className="md:hidden"/> para ayudarte
          </h1>
          <p className="text-[#6b7280] text-[16px] md:text-[18px] font-medium leading-relaxed font-raleway">
            Resuelve tus dudas, agenda una cita o visítanos. Nuestro equipo médico está listo para acompañarte en tu proceso de salud metabólica.
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
        <div className="max-w-[1250px] mx-auto px-6 lg:px-8">

          {/* GRID DE 3 TARJETAS PERFECTAMENTE CENTRADAS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-5xl mx-auto">
            
            {/* Tarjeta 1: Dirección */}
            <div className="group bg-[#F9F6F0] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 flex flex-col items-center text-center border border-black/5 hover:bg-[#2E4B34] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-5 shadow-sm text-[#2E4B34] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <h3 className="text-[#1e3325] group-hover:text-white font-bold text-[12px] sm:text-[15px] tracking-widest uppercase mb-2 sm:mb-3 font-raleway transition-colors duration-300">Dirección</h3>
              <p className="text-[#6b7280] group-hover:text-white/90 text-[11px] sm:text-[14px] leading-relaxed font-raleway transition-colors duration-300">
                Av. Brasil 2730<br />
                Pueblo Libre
              </p>
            </div>

            {/* Tarjeta 2: Teléfono */}
            <div className="group bg-[#F9F6F0] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 flex flex-col items-center text-center border border-black/5 hover:bg-[#2E4B34] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-5 shadow-sm text-[#2E4B34] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <h3 className="text-[#1e3325] group-hover:text-white font-bold text-[12px] sm:text-[15px] tracking-widest uppercase mb-2 sm:mb-3 font-raleway transition-colors duration-300">Teléfono</h3>
              <p className="text-[#6b7280] group-hover:text-white/90 text-[11px] sm:text-[14px] leading-relaxed font-raleway transition-colors duration-300">
                +51 981 009 863<br />
                Vía WhatsApp
              </p>
            </div>

            {/* Tarjeta 3: Horario */}
            <div className="group bg-[#F9F6F0] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 flex flex-col items-center text-center border border-black/5 hover:bg-[#2E4B34] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center mb-4 sm:mb-5 shadow-sm text-[#2E4B34] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-[#1e3325] group-hover:text-white font-bold text-[12px] sm:text-[15px] tracking-widest uppercase mb-2 sm:mb-3 font-raleway transition-colors duration-300">Horario</h3>
              <p className="text-[#6b7280] group-hover:text-white/90 text-[11px] sm:text-[14px] leading-relaxed font-raleway transition-colors duration-300">
                Lun - Vie: 9am-8pm<br />
                Sáb: 9am-8pm
              </p>
            </div>
          </div>

          {/* BANNER COMUNIDAD */}
          <div className="bg-[#F9F6F0] rounded-[32px] p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between mb-16 border border-black/5">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-[#1e3325] font-bold text-[18px] md:text-[22px] tracking-wide mb-2 font-raleway">
                ÚNETE A NUESTRA COMUNIDAD
              </h2>
              <p className="text-[#6b7280] text-[15px] font-raleway">
                Descubre tips, casos reales y novedades para cuidar tu metabolismo.
              </p>
            </div>
            
            <div className="flex gap-4">
              
              {/* WhatsApp Icon */}
              <a 
                href="https://wa.me/51981009863" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp" 
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#2E4B34] hover:bg-[#2E4B34] hover:text-white transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>

              {/* IG Icon (Enlace de Orbital Salud) */}
              <a 
                href="https://www.instagram.com/orbitalsalud?mdxt=MWhnNHd6c3kzYTVvYw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#2E4B34] hover:bg-[#2E4B34] hover:text-white transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>

              {/* TikTok Icon (Enlace de Dra Caycho) */}
              <a 
                href="https://www.tiktok.com/@angelicacaycho.endocrino?_r=1&_t=ZS-9AYPuH3Vvym" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok" 
                className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#2E4B34] hover:bg-[#2E4B34] hover:text-white transition-colors shadow-sm"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.27-1.15 4.14-2.91 5.37-1.76 1.24-4 1.64-6.02 1.09-2.02-.54-3.66-2-4.52-3.87-.86-1.87-.8-4.08.15-5.9 1.04-2.01 3.12-3.37 5.37-3.53.05-1.39.01-2.79.03-4.18-3.41.35-6.39 2.59-7.53 5.81-1.14 3.21-.31 6.88 2.11 9.4 2.42 2.51 6.19 3.51 9.53 2.53 3.33-.97 5.76-3.79 6.25-7.2.06-.42.06-.85.06-1.28.01-4.8.01-9.59.01-14.39-1.74-.01-3.48-.01-5.22-.02z"/></svg>
              </a>

            </div>
          </div>

          {/* MAPA A PANTALLA COMPLETA EN SU CONTENEDOR */}
          <div className="w-full h-[450px] lg:h-[550px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-black/5 relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.73711903673!2d-77.06587932398418!3d-12.061596742825656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c906de3c9f27%3A0x3344d32cfdcf8369!2sAv.%20Brasil%202730%2C%20Pueblo%20Libre%2015083!5e0!3m2!1ses-419!2spe!4v1716335123456!5m2!1ses-419!2spe" 
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" 
              className="grayscale-[0.2] contrast-125 transition-all duration-500 group-hover:grayscale-0" title="Ubicación Orbital Salud">
            </iframe>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactoPage;