import { PageSectionHeader } from "@/components";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <article className="bg-white border border-gray-200 shadow-sm p-5 sm:p-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b-2 border-gray-300">
            <PageSectionHeader
              title="Política de Privacidad"
              description="Cómo tratamos y protegemos tus datos"
            />
          </header>

          {/* Contenido */}
          <div className="prose prose-sm sm:prose-base prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-6 prose-headings:mb-3 prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4">
            {/* Introducción */}
            <section className="mb-8">
              <p className="text-gray-700">
                En LIBERTAD nos compromete a proteger la privacidad de nuestros lectores. 
                Esta política explica cómo tratamos datos personales cuando interactúas con nuestro sitio.
              </p>
            </section>

            {/* Responsable */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable del tratamiento</h2>
              <p className="text-gray-700 mb-4">
                <strong>Entidad:</strong> LIBERTAD
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Dominio:</strong> [www.libertad.local] - PLACEHOLDER
              </p>
              <p className="text-gray-700">
                <strong>Contacto de privacidad:</strong> [privacidad@libertad.local] - PLACEHOLDER
              </p>
            </section>

            {/* Datos que tratamos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Qué datos podrían tratarse</h2>
              <p className="text-gray-700 mb-4">
                Actualmente, el sitio no requiere registro ni solicita datos personales para acceder 
                a contenidos públicos. Sin embargo, podrían tratarse datos en estos casos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Si nos contactas por email: nombre, email, asunto del mensaje</li>
                <li>Datos técnicos de navegación (ver sección de Cookies)</li>
                <li>En el futuro, si se implementan formularios o servicios adicionales</li>
              </ul>
            </section>

            {/* Finalidad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidad del tratamiento</h2>
              <p className="text-gray-700">
                Los datos se tratan únicamente para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Responder consultas y correspondencia del usuario</li>
                <li>Mantener la función editorial y operativa del sitio</li>
                <li>Cumplir obligaciones legales cuando corresponda</li>
              </ul>
            </section>

            {/* Base legal */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base legal</h2>
              <p className="text-gray-700 mb-4">
                El tratamiento de datos se basa en:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Consentimiento del usuario (si proporcionas datos voluntariamente)</li>
                <li>Interés legítimo (mantener el funcionamiento del sitio)</li>
                <li>Obligaciones legales aplicables</li>
              </ul>
            </section>

            {/* Conservación */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Conservación de datos</h2>
              <p className="text-gray-700 mb-4">
                Los datos se conservan:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Durante el tiempo necesario para cumplir la finalidad</li>
                <li>El tiempo requerido por obligaciones legales</li>
                <li>[Específico según futuro] - PLACEHOLDER A COMPLETAR</li>
              </ul>
            </section>

            {/* Derechos del usuario */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tus derechos</h2>
              <p className="text-gray-700 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Acceso:</strong> Solicitar qué datos tuyos tenemos</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos (&quot;derecho al olvido&quot;)</li>
                <li><strong>Limitación:</strong> Solicitar que restrinjamos el tratamiento</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                <li><strong>Oposición:</strong> Oponerte a ciertos tratamientos</li>
              </ul>
              <p className="text-gray-700">
                Para ejercer estos derechos, contacta a: [privacidad@libertad.local] - PLACEHOLDER
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4" id="cookies">7. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Este sitio utiliza cookies técnicas para mantener la sesión y mejorar 
                la experiencia de usuario. No utilizamos cookies de seguimiento ni analítica en v1.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-4">Tipos de cookies:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Técnicas:</strong> Necesarias para el funcionamiento del sitio (p.ej., sesiones)</li>
                <li><strong>Preferencias:</strong> Guardar preferencias del usuario (p.ej., notificación de cookies)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Cuando en el futuro se integren herramientas de analítica o servicios adicionales, 
                esta política se actualizará según corresponda.
              </p>
              <p className="text-gray-700">
                Puedes controlar cookies a través de los ajustes de tu navegador.
              </p>
            </section>

            {/* Seguridad */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Seguridad</h2>
              <p className="text-gray-700">
                Implementamos medidas de seguridad estándar para proteger tus datos contra 
                acceso, alteración o divulgación no autorizados. Sin embargo, ningún sistema 
                puede garantizar seguridad absoluta.
              </p>
            </section>

            {/* Cambios */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cambios en esta política</h2>
              <p className="text-gray-700">
                Esta política puede actualizarse sin previo aviso. Te recomendamos revisarla 
                periódicamente. El uso continuado del sitio implica aceptación de cambios.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contacto</h2>
              <p className="text-gray-700 mb-2">
                Para cuestiones de privacidad o ejercer tus derechos:
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> [privacidad@libertad.local] - PLACEHOLDER
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
