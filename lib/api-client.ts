/**
 * Cliente API para consumir endpoints públicos de LIBERTAD
 * Soporta fallback a mock data cuando la API no está disponible
 */

import { PagedResponse, ArticleSummary, ArticleDetail } from "@/types";
import {
  mockHomeResponse,
  mockArticleDetail,
  mockArchiveResponse,
} from "@/mocks/data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5237";
const USE_MOCK_DATA =
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

interface FetchOptions extends RequestInit {
  useCache?: boolean;
}

/**
 * Realiza una llamada HTTP con manejo de errores
 */
async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { useCache = true, ...fetchOptions } = options;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);

    if (USE_MOCK_DATA) {
      console.warn(`Using mock data for ${endpoint}`);
      return getMockData<T>(endpoint);
    }

    throw error;
  }
}

/**
 * Retorna datos mock basados en el endpoint solicitado
 */
function getMockData<T>(endpoint: string): T {
  if (endpoint.includes("/api/public/home")) {
    return mockHomeResponse as T;
  }
  if (endpoint.includes("/api/public/articles/")) {
    return mockArticleDetail as T;
  }
  if (endpoint.includes("/api/public/archive")) {
    return mockArchiveResponse as T;
  }
  if (endpoint.includes("/api/public/sections/")) {
    return mockHomeResponse as T; // Similar structure
  }
  throw new Error(`No mock data available for ${endpoint}`);
}

/**
 * Obtiene artículos recientes (home)
 */
export async function getHome(
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  return fetchApi<PagedResponse<ArticleSummary>>(
    `/api/public/home?page=${page}&pageSize=${pageSize}`
  );
}

/**
 * Obtiene artículos por sección
 */
export async function getSectionArticles(
  slug: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  return fetchApi<PagedResponse<ArticleSummary>>(
    `/api/public/sections/${slug}?page=${page}&pageSize=${pageSize}`
  );
}

/**
 * Obtiene un artículo completo por slug
 */
export async function getArticle(
  slug: string
): Promise<ArticleDetail> {
  return fetchApi<ArticleDetail>(`/api/public/articles/${slug}`);
}

/**
 * Obtiene artículos archivados
 */
export async function getArchive(
  page: number = 1,
  pageSize: number = 10
): Promise<PagedResponse<ArticleSummary>> {
  return fetchApi<PagedResponse<ArticleSummary>>(
    `/api/public/archive?page=${page}&pageSize=${pageSize}`
  );
}

/**
 * Verifica el estado de la API
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}
