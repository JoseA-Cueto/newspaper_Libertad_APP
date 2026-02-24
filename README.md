# LIBERTAD - Frontend Público MVP

Frontend público de **LIBERTAD**, periódico digital independiente con enfoque text-first, arquitectura text-only y diseño sobrio inspirado en la prensa clásica.

## 📋 Descripción del Proyecto

LIBERTAD es un periódico digital cuyo frontend MVP proporciona una experiencia pública de lectura centrada en contenido editorial. El proyecto:

- **Es text-first**: sin imágenes en artículos, enfoque en claridad y legibilidad
- **Es sobrio y profesional**: diseño sin distracciones, estilo periódico clásico
- **Es separado del backend**: frontend independiente, conecta a .NET Minimal API
- **Es resiliente**: fallback automático a datos mock si la API falla (desarrollo/contingencia)

## 🛠️ Stack Tecnológico

- **Next.js** 15.5.12 (App Router, servidor side rendering)
- **TypeScript** 5
- **Tailwind CSS** 3.4.1 + plugin `@tailwindcss/typography`
- **React** 19.0.0
- **react-markdown** 9.0.1 (renderizado de contenido)

## ⚙️ Requisitos Previos

- **Node.js** >= 18.17 (recomendado 20+)
- **npm** 10+ (o pnpm/yarn si prefieres)
- **Backend API**: .NET Minimal API en `http://localhost:5237` (ver [Integración con Backend](#integración-con-backend))

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear archivo de variables de entorno

```bash
cp .env.example .env.local
```

Luego edita `.env.local` según tu entorno (ver [Variables de Entorno](#variables-de-entorno)).

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

Accede a `http://localhost:3000` en tu navegador.

### 4. Build para producción

```bash
npm run build
```

### 5. Ejecutar build en local (simula producción)

```bash
npm start
```

## 🔧 Variables de Entorno

Copia `.env.example` a `.env.local` y configura:

```
# URL base de la API real del backend
# Si está vacía o la API no responde, se usa fallback mock
NEXT_PUBLIC_API_BASE_URL=http://localhost:5237

# Fuerza uso de mock (desarrollo local sin backend)
# Valores: "true" o "false"
NEXT_PUBLIC_USE_MOCK_DATA=false
```

### Comportamiento según configuración

| Escenario | `NEXT_PUBLIC_API_BASE_URL` | Resultado |
|-----------|---------------------------|-----------|
| Backend activo, local | `http://localhost:5237` | ✅ Consume API real |
| Backend inactivo, dev | vacío o error | ↪️ Fallback a mock |
| Desarrollo sin backend | `false` en `NEXT_PUBLIC_USE_MOCK_DATA` | ✅ Usa mock siempre |
| Deploy remoto | `https://api.example.com` | ✅ Consume API remota |

## 📡 Modo Mock/Fallback (Importante)

### Qué es

El frontend incluye datos mock locales (en `mocks/data.ts`) que se usan automáticamente si:
- La API real no está disponible
- La URL no está configurada
- Ocurre un error de conexión/timeout

### Por qué existe

- **Desacoplamiento**: frontend y backend se desarrollan independientemente
- **Resiliencia**: el frontend sigue funcionando aunque el backend esté down
- **Desarrollo local**: posibilidad de trabajar sin backend levantado
- **Demo**: mostrar la app sin datos reales

### Verificar modo de datos

En los logs del navegador (`console`) verá un mensaje si está usando mock:
```
API request failed for /api/public/..., using mock fallback
```

### Migrar a API real

1. Configurar `NEXT_PUBLIC_API_BASE_URL` con URL correcta del backend
2. Revisar logs para confirmar: no debe aparecer "mock fallback"
3. Verificar datos mostrados vs datos esperados del backend

## 📁 Estructura del Proyecto

```
newspaper_Libertad_APP/
├── app/                          # Páginas y rutas (Next.js App Router)
│   ├── layout.tsx                # Layout global (Header, Footer, CookieNotice)
│   ├── page.tsx                  # Página de inicio (/)
│   ├── articulo/[slug]/          # Detalle de artículo
│   ├── seccion/[slug]/           # Artículos de sección
│   ├── historico/                # Archivo de ediciones anteriores
│   ├── aviso-legal/              # Página legal
│   ├── privacidad/               # Política de privacidad
│   └── globals.css               # Estilos globales
│
├── components/                   # Componentes React reutilizables
│   ├── Header.tsx                # Navegación principal (sticky)
│   ├── Footer.tsx                # Pie de página
│   ├── SidebarLeft.tsx           # Sidebar contextual (desktop)
│   ├── ArticleCardText.tsx       # Tarjeta de artículo destacado
│   ├── ArticleListItem.tsx       # Item de lista de artículos
│   ├── Pagination.tsx            # Navegación entre páginas
│   ├── PageSectionHeader.tsx     # Encabezado de sección
│   ├── CookieNotice.tsx          # Banner de cookies
│   ├── States.tsx                # Loading, Error, Empty
│   └── index.ts                  # Exportaciones
│
├── lib/                          # Utilidades y helpers
│   ├── utils.ts                  # Funciones: formatDate, truncateText, etc.
│   └── section-metadata.ts       # Metadatos de secciones
│
├── services/                     # Capa de datos (API client)
│   ├── publicApi.ts              # Funciones: getHome(), getSectionBySlug(), etc.
│   └── index.ts                  # Exportaciones
│
├── types/                        # TypeScript interfaces
│   └── index.ts                  # Tipos globales: ArticleSummary, ArticleDetail, etc.
│
├── mocks/                        # Datos mock para desarrollo/fallback
│   └── data.ts                   # Artículos, secciones, helpers mock
│
├── .env.example                  # Template de variables
├── .env.local                    # Variables locales (git ignored)
├── tailwind.config.ts            # Config de Tailwind + extensiones
├── tsconfig.json                 # Config de TypeScript
├── package.json                  # Dependencias y scripts
└── README.md                     # Este archivo
```

## 🌐 Rutas Públicas Implementadas

| Ruta | Descripción | Parámetros |
|------|-------------|-----------|
| `/` | Página de inicio (portada) | `page`, `pageSize` (paginación) |
| `/seccion/[slug]` | Artículos de sección | slug: `politica`, `economia`, `sociedad`, `cultura`, `opinion` |
| `/articulo/[slug]` | Detalle completo de artículo | slug: identificador único |
| `/historico` | Archivo (artículos >7 días) | `page`, `pageSize` (paginación) |
| `/aviso-legal` | Información legal | — |
| `/privacidad` | Política de privacidad | — |

**Nota**: Banner de cookies integrado en layout global (sin página separada).

## ✅ Alcance del MVP (v1)

### ✓ Incluye

- ✅ Frontend público completo (6 rutas principales)
- ✅ Lectura de artículos con markdown renderizado
- ✅ Navegación por secciones (5 secciones configurables)
- ✅ Histórico/archivo de artículos
- ✅ Páginas legales mínimas (Aviso Legal, Privacidad)
- ✅ Banner de cookies con persistencia local
- ✅ Responsive completo (móvil, tablet, desktop)
- ✅ Capa de datos con API + fallback mock
- ✅ Diseño text-first, sin imágenes

### ✗ No incluye (futuros)

- ❌ Panel editor de artículos
- ❌ Autenticación/Login (JWT, OAuth)
- ❌ Formularios de contacto/colaboración
- ❌ Sistema de comentarios
- ❌ Newsletter
- ❌ Imágenes en artículos
- ❌ Analítica (Google Analytics, Segment, etc.)

## 🔗 Integración con Backend

### Endpoints públicos esperados

El frontend espera estos endpoints en el backend:

```
GET /api/health                              # Health check
GET /api/public/home?page=1&pageSize=10     # Artículos home (7 últimos días)
GET /api/public/sections/[slug]?page=1&pageSize=10  # Artículos por sección
GET /api/public/articles/[slug]             # Detalle de artículo
GET /api/public/archive?page=1&pageSize=10  # Artículos archivados (>7 días)
```

### Configuración CORS

El backend debe permitir requests desde `http://localhost:3000` (desarrollo) y desde el dominio de deploy (producción).

Ejemplo en .NET:

```csharp
app.UseCors(builder => builder
    .WithOrigins("http://localhost:3000", "https://libertad.example.com")
    .AllowAnyMethod()
    .AllowAnyHeader());
```

### Apuntar a backend remoto

En producción, actualiza `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.libertad.example.com
```

## 📊 Secciones Configurables (v1)

Secciones predefinidas en `lib/section-metadata.ts`:

- **politica** - Política nacional e internacional
- **economia** - Mercados, finanzas, economía
- **sociedad** - Temas sociales, educación, salud
- **cultura** - Arte, literatura, cine, música
- **opinion** - Columnas, editoriales, análisis

Para agregar/modificar secciones, edita `lib/section-metadata.ts` y `mocks/data.ts`.

## 🧪 Testing

*(Futuro)*

- Actualmente sin suite de tests automatizados
- Se recomienda agregar: Jest + React Testing Library + Playwright

## 📝 Convenciones de Código

- **TypeScript strict**: tipos explícitos
- **Componentes funcionales**: solo componentes de función
- **Server components por defecto**: "use client" solo donde sea necesario
- **Rutas dinámicas**: params y searchParams como Promise (Next.js 15+)
- **Exports centralizados**: cada carpeta con `index.ts`

## 🚀 Próximos Pasos Sugeridos

1. **Resolver base de datos del backend** (PostgreSQL + EF Core)
2. **Pruebas end-to-end** (Playwright, Cypress)
3. **Deploy inicial** (Vercel para frontend, Azure/AWS para backend)
4. **Configurar dominio** (DNS, SSL)
5. **Primeras publicaciones reales** (carga de artículos)
6. **Monitoreo** (error tracking, logs)
7. **Mejoras v2** (panel editor, auth, imágenes, comentarios)

## 📞 Contacto

Para preguntas sobre el desarrollo:
- Email: [contacto@libertad.local] (placeholder)
- Issues: GitHub repo del proyecto

## 📄 Licencia

*(Definir según proyecto)*

---

**Última actualización**: 24 de febrero de 2026
