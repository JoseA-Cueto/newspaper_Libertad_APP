/**
 * Datos mock para desarrollo
 * Se usan cuando la API no está disponible
 */

import { ArticleSummary, ArticleDetail, PagedResponse } from "@/types";

export const mockSections = [
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
];

export const mockHomeResponse: PagedResponse<ArticleSummary> = {
  items: mockArticles,
  page: 1,
  pageSize: 10,
  totalItems: 3,
  totalPages: 1,
};

export const mockArticleDetail: ArticleDetail = {
  id: "article-1",
  title: "Reforma constitucional avanza en el congreso",
  subtitle: "Primera lectura de la nueva propuesta",
  slug: "reforma-constitucional-avanza",
  contentMarkdown: `
# Reforma constitucional avanza en el congreso

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
  ],
  page: 1,
  pageSize: 10,
  totalItems: 1,
  totalPages: 1,
};
