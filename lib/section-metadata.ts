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
  economia: {
    slug: "economia",
    title: "Economía",
    description:
      "Mercados, finanzas y políticas económicas. Información sobre el estado de la economía, empresas, empleo e indicadores que impactan el bienestar social.",
  },
  "educacion-y-civismo": {
    slug: "educacion-y-civismo",
    title: "Educación y Civismo",
    description:
      "Educación, ciudadanía y valores cívicos. Cobertura de iniciativas, debates y desafíos para una sociedad informada y participativa.",
  },
  diaspora: {
    slug: "diaspora",
    title: "Diáspora",
    description:
      "Historias y análisis sobre la comunidad cubana fuera de la Isla. Realidades, vínculos y desafíos de la diáspora.",
  },
  opinion: {
    slug: "opinion",
    title: "Opinión",
    description:
      "Columnas, editoriales y análisis de nuestros colaboradores. Diversidad de voces y perspectivas sobre los acontecimientos más relevantes.",
  },
  "analisis-y-datos": {
    slug: "analisis-y-datos",
    title: "Análisis y Datos",
    description:
      "Investigaciones, visualización y lectura de datos para comprender el contexto y las tendencias detrás de los hechos.",
  },
};

const SECTION_ORDER = [
  "politica",
  "sociedad",
  "cultura",
  "economia",
  "educacion-y-civismo",
  "diaspora",
  "opinion",
  "analisis-y-datos",
] as const;

export interface NavLink {
  label: string;
  href: string;
}

export function getSectionNavLinks(): NavLink[] {
  return SECTION_ORDER.map((slug) => ({
    label: SECTION_METADATA[slug].title,
    href: `/seccion/${slug}`,
  }));
}

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
  return SECTION_ORDER.map((slug) => SECTION_METADATA[slug]);
}
