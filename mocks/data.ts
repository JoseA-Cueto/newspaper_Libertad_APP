/**
 * Datos mock para desarrollo
 * Se usan cuando la API no está disponible
 */

import { ArticleSummary, ArticleDetail, PagedResponse, Section } from "@/types";

export const mockSections: Section[] = [
  {
    id: "section-1",
    name: "Política",
    slug: "politica",
    description: "Noticias de política nacional e internacional",
    sortOrder: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "section-2",
    name: "Economía",
    slug: "economia",
    description: "Análisis económico y financiero",
    sortOrder: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "section-3",
    name: "Sociedad",
    slug: "sociedad",
    description: "Temas de interés social",
    sortOrder: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "section-4",
    name: "Cultura",
    slug: "cultura",
    description: "Arte, libros, cine y expresiones culturales",
    sortOrder: 4,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "section-5",
    name: "Opinión",
    slug: "opinion",
    description: "Análisis y columnas de opinión",
    sortOrder: 5,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const mockArticles: ArticleSummary[] = [
  {
    id: "article-1",
    title: "Reforma constitucional avanza en el congreso",
    subtitle: "Primera lectura de la nueva propuesta",
    slug: "reforma-constitucional-avanza",
    status: "Published",
    sectionId: "section-1",
    sectionName: "Política",
    sectionSlug: "politica",
    authorId: "author-1",
    issueDate: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "article-2",
    title: "Mercados reaccionan positivamente ante anuncio de estabilidad",
    subtitle: "Índices suben en apertura de la semana",
    slug: "mercados-reaccionan",
    status: "Published",
    sectionId: "section-2",
    sectionName: "Economía",
    sectionSlug: "economia",
    authorId: "author-2",
    issueDate: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "article-3",
    title: "Iniciativa ciudadana recauda fondos para educación",
    subtitle: "Comunidad se organiza para apoyar becas escolares",
    slug: "iniciativa-educacion",
    status: "Published",
    sectionId: "section-3",
    sectionName: "Sociedad",
    sectionSlug: "sociedad",
    authorId: "author-3",
    issueDate: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "article-4",
    title: "Nueva exposición de arte contemporáneo abre sus puertas",
    subtitle: "Galería nacional presenta obras de artistas locales",
    slug: "exposicion-arte-contemporaneo",
    status: "Published",
    sectionId: "section-4",
    sectionName: "Cultura",
    sectionSlug: "cultura",
    authorId: "author-4",
    issueDate: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "article-5",
    title: "El desafío de la participación ciudadana en democracias modernas",
    subtitle: null,
    slug: "desafio-participacion-ciudadana",
    status: "Published",
    sectionId: "section-5",
    sectionName: "Opinión",
    sectionSlug: "opinion",
    authorId: "author-5",
    issueDate: new Date().toISOString(),
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockHomeResponse: PagedResponse<ArticleSummary> = {
  items: mockArticles,
  page: 1,
  pageSize: 10,
  totalItems: mockArticles.length,
  totalPages: 1,
};

/**
 * Obtener mock de artículos por sección
 */
export function getMockSectionArticles(slug: string): PagedResponse<ArticleSummary> {
  const articles = mockArticles.filter(a => a.sectionSlug === slug);
  return {
    items: articles,
    page: 1,
    pageSize: 10,
    totalItems: articles.length,
    totalPages: articles.length > 0 ? 1 : 0,
  };
}

export const mockArticleDetail: ArticleDetail = {
  id: "article-1",
  title: "Reforma constitucional avanza en el congreso",
  subtitle: "Primera lectura de la nueva propuesta",
  slug: "reforma-constitucional-avanza",
  contentMarkdown: `# Reforma constitucional avanza en el congreso

Primera lectura de la nueva propuesta

## Contexto

La reforma constitucional ha sido uno de los temas más debatidos en los últimos meses. 
Ahora, el congreso da un paso importante en su tramitación.

## Detalles

El proyecto fue presentado ante plenaria el pasado lunes. Los analistas señalan que 
esta es una oportunidad importante para modernizar el marco legal del país.

### Posiciones

- **Apoyo**: Sectores progresistas ven esta reforma como necesaria
- **Cautela**: Grupos conservadores piden más tiempo de análisis

## Próximos pasos

Se espera que en las próximas semanas se abra el debate público. Las audiencias 
ciudadanas serán fundamentales para el proceso.

*Más información en próximas ediciones.*
  `,
  status: "Published",
  sectionId: "section-1",
  sectionName: "Política",
  sectionSlug: "politica",
  authorId: "author-1",
  issueDate: new Date().toISOString(),
  publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
};

/**
 * Obtener detalle de artículo mock por slug
 */
export function getMockArticleBySlug(slug: string): ArticleDetail | null {
  const article = mockArticles.find(a => a.slug === slug);
  if (!article) return null;

  // Convertir ArticleSummary a ArticleDetail con contenido mock
  return {
    ...article,
    contentMarkdown: `# ${article.title}

${article.subtitle || ''}

Este es el contenido completo del artículo **${article.title}**.

## Introducción

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua.

## Desarrollo

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
commodo consequat.

### Puntos clave

- Primer punto importante
- Segundo punto relevante
- Tercer aspecto a considerar

## Conclusión

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
nulla pariatur.

*Más información en próximas ediciones.*
    `,
    submittedAt: article.createdAt,
    archivedAt: null,
    updatedAt: null,
  };
}

export const mockArchiveResponse: PagedResponse<ArticleSummary> = {
  items: [
    {
      id: "article-old-1",
      title: "Economía cerró año con crecimiento moderado",
      subtitle: null,
      slug: "economia-cierre-ano",
      status: "Archived",
      sectionId: "section-2",
      sectionName: "Economía",
      sectionSlug: "economia",
      authorId: "author-4",
      issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "article-old-2",
      title: "Iniciativas culturales marcaron el trimestre",
      subtitle: "Balance de actividades artísticas y eventos comunitarios",
      slug: "balance-cultural-trimestre",
      status: "Archived",
      sectionId: "section-4",
      sectionName: "Cultura",
      sectionSlug: "cultura",
      authorId: "author-5",
      issueDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      publishedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  page: 1,
  pageSize: 10,
  totalItems: 2,
  totalPages: 1,
};
