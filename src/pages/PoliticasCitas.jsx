import React, { useEffect } from 'react';

const PoliticasCitas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#efe8d8] min-h-screen pt-32 pb-24 font-raleway selection:bg-[#256b3c] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="bg-white p-8 md:p-14 rounded-[2rem] shadow-sm border border-black/5">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3325] mb-4">Políticas de Citas</h1>
          <p className="text-[#8a9096] text-sm mb-10">Última actualización: Noviembre 2024</p>
          
          <div className="space-y-8 text-[#4b5563] text-[15.5px] leading-relaxed">
            
            <p>
              En <strong>Orbital Salud</strong> nos esforzamos por brindar una atención puntual y de excelencia a todos nuestros pacientes. Para garantizar el orden y el respeto por el tiempo de nuestros profesionales y pacientes, hemos establecido las siguientes políticas de citas:
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">1. Confirmación de Citas</h2>
              <p>
                Toda cita agendada de forma presencial, por llamada o vía WhatsApp requiere una confirmación previa. Nuestro equipo se comunicará con usted 24 horas antes de su cita para reconfirmar su asistencia. Si no logramos contactarlo y la cita no es confirmada, Orbital Salud se reserva el derecho de reasignar el horario.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">2. Puntualidad y Tolerancia</h2>
              <p>
                Solicitamos a nuestros pacientes llegar con <strong>10 minutos de anticipación</strong> a su cita para completar cualquier proceso administrativo (registro, triaje, etc.). 
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Existe un tiempo de <strong>tolerancia máximo de 15 minutos</strong> a partir de la hora programada.</li>
                <li>Si el paciente excede este tiempo de tolerancia, la atención estará sujeta a la disponibilidad del médico, pudiendo acortarse el tiempo de consulta o reprogramarse para no afectar a los pacientes siguientes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">3. Cancelaciones y Reprogramaciones</h2>
              <p>
                Entendemos que pueden surgir imprevistos. Si necesita cancelar o reprogramar su cita, le solicitamos hacerlo con un mínimo de <strong>24 horas de anticipación</strong>. 
                Las cancelaciones con menos de 24 horas de aviso o las ausencias sin notificación (No-Show) podrían estar sujetas a penalidades para futuras reservas o a la pérdida del pago anticipado de la consulta.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">4. Modalidad de Teleconsultas</h2>
              <p>
                Para las citas virtuales, el enlace de conexión será enviado por WhatsApp o correo electrónico una vez confirmado el pago. Se aplicarán los mismos criterios de tolerancia de 15 minutos. Si el paciente experimenta fallas técnicas prolongadas, se ofrecerá la opción de reprogramar la cita por única vez.
              </p>
            </div>

            <div className="bg-[#f4f5f3] p-6 rounded-2xl mt-10 border-l-4 border-[#256b3c]">
              <p className="text-[#1e3325] font-bold">¿Necesitas cancelar o reprogramar una cita urgente?</p>
              <p className="mt-1 text-sm">Comunícate inmediatamente con nuestro equipo de atención al <a href="https://wa.me/51981009863" className="text-[#256b3c] font-bold underline">WhatsApp 981 009 863</a>.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PoliticasCitas;