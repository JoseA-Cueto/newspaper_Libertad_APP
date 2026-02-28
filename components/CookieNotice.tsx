"use client";

import { useEffect, useState } from "react";

export default function CookieNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó cookies
    const cookieConsent = localStorage.getItem("libertad-cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("libertad-cookie-consent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-gray-100 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Contenido */}
          <div className="flex-1 text-xs sm:text-sm">
            <p className="mb-2 leading-relaxed">
              Este sitio utiliza cookies para mantener la sesión y mejorar tu experiencia.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Nota: La política de cookies se actualizará cuando se definan herramientas adicionales de análisis.
            </p>
          </div>

          {/* Botón */}
          <button
            onClick={handleAccept}
            className="flex-shrink-0 w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-700 hover:bg-blue-600 text-white font-medium text-sm rounded transition"
            aria-label="Aceptar cookies"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
