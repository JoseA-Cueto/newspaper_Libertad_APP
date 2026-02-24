import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Artículo no encontrado
        </h2>
        <p className="text-gray-600 mb-8">
          El artículo que buscas no existe o no está disponible en este momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition"
          >
            Volver a Portada
          </Link>
          <Link
            href="/historico"
            className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition"
          >
            Ver Histórico
          </Link>
        </div>
      </div>
    </div>
  );
}
