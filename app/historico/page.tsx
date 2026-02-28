import { getArchive } from "@/services";
import {
  PageSectionHeader,
  SidebarLeft,
  ArticleListItem,
  Pagination,
  EmptyState,
} from "@/components";
import { formatDate } from "@/lib/utils";
import { getSectionNavLinks } from "@/lib/section-metadata";

interface HistoricPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}

export default async function HistoricPage(props: HistoricPageProps) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const data = await getArchive(page, pageSize);
  const hasArticles = data.items && data.items.length > 0;
  const sectionLinks = getSectionNavLinks();

  const sidebarSections = [
    {
      title: "Edición",
      items: [
        { label: formatDate(new Date().toISOString()), href: "/historico" },
        { label: "Inicio", href: "/" },
        ...sectionLinks.map((section) => ({
          label: section.label,
          href: section.href,
        })),
      ],
    },
    {
      title: "En esta edición",
      items: data.items.slice(0, 5).map((article) => ({
        label: article.title,
        href: `/articulo/${article.slug}`,
      })),
    },
  ];

  if (!hasArticles) {
    sidebarSections[1] = {
      title: "En esta edición",
      items: [],
    };
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:block lg:col-span-3">
            <SidebarLeft sections={sidebarSections} />
          </aside>

          <main className="lg:col-span-9">
            <div className="bg-white border border-gray-200">
              <div className="border-b border-gray-200 px-5 sm:px-6 py-5 sm:py-6">
                <PageSectionHeader
                  title="Histórico"
                  description="Artículos de ediciones anteriores. Consulta nuestro archivo de publicaciones pasadas para encontrar reportajes, análisis y crónicas de ediciones anteriores."
                />
              </div>

              {!hasArticles && (
                <div className="px-5 sm:px-6 py-10 sm:py-12">
                  <EmptyState
                    title="No hay artículos en el archivo"
                    message="Aún no hay artículos archivados disponibles."
                  />
                </div>
              )}

              {hasArticles && (
                <>
                  <div className="px-5 sm:px-6 py-6 sm:py-8">
                    <div className="space-y-4 sm:space-y-6">
                      {data.items.map((article) => (
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

                  {data.totalPages > 1 && (
                    <div className="border-t border-gray-200 px-5 sm:px-6">
                      <Pagination
                        currentPage={page}
                        totalPages={data.totalPages}
                        baseUrl="/historico?page="
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
