# Componentes UI - LIBERTAD Frontend

## Componentes Creados

### 1. **Header** (modificado)
**Archivo:** `components/Header.tsx`

Navegación principal sticky con menú completo:
- **Desktop**: Enlaces horizontales (Inicio, Política, Economía, Sociedad, Cultura, Opinión, Histórico, Colabora)
- **Móvil**: Botón hamburguesa que abre `MobileMenu`
- Responsive, sticky top, accesible

**Uso:**
```tsx
import Header from "@/components/Header";
// Ya está en layout.tsx
```

---

### 2. **MobileMenu**
**Archivo:** `components/MobileMenu.tsx`

Menú desplegable para móvil con overlay:
- Cierre automático al navegar
- Cierre con tecla Escape
- Overlay oscuro con click para cerrar
- Previene scroll del body cuando está abierto

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ label: string; href: string }>;
}
```

**Uso:**
```tsx
<MobileMenu
  isOpen={isMobileMenuOpen}
  onClose={() => setIsMobileMenuOpen(false)}
  links={navLinks}
/>
```

---

### 3. **SidebarLeft**
**Archivo:** `components/SidebarLeft.tsx`

Sidebar contextual para desktop (oculto en móvil):
- Sticky positioning
- Secciones configurables con items
- Soporte para estado activo
- Bloques con títulos y enlaces

**Props:**
```typescript
interface SidebarSection {
  title: string;
  items: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
}

interface SidebarLeftProps {
  sections: SidebarSection[];
  className?: string;
}
```

**Uso:**
```tsx
<SidebarLeft
  sections={[
    {
      title: "Secciones",
      items: [
        { label: "Política", href: "/seccion/politica" },
        { label: "Economía", href: "/seccion/economia", isActive: true },
      ],
    },
  ]}
/>
```

---

### 4. **ArticleCardText**
**Archivo:** `components/ArticleCardText.tsx`

Card de artículo para portadas/secciones (text-only):
- Título destacado (h2)
- Subtítulo opcional
- Sección y fecha (meta)
- Hover effects
- Border inferior

**Props:**
```typescript
interface ArticleCardTextProps {
  title: string;
  subtitle?: string | null;
  sectionName?: string | null;
  sectionSlug?: string | null;
  publishedAt?: string | null;
  href: string;
  className?: string;
}
```

**Uso:**
```tsx
<ArticleCardText
  title="Reforma constitucional avanza"
  subtitle="Primera lectura de la nueva propuesta"
  sectionName="Política"
  sectionSlug="politica"
  publishedAt="2026-02-24T10:00:00Z"
  href="/articulo/reforma-constitucional"
/>
```

---

### 5. **ArticleListItem**
**Archivo:** `components/ArticleListItem.tsx`

Variante compacta para listados:
- Título (h3)
- Meta (sección/fecha)
- Más pequeño que ArticleCardText
- Para sidebars o listados densos

**Props:**
```typescript
interface ArticleListItemProps {
  title: string;
  sectionName?: string | null;
  sectionSlug?: string | null;
  publishedAt?: string | null;
  href: string;
  className?: string;
}
```

**Uso:**
```tsx
<ArticleListItem
  title="Mercados reaccionan positivamente"
  sectionName="Economía"
  sectionSlug="economia"
  publishedAt="2026-02-24T09:00:00Z"
  href="/articulo/mercados-reaccionan"
/>
```

---

### 6. **Pagination**
**Archivo:** `components/Pagination.tsx`

Paginación simple prev/next:
- Dos modos: **Links** (SSR) o **Callbacks** (Client)
- Deshabilitado cuando no hay más páginas
- Muestra página actual y total

**Props:**
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;  // Para client components
  baseUrl?: string;                        // Para SSR/Links
  className?: string;
}
```

**Uso (con Links):**
```tsx
<Pagination
  currentPage={2}
  totalPages={10}
  baseUrl="/historico?page="
/>
```

**Uso (con Callbacks):**
```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

---

### 7. **Estados (LoadingState, ErrorState, EmptyState)**
**Archivo:** `components/States.tsx`

Tres componentes para estados de carga/error/vacío:

**LoadingState:**
```tsx
<LoadingState message="Cargando artículos..." />
```

**ErrorState:**
```tsx
<ErrorState
  title="Error al cargar"
  message="No se pudo conectar con el servidor"
  onRetry={() => refetch()}
/>
```

**EmptyState:**
```tsx
<EmptyState
  title="Sin artículos"
  message="No hay artículos publicados en esta sección"
/>
```

---

### 8. **PageSectionHeader**
**Archivo:** `components/PageSectionHeader.tsx`

Cabecera de página/sección:
- Título grande (h1)
- Descripción opcional
- Border inferior destacado
- Para páginas de sección, histórico, etc.

**Props:**
```typescript
interface PageSectionHeaderProps {
  title: string;
  description?: string | null;
  className?: string;
}
```

**Uso:**
```tsx
<PageSectionHeader
  title="Política"
  description="Noticias de política nacional e internacional"
/>
```

---

## Exportación Centralizada

Todos los componentes se pueden importar desde `@/components`:

```tsx
import {
  Header,
  Footer,
  MobileMenu,
  SidebarLeft,
  ArticleCardText,
  ArticleListItem,
  Pagination,
  PageSectionHeader,
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components";
```

---

## Estilo Visual

- **Text-first**: Sin imágenes
- **Tipografía**: Jerarquía clara, legible
- **Colores**: Grises + azul para links
- **Spacing**: Limpio y profesional
- **Responsive**: Desktop optimizado, móvil funcional
- **Accesibilidad**: ARIA labels, semántica HTML

---

## Próximos Pasos

Con estos componentes ya puedes construir:
- Página Home (lista de artículos recientes)
- Página Sección (artículos por categoría)
- Página Histórico (archivo)
- Página Artículo (detalle con markdown)
- Páginas estáticas (colabora, legal, etc.)
