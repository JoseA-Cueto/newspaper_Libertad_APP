/**
 * Servicio de API pública de LIBERTAD
 * Capa de abstracción sobre el cliente HTTP
 */

import { PagedResponse, ArticleSummary, ArticleDetail } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5237/api";

/**
 * Error personalizado para la API
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Cliente HTTP genérico con manejo de errores y fallback
 */
async function fetchFromApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);

    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Unknown error",
      undefined,
      endpoint
    );
  }
}

/**
 * Obtener artículos recientes (home / actualidad)
 * Últimos 7 días de artículos publicados
 */
export async function getHome(
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  const endpoint = `/public/home?page=${page}&pageSize=${pageSize}`;
  return fetchFromApi(endpoint);
}

/**
 * Obtener artículos de una sección específica
 */
export async function getSectionBySlug(
  slug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  const endpoint = `/public/sections/${slug}?page=${page}&pageSize=${pageSize}`;
  return fetchFromApi(endpoint);
}

/**
 * Obtener detalle completo de un artículo publicado
 */
export async function getPublicArticleBySlug(
  slug: string
): Promise<ArticleDetail> {
  const endpoint = `/public/articles/${slug}`;
  return fetchFromApi(endpoint);
}

/**
 * Obtener artículos archivados (más de 7 días)
 */
export async function getArchive(
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  const endpoint = `/public/archive?page=${page}&pageSize=${pageSize}`;
  return fetchFromApi(endpoint);
}

/**
 * Verificar estado de salud de la API
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}
