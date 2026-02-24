# Página Home - LIBERTAD

## Estructura Implementada

### Archivos Creados/Modificados:

**Páginas:**
1. `app/page.tsx` - Portada principal (Home) ✅
2. `app/error.tsx` - Página de error ✅
3. `app/loading.tsx` - Estado de carga ✅

---

## Estructura de la Portada

### Layout

```
┌─────────────────────────────────────────────────┐
│              Header (sticky)                     │
├─────────────────────────────────────────────────┤
│          Tagline / Masthead                     │
├───────────────┬─────────────────────────────────┤
│   Sidebar     │   Main Content                  │
│   (Desktop)   │   ├─ Edition Banner             │
│               │   ├─ Hero Article               │
│   - Edición   │   ├─ Secondary Grid (2x2)       │
│   - Secciones │   ├─ More Articles List         │
│   - Piezas    │   └─ Pagination                 │
├───────────────┴─────────────────────────────────┤
│              Footer                              │
└─────────────────────────────────────────────────┘
```

**Responsive:**
- Desktop (lg+): Sidebar visible
- Mobile: Solo contenido principal (sidebar oculto)

---

## Funcionalidad

### Query Params

**Soportados:**
- `page` - Número de página (default: 1)
- `pageSize` - Items por página (default: 10)

**Ejemplos:**
```
/                    → página 1, 10 items
/?page=2             → página 2, 10 items
/?page=2&pageSize=20 → página 2, 20 items
```

### Consumo de Datos

**Función:** `getHome(page, pageSize)`

**Flujo:**
1. Lee query params de URL (Next.js 15 async)
2. Llama a `getHome()` desde `services/publicApi.ts`
3. Si API está disponible → usa API real
4. Si API falla → fallback automático a mocks
5. Renderiza contenido

---

## Distribución de Artículos

**Hero (Primer artículo):**
- Título grande (4xl-5xl)
- Subtítulo destacado
- Sección y fecha

**Secondary Grid (Siguientes 4 artículos):**
- Grid 2x2 en desktop
- Columna única en móvil
- Usa `ArticleCardText`

**More Articles (Resto):**
- Lista compacta
- Usa `ArticleListItem`
- Título "Más artículos"

**Paginación:**
- Visible solo si `totalPages > 1`
- Links a `/?page=N`
- Componente `Pagination` reutilizable

---

## Sidebar Left

**Secciones configuradas:**

**1. Edición:**
- Fecha actual
- Link "Actualidad" (activo)

**2. Secciones:**
- Inicio
- Política
- Economía
- Sociedad
- Cultura
- Opinión
- Histórico
- Colabora

**3. Piezas de hoy:**
- Primeros 5 artículos de la página
- Links a detalle de artículo

**Comportamiento:**
- Visible solo en desktop (lg+)
- Sticky positioning
- Oculto en móvil

---

## Estados

**Loading:**
- `app/loading.tsx` - Suspense automático de Next.js
- Usa `LoadingState` component

**Error:**
- `app/error.tsx` - Error boundary de Next.js
- Usa `ErrorState` component
- Client component ("use client")

**Empty:**
- Renderizado inline en `page.tsx`
- Usa `EmptyState` component
- Mensaje: "No hay artículos disponibles"

---

## Estilos / UX

**Masthead:**
- Fondo blanco
- Texto centrado
- "Periódico de criterio, memoria y cultura cívica"
- Border inferior

**Edition Banner:**
- Border grueso inferior (4px)
- Fecha actual formateada
- "Edición del [fecha]"

**Hero Article:**
- Título grande con hover effect
- Sección en mayúsculas
- Subtítulo en cursiva con border-left
- Padding generoso

**Grid Secundario:**
- Background gap gris (#e5e7eb)
- Cards con fondo blanco
- Responsive (1 col móvil, 2 cols desktop)

**Lista de Artículos:**
- Border top grueso
- Título "Más artículos" con border
- Items compactos con borders sutiles

**Color Scheme:**
- Fondo general: gray-50
- Contenido: blanco
- Texto: gray-900, gray-700, gray-600
- Links: blue-700 → blue-900
- Borders: gray-300, gray-200, gray-900

---

## Tipos TypeScript

```typescript
interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
}
```

**Next.js 15:** `searchParams` es async (Promise)

---

## Componentes Usados

- `SidebarLeft` - Navegación lateral
- `ArticleCardText` - Cards de artículos grandes
- `ArticleListItem` - Items de lista compactos
- `Pagination` - Paginación con links
- `EmptyState` - Estado vacío
- `LoadingState` - Cargando
- `ErrorState` - Error

---

## Compilación

✅ **Build exitoso**
- Ruta: `/` (Dynamic SSR)
- Sin errores TypeScript
- Sin errores de runtime

---

## Próximos Pasos

Con Home implementado, puedes crear:

1. **Página Sección** - `/seccion/[slug]`
2. **Página Artículo** - `/articulo/[slug]`
3. **Página Histórico** - `/historico`
4. **Páginas Legales** - `/colabora`, `/aviso-legal`, etc.

Todas reutilizarán los mismos componentes y servicios.
