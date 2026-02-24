/**
 * Metadatos de secciones para LIBERTAD
 * Incluye títulos, descripciones y configuración por slug
 */

export interface SectionMetadata {
  slug: string;
  title: string;
  description: string;
}

const SECTION_METADATA: Record<string, SectionMetadata> = {
  politica: {
    slug: "politica",
    title: "Política",
    description:
      "Actualidad política nacional e internacional. Análisis de decisiones gubernamentales, procesos legislativos y eventos que configuran el debate público.",
  },
  economia: {
    slug: "economia",
    title: "Economía",
    description:
      "Mercados, finanzas y políticas económicas. Información sobre el estado de la economía, empresas, empleo e indicadores que impactan el bienestar social.",
  },
  sociedad: {
    slug: "sociedad",
    title: "Sociedad",
    description:
      "Temas sociales, educación, salud, derechos y movimientos ciudadanos. Historias que reflejan las dinámicas y desafíos de nuestra comunidad.",
  },
  cultura: {
    slug: "cultura",
    title: "Cultura",
    description:
      "Arte, literatura, cine, música y pensamiento cultural. Espacios para la crítica, la creación y el diálogo sobre expresiones artísticas contemporáneas.",
  },
  opinion: {
    slug: "opinion",
    title: "Opinión",
    description:
      "Columnas, editoriales y análisis de nuestros colaboradores. Diversidad de voces y perspectivas sobre los acontecimientos más relevantes.",
  },
};

/**
 * Obtiene metadatos de una sección por slug
 * Si no existe, devuelve metadatos genéricos derivados del slug
 */
export function getSectionMetadata(slug: string): SectionMetadata {
  const normalized = slug.toLowerCase();

  if (SECTION_METADATA[normalized]) {
    return SECTION_METADATA[normalized];
  }

  // Fallback: capitalizar slug y descripción genérica
  const title = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return {
    slug: normalized,
    title,
    description: `Artículos relacionados con ${title.toLowerCase()}.`,
  };
}

/**
 * Obtiene todas las secciones configuradas
 */
export function getAllSections(): SectionMetadata[] {
  return Object.values(SECTION_METADATA);
}
