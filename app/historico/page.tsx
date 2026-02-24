import { getArchive } from "@/services";
import {
  PageSectionHeader,
  SidebarLeft,
  ArticleListItem,
  Pagination,
  EmptyState,
} from "@/components";
import { formatDate } from "@/lib/utils";
import { getAllSections } from "@/lib/section-metadata";
import Link from "next/link";

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

  // Cargar datos del archivo (con fallback automático a mocks)
  const data = await getArchive(page, pageSize);

  // Verificar si hay artículos
  const hasArticles = data.items && data.items.length > 0;

  // Sidebar contextual
  const allSections = getAllSections();

  const sidebarSections = [
    {
      title: "Navegación",
      items: [
        { label: "Inicio", href: "/" },
        { label: "Actualidad", href: "/" },
      ],
    },
    {
      title: "Secciones",
      items: allSections.map((s) => ({
        label: s.title,
        href: `/seccion/${s.slug}`,
      })),
    },
    {
      title: "Archivo",
      items: [
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar izquierda (desktop only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <SidebarLeft sections={sidebarSections} />
          </aside>

          {/* Contenido principal */}
          <main className="lg:col-span-9">
            <div className="bg-white border border-gray-200 shadow-sm">
              {/* Header de página */}
              <div className="border-b border-gray-200 px-5 sm:px-6 py-5 sm:py-6">
                <PageSectionHeader
                  title="Histórico"
                  description="Artículos de ediciones anteriores. Consulta nuestro archivo de publicaciones pasadas para encontrar reportajes, análisis y crónicas de ediciones anteriores."
                />
              </div>

              {/* Sin artículos */}
              {!hasArticles && (
                <div className="px-5 sm:px-6 py-10 sm:py-12">
                  <EmptyState
                    title="No hay artículos en el archivo"
                    message="Aún no hay artículos archivados disponibles."
                  />
                </div>
              )}

              {/* Con artículos */}
              {hasArticles && (
                <>
                  {/* Lista de artículos */}
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

                  {/* Paginación */}
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
