# 🚀 Stratefi Frontend

> Advanced DeFi yield optimization powered by AI. Maximize your returns with intelligent strategy selection and real-time market analysis.

## 📋 **Table of Contents**

- [🎯 Overview](#overview)
- [🏗️ Project Structure](#project-structure)
- [🚀 Quick Start](#quick-start)
- [🧩 Components](#components)
- [🔌 Integration Guide](#integration-guide)
- [📚 Documentation](#documentation)

## 🎯 **Overview**

Stratefi is a modern Next.js 13+ application built with TypeScript, Tailwind CSS, and Framer Motion. The project uses a feature-based architecture for better organization and maintainability.

### **Key Features**

- ✅ **Asset Optimization Engine** - AI-powered DeFi strategy optimization
- ✅ **Real-time Market Intelligence** - Live market data and analysis
- ✅ **Wallet Integration** - Seamless wallet connection with Privy
- ✅ **Responsive Design** - Mobile-first design approach
- ✅ **Modern UI** - Built with shadcn/ui components

## 🏗️ **Project Structure**

```
Stratefi_FE/
├── 📱 app/                              # Next.js 13+ App Router
│   ├── (pages)/                         # Route groups
│   │   ├── about/
│   │   ├── contacts/
│   │   ├── markets/
│   │   ├── terms/
│   │   └── privacy-policy/
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Homepage
│   ├── providers.tsx                    # Context providers
│   └── robots.txt                       # SEO configuration
│
├── 🧩 components/                       # Reusable Components
│   ├── features/                        # Feature-specific components
│   │   ├── asset-optimization/          # Asset optimization feature
│   │   │   ├── AssetOptimization.tsx    # Main component
│   │   │   ├── AssetList.tsx           # Asset selection
│   │   │   ├── ProtocolList.tsx        # Protocol display
│   │   │   ├── OptimizationPanel.tsx   # Main optimization UI
│   │   │   ├── utils/                  # Feature utilities
│   │   │   │   ├── url-utils.ts        # URL handling
│   │   │   │   └── optimization.ts     # Optimization logic
│   │   │   ├── README.md               # Feature documentation
│   │   │   └── index.ts                # Feature exports
│   │   └── wallet-connection/           # Wallet connection feature
│   │       ├── WalletConnectButton.tsx # Wallet button
│   │       └── index.ts                # Wallet exports
│   │
│   ├── layout/                          # Layout components
│   │   ├── navigation/                  # Navigation components
│   │   │   ├── Navbar.tsx              # Main navigation
│   │   │   └── index.ts                # Navigation exports
│   │   └── sections/                    # Page sections
│   │       ├── hero-section.tsx        # Hero section
│   │       ├── mode-comparison.tsx     # Mode comparison
│   │       ├── real-time-intelligence.tsx # Intelligence section
│   │       ├── how-it-works.tsx        # How it works
│   │       ├── footer.tsx              # Footer
│   │       └── index.ts                # Section exports
│   │
│   └── ui/                              # Pure UI components (shadcn/ui)
│       ├── button.tsx                   # Button component
│       ├── card.tsx                     # Card components
│       ├── badge.tsx                    # Badge component
│       ├── input.tsx                    # Input component
│       ├── tooltip.tsx                  # Tooltip component
│       ├── particle-system.tsx         # Particle effects
│       ├── ai-agent-avatar.tsx         # AI avatar
│       ├── live-market-feed.tsx        # Market feed
│       └── ... (other UI components)
│
├── 🎣 hooks/                            # Custom React hooks
│   ├── use-mobile.tsx                   # Mobile detection
│   └── use-toast.ts                     # Toast notifications
│
├── 📚 lib/                              # Utilities & configurations
│   ├── fonts.ts                         # Font configuration
│   └── utils.ts                         # Utility functions
│
├── 🎨 styles/                           # Styling files
│   └── globals.css                      # Global styles
│
├── 🌐 public/                           # Static assets
│   ├── logo.png                         # Brand assets
│   └── ... (other static files)
│
└── 📄 docs/                             # Documentation
    └── PROJECT_STRUCTURE.md             # Detailed structure guide
```

## 🚀 **Quick Start**

### **Prerequisites**

- Node.js 18+
- npm, yarn, or pnpm

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd Stratefi_FE

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your environment variables

# Run development server
npm run dev
```

### **Environment Variables**

```env
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_BASE_RPC_URL=your_base_rpc_url
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

## 🧩 **Components**

### **Feature Components**

#### **Asset Optimization** (`/components/features/asset-optimization`)

The core feature for DeFi asset optimization.

```typescript
import AssetOptimization from "@/components/features/asset-optimization";

// Usage
<AssetOptimization />;
```

**Key Features:**

- Asset selection from wallet
- Protocol comparison and analysis
- AI-powered research notes
- View Details redirection to Stratefi app
- Real-time optimization progress

#### **Wallet Connection** (`/components/features/wallet-connection`)

Handles wallet connection with Privy integration.

```typescript
import { WalletConnectButton } from "@/components/features/wallet-connection";

// Usage
<WalletConnectButton />;
```

### **Layout Components**

#### **Navigation** (`/components/layout/navigation`)

```typescript
import { Navbar } from "@/components/layout/navigation";

// Usage
<Navbar />;
```

#### **Sections** (`/components/layout/sections`)

```typescript
import {
  HeroSection,
  ModeComparison,
  RealTimeIntelligence,
  HowItWorks,
  Footer
} from '@/components/layout/sections';

// Usage in pages
<HeroSection />
<ModeComparison />
<RealTimeIntelligence />
<HowItWorks />
<Footer />
```

### **UI Components**

All UI components follow the shadcn/ui pattern:

```typescript
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Usage
<Button variant="outline">Click me</Button>
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Content</CardContent>
</Card>
<Badge variant="secondary">New</Badge>
```

## 🔌 **Integration Guide**

### **Adding New Features**

1. **Create Feature Directory**

```bash
mkdir -p components/features/your-feature
```

2. **Create Feature Structure**

```
components/features/your-feature/
├── YourFeature.tsx       # Main component
├── components/           # Sub-components
├── hooks/               # Feature-specific hooks
├── utils/               # Feature utilities
├── types.ts             # Feature types
├── README.md            # Feature documentation
└── index.ts             # Feature exports
```

3. **Export from Index**

```typescript
// components/features/your-feature/index.ts
export { default } from "./YourFeature";
export * from "./types";
```

4. **Import in Pages**

```typescript
import YourFeature from "@/components/features/your-feature";
```

### **Using Existing Features**

#### **Asset Optimization Integration**

```typescript
import AssetOptimization from "@/components/features/asset-optimization";

// The component handles:
// - Asset selection from wallet
// - Protocol analysis and comparison
// - AI research generation
// - View Details redirection to Stratefi app

function YourPage() {
  return (
    <div>
      <AssetOptimization />
    </div>
  );
}
```

#### **URL Redirection** (for View Details)

```typescript
import {
  redirectToStratefi,
  buildStratefiUrl,
} from "@/components/features/asset-optimization/utils/url-utils";

// Redirect to Stratefi app with context
redirectToStratefi(asset, protocol, action, openInNewTab);

// Or build URL manually
const url = buildStratefiUrl(asset, protocol, action);
// Returns: "https://agent.xyz/asset?token=eth&pool=aave-eth&action=lend"
```

### **Best Practices**

1. **Import Organization**

```typescript
// External imports first
import React from "react";
import { motion } from "framer-motion";

// Internal imports by category
import { Button } from "@/components/ui/button";
import { YourFeature } from "@/components/features/your-feature";
import { useYourHook } from "@/hooks/use-your-hook";
import { utils } from "@/lib/utils";
```

2. **Component Structure**

```typescript
// Always use TypeScript interfaces
interface YourComponentProps {
  title: string;
  optional?: boolean;
}

// Export component with proper typing
export default function YourComponent({ title, optional }: YourComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {optional && <p>Optional content</p>}
    </div>
  );
}
```

3. **Feature Self-Containment**

- Keep features independent
- Include all necessary types, hooks, and utilities
- Document feature APIs in README
- Export through index.ts

## 📚 **Documentation**

### **Available Scripts**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### **Key Dependencies**

- **Next.js 13+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Privy** - Wallet connection
- **shadcn/ui** - UI component library
- **Lucide React** - Icons

### **Path Mapping**

The project uses absolute imports with path mapping:

```typescript
// Instead of relative imports
import Component from "../../../components/ui/button";

// Use absolute imports
import { Button } from "@/components/ui/button";
```

**Path Mappings:**

- `@/components/*` → `./components/*`
- `@/app/*` → `./app/*`
- `@/lib/*` → `./lib/*`
- `@/hooks/*` → `./hooks/*`
- `@/styles/*` → `./styles/*`

### **Need Help?**

1. **Feature Documentation** - Check individual feature README files
2. **Component API** - Look at TypeScript interfaces in component files
3. **Structure Guide** - See `docs/PROJECT_STRUCTURE.md`
4. **Integration Examples** - Check existing component usage in `app/page.tsx`

---

**Built with ❤️ by the Stratefi Team**
