import { getPublicArticleBySlug } from "@/services";
import { SidebarLeft } from "@/components";
import { formatDate } from "@/lib/utils";
import { getAllSections } from "@/lib/section-metadata";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage(props: ArticlePageProps) {
  const params = await props.params;
  const { slug } = params;

  // Cargar datos del artículo (con fallback automático a mocks)
  const article = await getPublicArticleBySlug(slug);

  // Si el artículo no existe, mostrar 404
  if (!article) {
    notFound();
  }

  // Determinar fecha a mostrar (publishedAt o issueDate)
  const displayDate = article.publishedAt || article.issueDate;

  // Sidebar contextual
  const allSections = getAllSections();
  const currentSectionSlug = article.sectionSlug;
  const otherSections = allSections.filter((s) => s.slug !== currentSectionSlug);

  const sidebarSections = [
    {
      title: "Navegación",
      items: [
        { label: "Inicio", href: "/" },
        { label: "Histórico", href: "/historico" },
      ],
    },
  ];

  // Agregar sección actual si existe
  if (article.sectionName && article.sectionSlug) {
    sidebarSections.push({
      title: "Esta sección",
      items: [
        {
          label: article.sectionName,
          href: `/seccion/${article.sectionSlug}`,
        },
      ],
    });
  }

  // Agregar otras secciones
  if (otherSections.length > 0) {
    sidebarSections.push({
      title: "Explorar",
      items: otherSections.map((s) => ({
        label: s.title,
        href: `/seccion/${s.slug}`,
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
            <article className="bg-white border border-gray-200 shadow-sm">
              {/* Meta info */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  {article.sectionName && article.sectionSlug && (
                    <>
                      <Link
                        href={`/seccion/${article.sectionSlug}`}
                        className="font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wide"
                      >
                        {article.sectionName}
                      </Link>
                      <span className="text-gray-400">•</span>
                    </>
                  )}
                  {displayDate && (
                    <time dateTime={displayDate} className="text-gray-600">
                      {formatDate(displayDate)}
                    </time>
                  )}
                </div>
              </div>

              {/* Título y subtítulo */}
              <header className="border-b-2 border-gray-300 px-6 py-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  {article.title}
                </h1>
                {article.subtitle && (
                  <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-gray-300 pl-4">
                    {article.subtitle}
                  </p>
                )}
              </header>

              {/* Contenido del artículo */}
              <div className="px-6 py-8">
                <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-800 prose-p:leading-relaxed prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal">
                  <ReactMarkdown>{article.contentMarkdown}</ReactMarkdown>
                </div>
              </div>

              {/* Navegación final */}
              <footer className="border-t-2 border-gray-300 px-6 py-6 bg-gray-50">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Link
                    href="/"
                    className="font-medium text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    ← Volver a Portada
                  </Link>
                  {article.sectionName && article.sectionSlug && (
                    <>
                      <span className="text-gray-400">•</span>
                      <Link
                        href={`/seccion/${article.sectionSlug}`}
                        className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        Más de {article.sectionName}
                      </Link>
                    </>
                  )}
                </div>
              </footer>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
