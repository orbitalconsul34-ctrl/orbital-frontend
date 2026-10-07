import React, { useEffect } from 'react';

const TerminosCondiciones = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#efe8d8] min-h-screen pt-32 pb-24 font-raleway selection:bg-[#256b3c] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        
        <div className="bg-white p-8 md:p-14 rounded-[2rem] shadow-sm border border-black/5">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3325] mb-4">Términos y Condiciones</h1>
          <p className="text-[#8a9096] text-sm mb-10">Última actualización: Noviembre 2024</p>
          
          <div className="space-y-8 text-[#4b5563] text-[15.5px] leading-relaxed">
            
            <p>
              Bienvenido al sitio web de <strong>Orbital Salud</strong>. Al acceder y utilizar este sitio web, usted acepta cumplir con los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestro sitio web ni nuestros servicios digitales.
            </p>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">1. Uso de la Información Médica (Disclaimer)</h2>
              <p>
                El contenido disponible en este sitio web (textos, gráficos, imágenes y artículos) tiene un propósito única y exclusivamente <strong>informativo y educativo</strong>. En ningún caso la información proporcionada en esta web reemplaza la consulta, el diagnóstico o el tratamiento médico profesional. Siempre busque el consejo de su médico o de un especialista en salud ante cualquier duda sobre una condición médica.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">2. Servicios y Tratamientos</h2>
              <p>
                Los resultados de los tratamientos médicos, nutricionales y estéticos mencionados en este sitio web pueden variar de un paciente a otro. Orbital Salud no garantiza resultados exactos, ya que cada organismo reacciona de manera diferente a los tratamientos médicos. Toda intervención requiere una evaluación presencial o virtual previa por parte de nuestro personal médico.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">3. Propiedad Intelectual</h2>
              <p>
                Todo el material contenido en este sitio, incluyendo pero no limitado a logos, diseño, textos, gráficos, interfaces y fotografías, es propiedad de Orbital Salud o está licenciado a nuestro favor. Queda estrictamente prohibida la reproducción, distribución, exhibición o transmisión del contenido de este sitio sin autorización expresa y por escrito de la clínica.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">4. Venta de Productos en Línea</h2>
              <p>
                Si adquiere productos a través de nuestra sección de Tienda/Farmacia, los precios y la disponibilidad están sujetos a cambios sin previo aviso. Nos reservamos el derecho de limitar las cantidades de cualquier producto o servicio que ofrecemos. Todas las devoluciones o reclamos estarán sujetos a nuestra política de devoluciones establecida conforme a las leyes peruanas de protección al consumidor.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1e3325] mb-3">5. Modificaciones</h2>
              <p>
                Orbital Salud se reserv a el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en este sitio web. Es responsabilidad del usuario revisar periódicamente esta página.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TerminosCondiciones;