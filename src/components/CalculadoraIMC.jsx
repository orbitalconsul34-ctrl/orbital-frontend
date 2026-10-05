import React, { useState } from 'react';

const CalculadoraIMC = () => {
  const [peso, setPeso] = useState('');
  const [talla, setTalla] = useState('');
  const [imcResult, setImcResult] = useState(null);

  const calcularImc = (e) => {
    e.preventDefault();
    const p = parseFloat(peso);
    const t = parseFloat(talla) / 100;

    if (p > 0 && t > 0) {
      const imc = (p / (t * t)).toFixed(1);
      let categoria = '';
      let mensaje = '';
      let colorClass = '';

      if (imc < 18.5) {
        categoria = 'Bajo peso';
        mensaje = 'Tu IMC indica bajo peso. Una evaluación metabólica te ayudará a mejorar tu nutrición y masa muscular de forma saludable.';
        colorClass = 'text-[#D9C8B1]'; 
      } else if (imc >= 18.5 && imc < 25) {
        categoria = 'Peso normal';
        mensaje = 'Tu IMC está en rango saludable. Aun así, una evaluación metabólica te da claridad sobre tu grasa, músculo y hormonas — no todo se ve en la balanza.';
        colorClass = 'text-[#D9C8B1]';
      } else if (imc >= 25 && imc < 30) {
        categoria = 'Sobrepeso';
        mensaje = 'Tu IMC indica sobrepeso. Es el momento ideal para evaluar tu metabolismo y composición corporal real con InBody antes de cualquier plan.';
        colorClass = 'text-[#eab308]';
      } else {
        categoria = 'Obesidad';
        mensaje = 'Tu IMC indica obesidad. Un programa metabólico integral te ayudará a tratar la causa de fondo y mejorar tu salud de forma sostenible y segura.';
        colorClass = 'text-[#ef4444]';
      }

      setImcResult({ valor: imc, categoria, mensaje, colorClass });
    }
  };

  // Función para enviar los resultados por WhatsApp
  const agendarConResultados = (e) => {
    e.preventDefault();
    if (!imcResult) return;
    
    // Construir el mensaje con los datos del usuario
    const mensajeWhatsApp = `Hola, vengo desde la página web de Orbital Salud. 
Me gustaría agendar una evaluación de mi metabolismo. 
Estos son los resultados de mi calculadora web:
- *Peso:* ${peso} kg
- *Talla:* ${talla} cm
- *Mi IMC es:* ${imcResult.valor} (${imcResult.categoria})`;

    // Reemplaza los saltos de línea por codificación URL (%0A)
    const url = `https://wa.me/51981009863?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    window.open(url, '_blank');
  };

  return (
    <section id="calculadora" className="w-full bg-white font-raleway pt-16 flex flex-col">
      
      {/* =========================================================
          CONTENEDOR DE LA TARJETA (Con MUCHO margen inferior para separarlo de la onda)
          ========================================================= */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 w-full mb-24 md:mb-32">
        <div className="bg-[#2e4b34] rounded-[28px] px-6 py-6 md:px-10 md:py-7 shadow-2xl border border-white/5">
          <div>
            
            <h2 className="font-raleway text-[24px] md:text-[28px] font-bold mb-2 leading-tight text-white">
              ¿Eres candidato/a para nuestro <span className="font-raleway italic text-[#D9C8B1] font-normal">programa de peso?</span>
            </h2>
            
            <p className="font-raleway text-[12px] md:text-[13px] mb-5 leading-relaxed max-w-4xl text-white opacity-85">
              Calcula tu IMC como primer paso. Es solo referencial — la evaluación real la hace la especialista, midiendo también tu composición corporal con InBody.
            </p>

            <form onSubmit={calcularImc} className="flex flex-col sm:flex-row items-end gap-4">
              <div className="w-full sm:w-48">
                <label className="font-raleway block text-[11px] font-bold text-white/70 mb-1">Peso (kg)</label>
                <input 
                  type="number" 
                  value={peso} 
                  onChange={(e) => setPeso(e.target.value)}
                  className="font-raleway w-full bg-[#243c29] border border-white/20 rounded-xl px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#D9C8B1] transition-colors placeholder:text-white/30"
                  placeholder="Ej. 78"
                  required
                />
              </div>
              <div className="w-full sm:w-48">
                <label className="font-raleway block text-[11px] font-bold text-white/70 mb-1">Talla (cm)</label>
                <input 
                  type="number" 
                  value={talla} 
                  onChange={(e) => setTalla(e.target.value)}
                  className="font-raleway w-full bg-[#243c29] border border-white/20 rounded-xl px-3 py-2.5 text-white text-[14px] outline-none focus:border-[#D9C8B1] transition-colors placeholder:text-white/30"
                  placeholder="Ej. 165"
                  required
                />
              </div>
              <button type="submit" className="font-raleway w-full sm:w-auto bg-[#256b3c] border border-white/15 text-white font-bold text-[14px] px-6 py-2.5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-[#1f5a33] active:translate-y-[1px] transition-all">
                Calcular mi IMC
              </button>
            </form>

            {imcResult && (
              <div className="border border-white/20 rounded-[18px] p-5 md:p-6 animate-fadeIn bg-[#243c29]/50 mt-5">
                <span className={`font-raleway text-[36px] font-bold block mb-0.5 leading-none ${imcResult.colorClass}`}>
                  {imcResult.valor}
                </span>
                <span className="font-raleway font-bold text-[15px] block mb-2 text-white">
                  {imcResult.categoria}
                </span>
                <p className="font-raleway text-[13px] leading-relaxed mb-4 max-w-3xl text-white opacity-90">
                  {imcResult.mensaje}
                </p>
                
                {/* BOTÓN ACTUALIZADO PARA ENVIAR A WHATSAPP */}
                <button 
                  onClick={agendarConResultados} 
                  className="font-raleway inline-flex items-center gap-2 bg-white text-[#2e4b34] font-bold text-[13px] px-5 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.45 3.37 1.23 4.8L2 22l5.35-1.19A9.952 9.952 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.3 14.15c-.23.63-1.32 1.22-1.83 1.3-.51.08-1.18.25-3.32-.64-2.57-1.07-4.22-3.67-4.35-3.84-.13-.17-1.04-1.38-1.04-2.63 0-1.25.65-1.87.89-2.12.23-.25.51-.31.68-.31.17 0 .34 0 .49.01.16.01.37-.06.57.42.21.51.72 1.77.79 1.9.06.13.11.28.02.45-.08.17-.13.28-.25.42-.13.15-.27.32-.38.45-.11.15-.24.31-.1.55.13.23.6 1.01 1.29 1.63.9.8 1.67 1.04 1.9 1.16.23.11.37.09.51-.06.15-.17.65-.75.82-1.01.17-.25.34-.21.55-.13.21.08 1.34.63 1.57.75.23.11.38.17.44.27.06.11.06.63-.17 1.26z"></path></svg>
                  Agenda tu evaluación
                </button>
                
                <p className="font-raleway text-[11px] text-white/60 italic mt-4 border-t border-white/10 pt-3">
                  El IMC no distingue grasa de músculo. Por eso en Orbital medimos tu composición corporal real con InBody antes de cualquier plan.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>      
    </section>
  );
};

export default CalculadoraIMC;