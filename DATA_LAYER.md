# Capa de Datos - LIBERTAD Frontend

## Arquitectura

La capa de datos tiene tres niveles:

1. **Servicios Públicos** (`services/publicApi.ts`) - API principal
2. **Mocks** (`mocks/data.ts`) - Datos de prueba con fallback automático
3. **Utilidades** (`lib/utils.ts`) - Helpers de formato y normalización

---

## Servicios Públicos

### `services/publicApi.ts`

Funciones para consumir endpoints públicos del backend con fallback automático a mocks.

#### Funciones Disponibles:

**1. getHome(page?, pageSize?)**
```typescript
import { getHome } from "@/services";

const articles = await getHome(1, 10);
// PagedResponse<ArticleSummary>
```
Obtiene artículos recientes (últimos 7 días).

**2. getSectionBySlug(slug, page?, pageSize?)**
```typescript
import { getSectionBySlug } from "@/services";

const articles = await getSectionBySlug("politica", 1, 10);
// PagedResponse<ArticleSummary>
```
Obtiene artículos de una sección específica.

**3. getPublicArticleBySlug(slug)**
```typescript
import { getPublicArticleBySlug } from "@/services";

const article = await getPublicArticleBySlug("reforma-constitucional");
// ArticleDetail
```
Obtiene detalle completo de un artículo.

**4. getArchive(page?, pageSize?)**
```typescript
import { getArchive } from "@/services";

const articles = await getArchive(1, 10);
// PagedResponse<ArticleSummary>
```
Obtiene artículos archivados (más de 7 días).

**5. checkApiHealth()**
```typescript
import { checkApiHealth } from "@/services";

const isHealthy = await checkApiHealth();
// boolean
```
Verifica si la API está disponible.

---

## Fallback Automático a Mocks

### Modos de Operación

**1. Modo API Real (por defecto)**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5237
NEXT_PUBLIC_USE_MOCK_DATA=false
```
- Intenta conectar a la API
- Si falla EN DESARROLLO, usa mocks automáticamente
- Si falla EN PRODUCCIÓN, lanza error

**2. Modo Mock Forzado**
```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```
- Usa siempre mocks, no intenta conectar a API
- Útil para desarrollo sin backend

**3. Fallback Automático**
Si `NEXT_PUBLIC_USE_MOCK_DATA=false` pero la API no responde:
- **Desarrollo**: Usa mocks automáticamente (con warning en consola)
- **Producción**: Lanza ApiError

---

## Mocks Disponibles

### Secciones (`mockSections`)
- Política (`politica`)
- Economía (`economia`)
- Sociedad (`sociedad`)
- Cultura (`cultura`)
- Opinión (`opinion`)

### Artículos Mock
- 5 artículos recientes en `mockHomeResponse`
- Artículos filtrados por sección con `getMockSectionArticles(slug)`
- Detalles completos con `getMockArticleBySlug(slug)`
- 2 artículos archivados en `mockArchiveResponse`

---

## Manejo de Errores

### ApiError

Clase de error personalizada:

```typescript
import { ApiError } from "@/services";

try {
  const article = await getPublicArticleBySlug("no-existe");
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`Error ${error.status}: ${error.message}`);
    console.error(`Endpoint: ${error.endpoint}`);
  }
}
```

**Propiedades:**
- `message: string` - Mensaje de error
- `status?: number` - Código HTTP (404, 500, etc.)
- `endpoint?: string` - Endpoint que falló

---

## Utilidades

### `lib/utils.ts`

**Formateo de Fechas:**
```typescript
import { formatDate, formatDateShort, formatTime, getRelativeTime } from "@/lib/utils";

formatDate("2026-02-24T10:00:00Z");      // "24 de febrero de 2026"
formatDateShort("2026-02-24T10:00:00Z"); // "24/02/2026"
formatTime("2026-02-24T10:30:00Z");      // "10:30"
getRelativeTime("2026-02-24T08:00:00Z"); // "hace 2 horas"
```

**Texto:**
```typescript
import { truncateText, capitalize } from "@/lib/utils";

truncateText("Lorem ipsum dolor...", 20);  // "Lorem ipsum dolor..."
capitalize("hola mundo");                   // "Hola mundo"
```

**URLs y Slugs:**
```typescript
import { normalizeSlug, buildUrl, isValidUrl } from "@/lib/utils";

normalizeSlug("Artículo de Política");              // "articulo-de-politica"
buildUrl("/historico", { page: 2, size: 10 });     // "/historico?page=2&size=10"
isValidUrl("https://example.com");                  // true
```

**Markdown:**
```typescript
import { extractFirstParagraph } from "@/lib/utils";

extractFirstParagraph(markdownContent);  // Extrae primer párrafo
```

---

## Tipos TypeScript

Todos en `types/index.ts`:

### PagedResponse<T>
```typescript
{
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
```

### ArticleSummary
```typescript
{
  id: string;
  title: string;
  subtitle?: string | null;
  slug: string;
  status: ArticleStatus | string;
  sectionId: string;
  sectionName?: string | null;
  sectionSlug?: string | null;
  authorId: string;
  issueDate?: string | null;
  publishedAt?: string | null;
  createdAt: string;
}
```

### ArticleDetail
Igual que ArticleSummary + `contentMarkdown`, `submittedAt`, `archivedAt`, `updatedAt`

### Section
```typescript
{
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
}
```

---

## Uso en Páginas

### Ejemplo: Página Home

```typescript
import { getHome } from "@/services";
import { ArticleCardText } from "@/components";

export default async function HomePage() {
  const data = await getHome(1, 10);

  return (
    <div>
      {data.items.map(article => (
        <ArticleCardText
          key={article.id}
          title={article.title}
          subtitle={article.subtitle}
          sectionName={article.sectionName}
          sectionSlug={article.sectionSlug}
          publishedAt={article.publishedAt}
          href={`/articulo/${article.slug}`}
        />
      ))}
    </div>
  );
}
```

### Ejemplo: Página con Estados

```typescript
"use client";

import { useState, useEffect } from "react";
import { getHome } from "@/services";
import { LoadingState, ErrorState, EmptyState } from "@/components";

export default function HomePage() {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    getHome()
      .then(data => setState({ status: "success", data }))
      .catch(error => setState({ status: "error", error: error.message }));
  }, []);

  if (state.status === "loading") return <LoadingState />;
  if (state.status === "error") return <ErrorState message={state.error} />;
  if (state.data.items.length === 0) return <EmptyState />;

  return <div>{/* Renderizar artículos */}</div>;
}
```

---

## Variables de Entorno

**Requeridas:**
```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:5237

# Modo mock (opcional)
NEXT_PUBLIC_USE_MOCK_DATA=false
```

---

## Próximos Pasos

Con esta capa de datos lista, puedes:
1. Construir página Home consumiendo `getHome()`
2. Construir página Sección consumiendo `getSectionBySlug()`
3. Construir página Artículo consumiendo `getPublicArticleBySlug()`
4. Construir página Histórico consumiendo `getArchive()`

Todos con fallback automático a mocks si la API no está disponible.
