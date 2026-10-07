import React, { useEffect } from 'react';

const PoliticaPrivacidad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#efe8d8] min-h-screen pt-32 pb-24 font-raleway selection:bg-[#256b3c] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="bg-white p-8 md:p-14 rounded-[2rem] shadow-sm border border-black/5">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3325] mb-4">Política de Privacidad</h1>
          <p className="text-[#8a9096] text-sm mb-10">Conforme a la Ley N° 29733 (Ley de Protección de Datos Personales del Perú)</p>
          
          <div className="space-y-8 text-[#4b5563] text-[15.5px] leading-relaxed">
            
            <p>
              En <strong>Orbital Salud</strong> estamos profundamente comprometidos con la protección y confidencialidad de la información personal e historial médico de nuestros pacientes. Esta política explica cómo recopilamos, utilizamos y protegemos sus datos.
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">1. Recopilación de Datos Personales</h2>
              <p>
                Recopilamos información personal cuando usted nos contacta a través de nuestro sitio web, WhatsApp, llamadas telefónicas o al llenar formularios presenciales en nuestra clínica. Esta información puede incluir:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nombres y apellidos.</li>
                <li>Documento de Identidad (DNI, CE, Pasaporte).</li>
                <li>Número de teléfono y correo electrónico.</li>
                <li>Antecedentes médicos e historial clínico (solo mediante canales seguros y en consulta).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">2. Uso de la Información</h2>
              <p>Los datos recopilados serán utilizados de manera estrictamente confidencial para los siguientes fines:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Agendamiento, confirmación y recordatorio de citas médicas.</li>
                <li>Apertura y actualización de historias clínicas (físicas o electrónicas).</li>
                <li>Emisión de comprobantes de pago (boletas o facturas).</li>
                <li>Envío de resultados de laboratorio o recetas médicas.</li>
                <li>Solo si usted lo autoriza explícitamente, envío de promociones o información relevante sobre nuestros servicios.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">3. Confidencialidad y Seguridad Médica</h2>
              <p>
                La información relacionada con su estado de salud (historia clínica, diagnósticos, fotos clínicas) es tratada con la máxima sensibilidad y está protegida por el Secreto Médico. Sus datos están almacenados en servidores y sistemas físicos con acceso restringido, disponibles únicamente para el personal médico e instancias administrativas estrictamente necesarias.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">4. Sus Derechos (Derechos ARCO)</h2>
              <p>
                De acuerdo a la legislación peruana, usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse (ARCO)</strong> al uso de sus datos personales. Si desea ejercer alguno de estos derechos, puede comunicarse directamente con nosotros enviando un correo a o solicitándolo de forma presencial en nuestras instalaciones en Av. Brasil 2730, Pueblo Libre.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">5. Uso de Cookies</h2>
              <p>
                Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario, analizar el tráfico del sitio y personalizar el contenido. Puede configurar su navegador web para rechazar las cookies, aunque esto podría afectar el funcionamiento de algunas áreas de nuestra página.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PoliticaPrivacidad;