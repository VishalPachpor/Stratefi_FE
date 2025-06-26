# 📁 Stratefi Frontend - Project Structure Guide

## 🎯 **Current Issues & Reorganization Plan**

### ❌ **Current Problems**

- Mixed component organization (some in root, some in sections)
- Inconsistent naming conventions (kebab-case vs PascalCase)
- Poor categorization (UI mixed with features)
- Hard to understand feature boundaries
- Difficult for new developers to integrate

### ✅ **Proposed Better Structure**

```
Stratefi_FE/
├── 📱 app/                          # Next.js 13+ App Router
│   ├── (pages)/                     # Route groups
│   │   ├── about/
│   │   ├── contacts/
│   │   ├── markets/
│   │   ├── terms/
│   │   └── privacy-policy/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── robots.txt
│
├── 🧩 components/                   # Reusable Components
│   ├── features/                    # Feature-specific components
│   │   ├── asset-optimization/      # Asset optimization feature
│   │   │   ├── components/          # Sub-components
│   │   │   ├── hooks/               # Feature-specific hooks
│   │   │   ├── utils/               # Feature utilities
│   │   │   ├── types.ts             # Feature types
│   │   │   └── index.ts             # Main export
│   │   └── wallet-connection/       # Wallet feature
│   │
│   ├── layout/                      # Layout components
│   │   ├── navigation/              # Navigation components
│   │   ├── footer/                  # Footer components
│   │   └── sections/                # Page sections
│   │
│   ├── ui/                          # Pure UI components (shadcn/ui)
│   │   ├── base/                    # Basic UI elements
│   │   ├── feedback/                # Toasts, alerts, etc.
│   │   ├── forms/                   # Form components
│   │   ├── navigation/              # UI navigation elements
│   │   └── data-display/            # Data visualization
│   │
│   └── common/                      # Shared components
│
├── 🎣 hooks/                        # Custom React hooks
│   ├── ui/                          # UI-related hooks
│   ├── data/                        # Data fetching hooks
│   └── utils/                       # Utility hooks
│
├── 📚 lib/                          # Utilities & configurations
│   ├── config/                      # App configuration
│   ├── constants/                   # App constants
│   ├── types/                       # Global TypeScript types
│   ├── utils/                       # Utility functions
│   └── validations/                 # Form validation schemas
│
├── 🎨 styles/                       # Styling files
│   ├── globals.css
│   └── components/                  # Component-specific styles
│
├── 🌐 public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── 📄 docs/                         # Documentation
    ├── CONTRIBUTING.md
    ├── DEPLOYMENT.md
    └── API.md
```

## 🔄 **Migration Plan**

### Phase 1: Reorganize Components

1. Create feature-based directories
2. Move asset-optimization to features
3. Reorganize UI components by category
4. Separate layout components

### Phase 2: Standardize Naming

1. Use PascalCase for all component files
2. Use kebab-case for directories
3. Standardize export patterns

### Phase 3: Improve Documentation

1. Add README to each feature
2. Document component APIs
3. Create integration guides

## 🎯 **Benefits After Reorganization**

### For Developers

- **Clear feature boundaries** - Easy to find related code
- **Consistent patterns** - Predictable file locations
- **Better imports** - Shorter, cleaner import paths
- **Easier testing** - Co-located test files

### For Integration

- **Self-contained features** - Easy to copy/paste features
- **Clear dependencies** - Obvious what's needed
- **Better documentation** - Each feature has its own docs
- **Standardized structure** - Follows industry best practices

### For Maintenance

- **Easier refactoring** - Clear component relationships
- **Better code splitting** - Feature-based bundles
- **Simpler debugging** - Logical file organization
- **Scalable architecture** - Easy to add new features

## 📋 **Integration Guidelines**

### Adding New Features

1. Create feature directory in `components/features/`
2. Include: components, hooks, utils, types
3. Add feature README with API docs
4. Export through index.ts

### Using Existing Components

1. Import from feature index: `@/components/features/asset-optimization`
2. Use UI components: `@/components/ui/button`
3. Access utilities: `@/lib/utils`

### Best Practices

- Keep features self-contained
- Use absolute imports with path mapping
- Document component props and usage
- Follow established naming conventions
