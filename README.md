# 🎮 Pokémon Team Manager - Velora HR

Una aplicación web desarrollada con React para gestionar equipos Pokémon, realizar búsquedas y combates entre equipos.

## 📋 Características

- **Pokédex completa** con búsqueda por nombre y filtrado por tipo
- **Gestión de equipos** con creación, visualización y ordenamiento
- **Sistema de combate** entre equipos con motor de batalla
- **Interfaz responsiva** con diseño moderno usando Tailwind CSS
- **Estado global** gestionado con Zustand
- **Tests unitarios** con Jest y Testing Library

## 🚀 Instalación y Ejecución

### Prerrequisitos

- **Node.js**: v18.0.0 o superior
- **npm**: v8.0.0 o superior

### Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]
cd velora-hr

# Instalar dependencias
npm install
```

### Ejecución en Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Construcción para Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build de producción
npm run preview
```

### Ejecución de Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Linting
npm run lint
```

## 🛠️ Tecnologías y Versiones

### Core
- **React**: ^19.2.0
- **Vite**: ^7.2.4
- **Node.js**: ≥18.0.0

### Estado y Navegación
- **Zustand**: ^5.0.10 (Estado global)
- **React Router DOM**: ^7.12.0 (Enrutamiento)
- **React Query**: ^5.90.16 (Gestión de datos asincrónicos)

### UI/UX
- **Tailwind CSS**: ^4.1.18 (Styling)
- **Phosphor React**: ^1.4.1 (Iconos)
- **React Hot Toast**: ^2.6.0 (Notificaciones)
- **DND Kit**: ^6.3.1 / ^10.0.0 (Drag & Drop)

### Testing
- **Jest**: ^30.2.0 (Testing framework)
- **Testing Library**: ^16.3.1 (Testing utilities)
- **Jest DOM**: ^10.4.1 (Matchers adicionales)

### Desarrollo
- **ESLint**: ^9.39.1 (Linting)
- **Babel**: ^7.28.6 (Transpilación para tests)

## 📁 Estructura de Carpetas

```
src/
├── app/                          # Configuración principal de la aplicación
│   ├── App.jsx                   # Componente raíz con rutas
│   ├── App.css                   # Estilos globales
│   └── queryClient.js            # Configuración React Query
│
├── features/                     # Features organizadas por dominio
│   ├── pokemon/                  # Feature Pokédex
│   │   ├── api/                  # Servicios API
│   │   │   ├── getPokemons.js    # Fetch de pokémons
│   │   │   └── getTypes.js       # Fetch de tipos
│   │   ├── components/           # Componentes UI
│   │   │   ├── PokemonCard.jsx   # Card individual de pokémon
│   │   │   └── Select.jsx        # Componente select reutilizable
│   │   ├── hooks/                # Custom hooks
│   │   │   ├── usePokemons.js    # Hook para datos de pokémons
│   │   │   └── useTypes.js       # Hook para tipos de pokémon
│   │   ├── page/                 # Páginas del feature
│   │   │   └── PokemonPage.jsx   # Página principal del Pokédex
│   │   └── utils/                # Utilidades específicas
│   │       └── pokemonTypeStyles.js # Estilos por tipo
│   │
│   ├── teams/                    # Feature Gestión de Equipos
│   │   ├── components/           # Componentes de equipos
│   │   │   ├── TeamsCompoent.jsx # Lista de equipos
│   │   │   ├── TeamPokemonList.jsx # Lista de pokémons del equipo
│   │   │   └── SortablePokemonCard.jsx # Card con drag & drop
│   │   ├── page/                 # Páginas de equipos
│   │   │   ├── TeamsPage.jsx     # Página principal de equipos
│   │   │   └── CreateTeamPage.jsx # Página de creación de equipos
│   │   ├── utils/                # Utilidades de ordenamiento
│   │   │   └── orderPokemons.js  # Funciones de ordenamiento
│   │   └── test/                 # Tests del feature
│   │       ├── orderPokemons.test.js # Tests de utilidades
│   │       └── TeamsComponent.test.js # Tests de componente
│   │
│   └── battle/                   # Feature Sistema de Combate
│       ├── page/                 # Páginas de batalla
│       │   └── BattlePage.jsx    # Arena de combate
│       └── utils/                # Motor de batalla
│           └── battleEngine.js   # Lógica de combates
│
├── shared/                       # Código compartido entre features
│   └── layout/                   # Componentes de layout
│       ├── AppLayout.jsx         # Layout principal con sidebar
│       ├── Sidebar.jsx           # Navegación lateral
│       └── index.js              # Barrel exports
│
├── store/                        # Estado global con Zustand
│   ├── useFilterStore.js         # Store de filtros y búsquedas
│   ├── useTeamStore.js           # Store de gestión de equipos
│   └── useBattleStore.js         # Store del sistema de combate
│
├── styles/                       # Estilos globales
├── main.jsx                      # Entry point de la aplicación
├── index.css                     # CSS global y Tailwind
└── setupTests.js                 # Configuración para Jest
```

## 🏗️ Arquitectura del Código

### **Patrón Feature-Based**
La aplicación sigue una arquitectura basada en features, donde cada funcionalidad principal (`pokemon`, `teams`, `battle`) tiene su propia carpeta con:
- Componentes UI específicos
- Lógica de negocio (hooks, utils)
- Servicios API
- Tests unitarios

### **Estado Global con Zustand**
- **useFilterStore**: Maneja filtros de búsqueda y estados de UI
- **useTeamStore**: Gestiona CRUD de equipos y operaciones de pokémons
- **useBattleStore**: Controla el sistema de combates y resultados

### **Gestión de Datos**
- **React Query**: Cache automático, refetch y sincronización de datos de la PokeAPI
- **Custom Hooks**: Abstrae la lógica de datos y la hace reutilizable
- **API Services**: Capa de abstracción para llamadas HTTP

### **Componentes Reutilizables**
- **Layout System**: Sidebar + Content con React Router Outlet
- **UI Components**: Select, Cards, Botones con props configurables
- **Shared Components**: Componentes que se usan across features

### **Testing Strategy**
- **Unit Tests**: Funciones puras y utilidades
- **Component Tests**: Testing Library para UI y interacciones
- **Mocking**: Store y dependencias para testing aislado

### **Routing**
- **React Router v7**: Rutas anidadas con layouts
- **Feature Routing**: Cada feature maneja sus propias sub-rutas
- **Navigation**: Sidebar con estado activo automático

## 🎯 Funcionalidades Principales

1. **Pokédex Interactiva**
   - Paginación infinita
   - Búsqueda por nombre
   - Filtrado por tipo
   - Vista de cards responsiva

2. **Gestión de Equipos**
   - Creación de equipos de 6 pokémons
   - Drag & drop para reordenar
   - Ordenamiento automático (ataque, nombre, aleatorio)
   - Validaciones (duplicados, límites)

3. **Sistema de Combate**
   - Selección de equipos rival
   - Motor de batalla por turnos
   - Visualización de resultados

---

Desarrollado para **Velora HR** - Prueba Técnica Frontend React
