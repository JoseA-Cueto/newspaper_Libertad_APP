# Página de Sección - LIBERTAD

## Ruta
`/seccion/[slug]`

## Descripción
Página dinámica que muestra artículos filtrados por sección. Mantiene el diseño consistente con la Home, con layout de periódico sobrio y text-first.

## Archivos Creados/Modificados

### Nuevos Archivos
1. **`app/seccion/[slug]/page.tsx`** - Página principal de sección
2. **`app/seccion/[slug]/loading.tsx`** - Estado de carga
3. **`app/seccion/[slug]/not-found.tsx`** - Manejo de 404
4. **`lib/section-metadata.ts`** - Metadatos de secciones (títulos, descripciones)

### Archivos Modificados
1. **`components/Pagination.tsx`** - Agregado soporte para preservar `pageSize` en query params
2. **`app/page.tsx`** - Actualizado para pasar `pageSize` a Pagination

## Funcionalidad

### Parámetros
- **`params.slug`**: Identificador de sección (politica, economia, sociedad, cultura, opinion)
- **Query params**:
  - `page`: Número de página (default: 1)
  - `pageSize`: Artículos por página (default: 10)

### Fuente de Datos
Usa `getSectionBySlug(slug, page, pageSize)` desde `services/publicApi.ts`:
- Intenta API real primero
- Fallback automático a mocks si falla
- Devuelve `null` si la sección no existe (dispara 404)

### Layout
**Desktop (lg+)**:
```
┌─────────────┬──────────────────────────┐
│   Sidebar   │   Header de Sección      │
│   (sticky)  ├──────────────────────────┤
│             │   Artículo Destacado     │
│ - Edición   ├──────────────────────────┤
│ - Otras     │   Grid 2x2 (arts 2-5)    │
│   secciones ├──────────────────────────┤
│ - Nav       │   Lista (arts 6+)        │
│ - Titulares ├──────────────────────────┤
│             │   Paginación             │
└─────────────┴──────────────────────────┘
```

**Mobile**:
```
┌──────────────────────────┐
│   Header de Sección      │
├──────────────────────────┤
│   Artículo Destacado     │
├──────────────────────────┤
│   Grid 1 columna (2-5)   │
├──────────────────────────┤
│   Lista (6+)             │
├──────────────────────────┤
│   Paginación             │
└──────────────────────────┘
```

### Sidebar Contextual (Desktop)
1. **Sección actual**
   - Fecha de edición
   - Link a actualidad

2. **Otras secciones**
   - Links a todas las demás secciones configuradas

3. **Navegación**
   - Inicio
   - Histórico

4. **En esta página** (si hay artículos)
   - Primeros 5 títulos de la página actual

### Metadatos de Sección
Definidos en `lib/section-metadata.ts`:

```typescript
{
  politica: {
    title: "Política",
    description: "Actualidad política nacional e internacional..."
  },
  economia: {
    title: "Economía",
    description: "Mercados, finanzas y políticas económicas..."
  },
  // ... etc
}
```

Si el slug no existe en el mapa:
- Se deriva el título capitalizando el slug
- Se usa descripción genérica
- Si el servicio devuelve `null`, se muestra 404

## Manejo de Estados

### Loading
Muestra `LoadingState` con mensaje "Cargando sección..."

### Error
Manejado por `app/error.tsx` global

### Empty
Si la sección existe pero no tiene artículos:
```
EmptyState con mensaje:
"No hay artículos en [Nombre Sección]"
```

### 404
Si `getSectionBySlug()` devuelve `null`:
- Se dispara `notFound()`
- Se renderiza `app/seccion/[slug]/not-found.tsx`
- Muestra mensaje y link para volver a Inicio

## Componentes Utilizados
- `PageSectionHeader` - Título y descripción de sección
- `SidebarLeft` - Navegación lateral contextual
- `ArticleCardText` - Artículo destacado y grid (1-5)
- `ArticleListItem` - Lista de más artículos (6+)
- `Pagination` - Navegación entre páginas (con `pageSize` preservado)
- `EmptyState` - Sin artículos
- `LoadingState` - Cargando

## Paginación
- Preserva `pageSize` en query params al navegar
- Formato de URL: `/seccion/[slug]?page=N&pageSize=M`
- Solo se muestra si `totalPages > 1`

## Secciones V1
- **politica** - Política
- **economia** - Economía
- **sociedad** - Sociedad
- **cultura** - Cultura
- **opinion** - Opinión

## Próximos Pasos (NO implementados aún)
- Página de Artículo (`/articulo/[slug]`)
- Página de Histórico (`/historico`)
- Páginas legales (colabora, aviso-legal, etc.)
