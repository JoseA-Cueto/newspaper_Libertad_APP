/**
 * Tipos e interfaces del proyecto LIBERTAD Frontend
 */

export enum ArticleStatus {
  Draft = "Draft",
  Submitted = "Submitted",
  InReview = "InReview",
  ChangesRequested = "ChangesRequested",
  Approved = "Approved",
  Published = "Published",
  Archived = "Archived",
}

/**
 * Respuesta paginada genérica
 */
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Resumen de artículo (usado en listados)
 */
export interface ArticleSummary {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  status: ArticleStatus | string; // Aceptar string también por compatibilidad con API
  sectionId: string;
  sectionName?: string | null;
  sectionSlug?: string | null;
  authorId: string;
  issueDate?: string | null;
  publishedAt?: string | null;
  createdAt: string;
}

/**
 * Detalle completo de artículo
 */
export interface ArticleDetail {
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  contentMarkdown: string;
  status: ArticleStatus | string; // Aceptar string también por compatibilidad con API
  sectionId: string;
  sectionName?: string | null;
  sectionSlug?: string | null;
  authorId: string;
  issueDate?: string | null;
  submittedAt?: string | null;
  publishedAt?: string | null;
  archivedAt?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

/**
 * Sección del periódico
 */
export interface Section {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

/**
 * Estado de una solicitud API
 */
export type ApiState<T> = 
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };
