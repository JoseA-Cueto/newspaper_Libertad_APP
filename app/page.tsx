export default function Home() {
  return (
    <div className="container-main">
      <div className="space-y-12">
        {/* Hero */}
        <section className="text-center py-12">
          <h1 className="mb-4">LIBERTAD</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Periódico digital independiente con enfoque text-first.
            Información clara, verificada y accesible.
          </p>
        </section>

        {/* Placeholder for articles list */}
        <section className="space-y-6">
          <h2>Últimas noticias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
