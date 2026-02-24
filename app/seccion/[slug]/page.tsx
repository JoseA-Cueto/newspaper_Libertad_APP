import { getSectionBySlug } from "@/services";
import {
  PageSectionHeader,
  SidebarLeft,
  ArticleCardText,
  ArticleListItem,
  Pagination,
  EmptyState,
} from "@/components";
import { formatDate } from "@/lib/utils";
import { getSectionMetadata, getAllSections } from "@/lib/section-metadata";
import { notFound } from "next/navigation";

interface SectionPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

export default async function SectionPage(props: SectionPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { slug } = params;
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  // Obtener metadatos de sección
  const sectionMeta = getSectionMetadata(slug);

  // Cargar datos de sección (con fallback automático a mocks)
  const data = await getSectionBySlug(slug, page, pageSize);

  // Si la sección no existe (servicio devuelve null), mostrar 404
  if (!data) {
    notFound();
  }

  // Verificar si hay artículos
  const hasArticles = data.items && data.items.length > 0;

  // Sidebar sections contextual
  const allSections = getAllSections();
  const otherSections = allSections.filter((s) => s.slug !== slug);

  const sidebarSections = [
    {
      title: sectionMeta.title,
      items: [
        { label: formatDate(new Date().toISOString()), href: `/seccion/${slug}` },
        { label: "Actualidad", href: `/seccion/${slug}`, isActive: true },
      ],
    },
    {
      title: "Otras secciones",
      items: otherSections.map((s) => ({
        label: s.title,
        href: `/seccion/${s.slug}`,
      })),
    },
    {
      title: "Navegación",
      items: [
        { label: "Inicio", href: "/" },
        { label: "Histórico", href: "/historico" },
      ],
    },
  ];

  // Agregar titulares rápidos si hay artículos
  if (hasArticles) {
    sidebarSections.push({
      title: "En esta página",
      items: data.items.slice(0, 5).map((article) => ({
        label: article.title,
        href: `/articulo/${article.slug}`,
      })),
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar izquierda (desktop only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <SidebarLeft sections={sidebarSections} />
          </aside>

          {/* Contenido principal */}
          <main className="lg:col-span-9">
            <div className="bg-white border border-gray-200 shadow-sm">
              {/* Header de sección */}
              <div className="border-b border-gray-200 px-6 py-6">
                <PageSectionHeader
                  title={sectionMeta.title}
                  description={sectionMeta.description}
                />
              </div>

              {/* Sin artículos */}
              {!hasArticles && (
                <div className="px-6 py-12">
                  <EmptyState
                    title={`No hay artículos en ${sectionMeta.title}`}
                    message="Aún no se han publicado artículos en esta sección. Vuelve pronto para ver nuevo contenido."
                  />
                </div>
              )}

              {/* Con artículos */}
              {hasArticles && (
                <>
                  {/* Artículo destacado (primero) */}
                  {data.items.length >= 1 && (
                    <div className="border-b border-gray-200 px-6 py-8">
                      <ArticleCardText
                        title={data.items[0].title}
                        subtitle={data.items[0].subtitle}
                        sectionName={data.items[0].sectionName}
                        sectionSlug={data.items[0].sectionSlug}
                        publishedAt={data.items[0].publishedAt}
                        href={`/articulo/${data.items[0].slug}`}
                      />
                    </div>
                  )}

                  {/* Grid de artículos secundarios (2-5) */}
                  {data.items.length > 1 && (
                    <div className="border-b border-gray-200 px-6 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.items.slice(1, 5).map((article) => (
                          <ArticleCardText
                            key={article.slug}
                            title={article.title}
                            subtitle={article.subtitle}
                            sectionName={article.sectionName}
                            sectionSlug={article.sectionSlug}
                            publishedAt={article.publishedAt}
                            href={`/articulo/${article.slug}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lista de más artículos (6+) */}
                  {data.items.length > 5 && (
                    <div className="border-b border-gray-200 px-6 py-8">
                      <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">
                        Más artículos
                      </h2>
                      <div className="space-y-6">
                        {data.items.slice(5).map((article) => (
                          <ArticleListItem
                            key={article.slug}
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

                  {/* Paginación */}
                  {data.totalPages > 1 && (
                    <div className="border-t border-gray-200 px-6">
                      <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        baseUrl={`/seccion/${slug}?page=`}
                        pageSize={pageSize}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
