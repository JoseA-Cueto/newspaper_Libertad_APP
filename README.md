# Frontend MVP - LIBERTAD Newspaper

## Estructura del proyecto

- `app/` - App Router de Next.js + layouts + páginas
- `components/` - Componentes reutilizables UI
- `lib/` - Utilidades y helpers
- `services/` - Lógica de negocios (cliente API, etc.)
- `types/` - Tipos e interfaces TypeScript
- `mocks/` - Datos mock para desarrollo

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Compilación

```bash
npm run build
npm start
```

## Variables de entorno

Crea `.env.local` basado en `.env.example`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5237
```
