
# 🚀 Technische Specificatie: Anthem E-commerce Project

## 📋 1. PROJECT OVERZICHT

### Basisinformatie
- **Naam**: Anthem  
- **Type**: E-commerce productpagina applicatie
- **Beschrijving**: Moderne e-commerce winkel gebouwd met Next.js en Tailwind CSS
- **Package Manager**: pnpm ✅ (conform jouw regel)

### Tech Stack
- **Framework**: Next.js 15.3.3 (met App Router)
- **Frontend**: React 19.0.0 
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4
- **UI Components**: Headless UI v2.2.4
- **Icons**: Heroicons v2.2.0
- **Font**: Inter (Google Fonts)

## 🔧 2. TECHNISCHE SPECIFICATIES

### Dependencies Analysis
```json
// Core Dependencies
"next": "15.3.3"           // Latest Next.js met App Router
"react": "^19.0.0"         // Nieuwste React versie
"react-dom": "^19.0.0"     
"@headlessui/react": "^2.2.4"  // Accessible UI components
"@heroicons/react": "^2.2.0"   // SVG icon library

// Development Dependencies  
"typescript": "^5"         // TypeScript support
"tailwindcss": "^4"        // Latest Tailwind
"eslint": "^9"            // Code linting
"eslint-config-next": "15.3.3"
```

### Build Tools & Configuration
- **Next.js**: App Router configuratie
- **Turbopack**: Development build tool (`--turbopack` flag)
- **PostCSS**: Voor Tailwind CSS verwerking
- **ESLint**: Next.js TypeScript preset

### Directory Structuur
```
src/
├── app/                   # App Router (Next.js 13+)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles
│   └── favicon.ico
├── components/           # Component library ✅
│   ├── Footer/           # Footer functionaliteit
│   ├── Header/           # Navigation & header
│   ├── Dashboard/        # Product sectie
│   ├── Activity/         # Reviews sectie  
│   └── Clients/          # Related products
├── lib/                  # Utility functies
│   └── utils.ts         # Helper functies
└── data/                 # Data management
    └── data.ts          # Static product data
```

## 🏗️ 3. COMPONENT ARCHITECTUUR

### Organisatie Pattern ✅
- **Per Use Case Directories**: Components zijn georganiseerd per functionaliteit
- **Single Responsibility**: Elke directory heeft één duidelijk doel
- **Consistent Naming**: PascalCase voor componenten

### Component Patterns
```typescript
// Server Components (default in App Router)
export default function Reviews() {
  return (
    // JSX content
  )
}

// Import patterns
import { StarIcon } from '@heroicons/react/20/solid'
import { reviews } from '@/data/data'
import { classNames } from '@/lib/utils'
```

### Data Management
- **Static Data**: Centraal in `/src/data/data.ts`
- **Type Safety**: TypeScript zonder expliciete interfaces (kan verbeterd worden)
- **No State Management**: Momenteel alleen statische data

## 🎨 4. DESIGN SYSTEM

### Font System
```css
/* Primary Font */
--font-inter: Inter (Google Fonts)
font-sans: var(--font-inter)
```

### Kleurenschema
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

### Tailwind Configuratie
- **Versie**: v4 (nieuwste)
- **CSS Import**: `@import "tailwindcss"`
- **Custom Theme**: Inline theme configuratie
- **Responsive**: Mobile-first design

### UI Library
- **Headless UI**: Voor accessible components
- **Heroicons**: Consistent icon systeem
- **Custom Utility**: `classNames` helper voor conditional styling

## 💻 5. DEVELOPMENT CONVENTIES

### File Naming
- ✅ **Components**: PascalCase (`Header.tsx`, `ProductSection.tsx`)
- ✅ **Directories**: PascalCase voor component folders
- ✅ **Utilities**: camelCase (`utils.ts`)
- ✅ **Data**: lowercase (`data.ts`)

### Import Ordering
```typescript
// 1. External libraries
import { StarIcon } from '@heroicons/react/20/solid'

// 2. Internal data/utilities  
import { reviews } from '@/data/data'
import { classNames } from '@/lib/utils'
```

### TypeScript Usage
- **Path Aliases**: `@/*` voor src directory
- **Strict Mode**: Enabled
- **No Explicit Types**: Veel implicit typing (kan verbeterd worden)

## 🔍 6. CODING RULES ANALYSE

### ✅ Gevolgde Regels
1. **pnpm usage**: Correct gebruik van pnpm
2. **Component organizatie**: Per use case directories
3. **Next.js best practices**: App Router, Server Components
4. **TypeScript**: Correct geconfigureerd

### ⚠️ Verbeterpunten
1. **Type Definitions**: Ontbrekende interfaces voor data structuren
2. **Error Boundaries**: Geen error handling geïmplementeerd  
3. **Loading States**: Geen loading componenten
4. **Accessibility**: Kan uitgebreid worden (wel basis aria-labels)
5. **Performance**: Geen image optimization configuratie
6. **Security**: Gebruik van `dangerouslySetInnerHTML` zonder sanitization

### 🚀 Aanbevolen Toevoegingen
```typescript
// Type definitions
interface Product {
  id: number;
  name: string;
  price: string;
  // ...
}

// Error boundaries
export default function ErrorBoundary({error}: {error: Error}) {
  // ...
}

// Loading components
export default function Loading() {
  return <div>Loading...</div>
}
```

## 📜 7. COMMANDS & SCRIPTS

### Development
```bash
pnpm dev           # Start development server met Turbopack
pnpm build         # Production build
pnpm start         # Start production server
pnpm lint          # ESLint code checking
```

### Project Setup
```bash
pnpm install       # Install dependencies
```

