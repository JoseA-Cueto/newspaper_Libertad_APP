/**
 * Utilidades y helpers
 */

/**
 * Formatea una fecha ISO a formato legible en español
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Formatea una fecha ISO a formato corto (DD/MM/YYYY)
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Formatea una fecha ISO a solo hora
 */
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calcula tiempo relativo (ej: "hace 2 horas")
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "hace unos segundos";
  if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? "s" : ""}`;
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? "s" : ""}`;
  if (diffDays < 7) return `hace ${diffDays} día${diffDays > 1 ? "s" : ""}`;

  return formatDate(dateString);
}

/**
 * Trunca un texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Capitaliza la primera letra
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Normaliza un slug (lowercase, guiones, sin caracteres especiales)
 */
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9\s-]/g, "") // solo letras, números, espacios y guiones
    .trim()
    .replace(/\s+/g, "-") // espacios a guiones
    .replace(/-+/g, "-"); // guiones múltiples a uno solo
}

/**
 * Construye URL con parámetros de query
 */
export function buildUrl(
  basePath: string,
  params: Record<string, string | number | undefined>
): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(value!)}`)
    .join("&");

  return query ? `${basePath}?${query}` : basePath;
}

/**
 * Valida si una cadena es una URL válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Extrae el primer párrafo de un texto markdown (para previews)
 */
export function extractFirstParagraph(markdown: string): string {
  const lines = markdown.split("\n").filter((line) => line.trim() !== "");
  
  for (const line of lines) {
    // Ignorar títulos, listas, etc.
    if (!line.startsWith("#") && !line.startsWith("-") && !line.startsWith("*")) {
      return line.trim();
    }
  }
  
  return lines[0] || "";
}
