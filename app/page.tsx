import { getHome } from "@/services";
import {
  SidebarLeft,
  ArticleCardText,
  ArticleListItem,
  Pagination,
  EmptyState,
} from "@/components";
import { formatDate } from "@/lib/utils";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  // Cargar datos de Home (con fallback automático a mocks)
  const data = await getHome(page, pageSize);

  // Manejar caso sin artículos
  if (!data.items || data.items.length === 0) {
    return (
      <div className="container-main">
        <EmptyState
          title="No hay artículos disponibles"
          message="Aún no se han publicado artículos recientes."
        />
      </div>
    );
  }

  // Separar artículos para diferentes secciones de la portada
  const [heroArticle, ...restArticles] = data.items;
  const secondaryArticles = restArticles.slice(0, 4);
  const listArticles = restArticles.slice(4);

  // Sidebar sections
  const sidebarSections = [
    {
      title: "Edición",
      items: [
        { label: formatDate(new Date().toISOString()), href: "/" },
        { label: "Actualidad", href: "/", isActive: true },
      ],
    },
    {
      title: "Secciones",
      items: [
        { label: "Inicio", href: "/" },
        { label: "Política", href: "/seccion/politica" },
        { label: "Economía", href: "/seccion/economia" },
        { label: "Sociedad", href: "/seccion/sociedad" },
        { label: "Cultura", href: "/seccion/cultura" },
        { label: "Opinión", href: "/seccion/opinion" },
        { label: "Histórico", href: "/historico" },
        { label: "Colabora", href: "/colabora" },
      ],
    },
    {
      title: "Piezas de hoy",
      items: data.items.slice(0, 5).map((article) => ({
        label: article.title,
        href: `/articulo/${article.slug}`,
      })),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Masthead / Tagline */}
      <div className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-center">
          <p className="text-xs sm:text-sm text-gray-600 italic">
            Periódico de criterio, memoria y cultura cívica
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Left (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <SidebarLeft sections={sidebarSections} />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 bg-white shadow-sm border border-gray-200">
            {/* Edition Date Banner */}
            <div className="border-b-4 border-gray-900 py-3 sm:py-4 px-5 sm:px-6">
              <p className="text-xs sm:text-sm font-semibold text-gray-700">
                Edición del{" "}
                <time dateTime={new Date().toISOString()}>
                  {formatDate(new Date().toISOString())}
                </time>
              </p>
            </div>

            {/* Hero Article */}
            <article className="border-b-2 border-gray-300 p-5 sm:p-6 lg:p-8">
              <div className="mb-2 sm:mb-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-600 uppercase tracking-wide">
                {heroArticle.sectionName && (
                  <a
                    href={`/seccion/${heroArticle.sectionSlug}`}
                    className="font-bold text-blue-700 hover:text-blue-900 transition"
                  >
                    {heroArticle.sectionName}
                  </a>
                )}
                {heroArticle.publishedAt && (
                  <>
                    <span className="text-gray-400">•</span>
                    <time dateTime={heroArticle.publishedAt}>
                      {formatDate(heroArticle.publishedAt)}
                    </time>
                  </>
                )}
              </div>

              <a href={`/articulo/${heroArticle.slug}`} className="group">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight group-hover:text-blue-700 transition">
                  {heroArticle.title}
                </h1>
              </a>

              {heroArticle.subtitle && (
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed italic border-l-4 border-gray-300 pl-3 sm:pl-4">
                  {heroArticle.subtitle}
                </p>
              )}
            </article>

            {/* Secondary Articles Grid */}
            {secondaryArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200">
                {secondaryArticles.map((article) => (
                  <div key={article.id} className="bg-white p-5 sm:p-6">
                    <ArticleCardText
                      title={article.title}
                      subtitle={article.subtitle}
                      sectionName={article.sectionName}
                      sectionSlug={article.sectionSlug}
                      publishedAt={article.publishedAt}
                      href={`/articulo/${article.slug}`}
                      className="border-none pb-0"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* More Articles List */}
            {listArticles.length > 0 && (
              <div className="border-t-2 border-gray-300 p-5 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2 sm:pb-3 border-b-2 border-gray-900">
                  Más artículos
                </h2>
                <div className="space-y-1">
                  {listArticles.map((article) => (
                    <ArticleListItem
                      key={article.id}
                      title={article.title}
                      sectionName={article.sectionName}
                      sectionSlug={article.sectionSlug}
                      publishedAt={article.publishedAt}
                      href={`/articulo/${article.slug}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
              <div className="border-t border-gray-200 px-5 sm:px-6">
                <Pagination
                  currentPage={page}
                  totalPages={data.totalPages}
                  baseUrl="/?page="
                  pageSize={pageSize}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

