import { PageSectionHeader } from "@/components";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <header className="mb-8 pb-6 border-b-2 border-gray-300">
            <PageSectionHeader
              title="Aviso Legal"
              description="Información legal sobre el uso y acceso a este sitio"
            />
          </header>

          {/* Contenido */}
          <div className="prose prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-800 prose-p:leading-relaxed">
            {/* Identificación */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Identificación del sitio</h2>
              <p className="text-gray-700 mb-4">
                <strong>Denominación:</strong> LIBERTAD
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Dominio:</strong> [www.libertad.local] - PLACEHOLDER
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Responsable del sitio:</strong> [Responsable/Propietario] - PLACEHOLDER
              </p>
              <p className="text-gray-700">
                <strong>Correo de contacto:</strong> [contacto@libertad.local] - PLACEHOLDER
              </p>
            </section>

            {/* Finalidad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Finalidad del sitio</h2>
              <p className="text-gray-700">
                Este sitio web tiene carácter informativo y editorial. Su objetivo es la difusión 
                de contenidos de interés público relacionados con política, economía, sociedad, 
                cultura y opinión.
              </p>
            </section>

            {/* Condiciones generales */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Condiciones generales de uso</h2>
              <p className="text-gray-700 mb-4">
                El acceso y uso de este sitio web implica la aceptación de este aviso legal 
                en su totalidad. El usuario se compromete a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Hacer un uso legal del sitio conforme a la ley vigente</li>
                <li>No transmitir contenido ilegal, ofensivo o que viole derechos de terceros</li>
                <li>No interferir con el funcionamiento normal del servidor</li>
                <li>Respetar los derechos de propiedad intelectual del sitio</li>
              </ul>
              <p className="text-gray-700">
                El propietario del sitio se reserva el derecho a modificar, suspender o cancelar 
                el acceso sin previo aviso.
              </p>
            </section>

            {/* Propiedad intelectual */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propiedad intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todos los contenidos de este sitio web (textos, diseño, estructura, logo, etc.) 
                están protegidos por derechos de propiedad intelectual. Queda prohibida su 
                reproducción, distribución o modificación sin autorización expresa.
              </p>
              <p className="text-gray-700">
                Los artículos y contenidos editoriales son propiedad de LIBERTAD y sus autores 
                colaboradores, salvo indicación contraria.
              </p>
            </section>

            {/* Responsabilidad sobre contenidos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Responsabilidad sobre contenidos y enlaces</h2>
              <p className="text-gray-700 mb-4">
                LIBERTAD procura que los contenidos publicados sean exactos y verificados. 
                Sin embargo, no garantiza la veracidad absoluta ni la actualización permanente 
                de los contenidos.
              </p>
              <p className="text-gray-700 mb-4">
                Este sitio puede contener enlaces a sitios de terceros. LIBERTAD no es responsable 
                del contenido, disponibilidad o política de privacidad de estos sitios externos.
              </p>
              <p className="text-gray-700">
                Si encuentras contenido inadecuado o enlaces rotos, te invitamos a reportarlo 
                al correo de contacto indicado arriba.
              </p>
            </section>

            {/* Limitación de responsabilidad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitación de responsabilidad</h2>
              <p className="text-gray-700">
                En ningún caso LIBERTAD será responsable por daños directos, indirectos, incidentales 
                o consecuentes derivados del uso o imposibilidad de uso de este sitio, incluso si 
                ha sido informado de la posibilidad de tales daños.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contacto</h2>
              <p className="text-gray-700 mb-2">
                Para consultas legales o reportar contenido inadecuado:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> [contacto@libertad.local] - PLACEHOLDER
              </p>
              <p className="text-gray-700 mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                <strong>Última actualización:</strong> 24 de febrero de 2026
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
