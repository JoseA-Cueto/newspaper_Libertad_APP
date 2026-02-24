"use client";

import { ErrorState } from "@/components";

export default function ErrorPage() {
  return (
    <div className="container-main">
      <ErrorState
        title="Error al cargar la portada"
        message="No se pudo conectar con el servidor. Por favor, intenta recargar la página."
      />
    </div>
  );
}
