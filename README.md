This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📁 Folder Structure & Guidelines

Follow this structure strictly to maintain consistency across the project.

---

### 📝 Quick Reference

| Folder               | Purpose                           | When to Use                                  |
| -------------------- | --------------------------------- | -------------------------------------------- |
| `app/`               | **Pages & Routes** (Frontend)     | Creating new pages, layouts, API routes      |
| `components/`        | **React Components** (Frontend)   | Creating reusable UI, forms, page sections   |
| `components/ui/`     | **Base UI Components**            | Buttons, inputs, cards, dialogs (shadcn/ui)  |
| `components/common/` | **Shared Components**             | Header, Footer, Navbar, Sidebar              |
| `lib/`               | **Library Config**                | Setting up axios, validators, API clients    |
| `utils/`             | **Helper Functions**              | Date formatting, JWT verify, calculations    |
| `constants/`         | **Static Values**                 | API URLs, enums, routes, messages            |
| `types/`             | **TypeScript Types**              | Defining interfaces, types for data models   |
| `redux/`             | **State Management** (Frontend)   | Managing global state, API calls (RTK Query) |
| `public/`            | **Static Assets**                 | Images, icons, fonts, videos                 |
| `hooks/`             | **Custom React Hooks** (Frontend) | Reusable React logic (useAuth, useDebounce)  |

---

### 🗂️ Project Structure

```
c:/Work Station/ReturnHex/Xecom-Frontend/
├── app/                          # Next.js App Router (Pages & Layouts)
│   ├── (admin)/                  # Admin routes (route group)
│   │   ├── dashboard/
│   │   │   └── page.tsx         # /admin/dashboard
│   │   ├── users/
│   │   │   └── page.tsx         # /admin/users
│   │   └── layout.tsx           # Admin layout wrapper
│   ├── (customer)/               # Customer routes (route group)
│   │   ├── products/
│   │   │   └── page.tsx         # /products
│   │   ├── cart/
│   │   │   └── page.tsx         # /cart
│   │   ├── layout.tsx           # Customer layout wrapper
│   │   └── not-found.tsx        # 404 page
│   ├── api/                      # API routes (if needed)
│   │   └── webhook/
│   │       └── route.ts
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (/)
│
├── components/                   # All React components
│   ├── ui/                       # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── dropdown.tsx
│   ├── common/                   # Common/Shared components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   └── LoadingSpinner.tsx
│   ├── forms/                    # Form components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProductForm.tsx
│   ├── admin/                    # Admin-specific components
│   │   ├── UserTable.tsx
│   │   ├── DashboardStats.tsx
│   │   └── AdminSidebar.tsx
│   └── customer/                 # Customer-specific components
│       ├── ProductCard.tsx
│       ├── CartItem.tsx
│       └── CheckoutForm.tsx
│
├── lib/                          # Library code & configurations
│   ├── utils.ts                  # Utility functions (cn, formatters)
│   ├── axios.ts                  # Axios instance configuration
│   ├── validators.ts             # Validation schemas (Zod)
│   └── api-client.ts             # API client helpers
│
├── utils/                        # Helper/Utility functions
│   ├── verifyToken.ts            # JWT verification
│   ├── formatDate.ts             # Date formatting
│   ├── generateSlug.ts           # URL slug generator
│   ├── calculatePrice.ts         # Price calculations
│   └── sanitizeInput.ts          # Input sanitization
│
├── constants/                    # Static constants & enums
│   ├── enum.ts                   # Enums (UserRole, OrderStatus)
│   ├── global.ts                 # Global constants (API_URL, APP_NAME)
│   ├── routes.ts                 # Route paths
│   └── messages.ts               # Error/Success messages
│
├── types/                        # TypeScript types & interfaces
│   ├── index.ts                  # Export all types
│   ├── global.type.ts            # Global types
│   ├── user.type.ts              # User-related types
│   ├── product.type.ts           # Product-related types
│   └── api.type.ts               # API response types
│
├── redux/                        # Redux Toolkit state management
│   ├── store.ts                  # Redux store configuration
│   ├── hooks.ts                  # Typed hooks (useAppDispatch, useAppSelector)
│   ├── api/
│   │   └── baseApi.ts            # RTK Query base API
│   └── features/
│       ├── auth/
│       │   ├── authApi.ts        # Auth API endpoints
│       │   └── authSlice.ts      # Auth state slice
│       ├── user/
│       │   └── user.api.ts       # User API endpoints
│       └── admin/
│           ├── userManagement.api.ts
│           ├── courseManagement.api.ts
│           └── academicManagement.api.ts
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   └── hero-bg.jpg
│   ├── icons/
│   │   └── favicon.ico
│   └── fonts/                    # Custom fonts (if any)
│
├── hooks/                        # Custom React hooks (optional)
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
└── config/                       # Configuration files (optional)
    ├── site.config.ts            # Site metadata
    └── navigation.config.ts      # Navigation items
```

---

### 📝 Folder Guidelines

#### 🎨 `components/`

- **`ui/`** - Only reusable UI primitives (buttons, inputs, cards, dialogs) from shadcn/ui or custom design system
- **`common/`** - Shared components used across multiple pages (Header, Footer, Sidebar, Navbar)
- **`forms/`** - Form components with validation logic
- **`admin/`** - Components exclusive to admin panel
- **`customer/`** - Components exclusive to customer-facing pages

> [!NOTE]
> **📌 Rule:** Components should be PascalCase (e.g., `ProductCard.tsx`)

---

#### 📄 `app/`

- Use **route groups** like `(admin)` and `(customer)` for organizing routes without affecting URL
- Each folder represents a route segment
- `page.tsx` - The actual page component
- `layout.tsx` - Layout wrapper for that route group
- `loading.tsx` - Loading UI (optional)
- `error.tsx` - Error UI (optional)
- `not-found.tsx` - 404 page

> [!NOTE]
> **📌 Rule:** All pages go here, not in a separate `pages/` folder (Next.js 13+ App Router)

---

#### 🔧 `lib/`

- **Purpose:** Third-party library configurations and core utility functions
- **Examples:**
  - `utils.ts` - Utility functions like `cn()` for classnames, `formatCurrency()`, etc.
  - `axios.ts` - Axios instance with interceptors
  - `validators.ts` - Zod/Yup validation schemas
  - `api-client.ts` - Reusable API client logic

> [!NOTE]
> **📌 Rule:** Library-specific configurations go here

---

#### 🛠️ `utils/`

- **Purpose:** Pure helper/utility functions specific to your business logic
- **Examples:**
  - `verifyToken.ts` - JWT token verification
  - `formatDate.ts` - Date formatting functions
  - `generateSlug.ts` - URL slug generation
  - `calculatePrice.ts` - Price/discount calculations

> [!NOTE]
> **📌 Rule:** camelCase naming (e.g., `verifyToken.ts`)

---

#### 📌 `constants/`

- **Purpose:** Static, unchanging values used across the app
- **Examples:**
  - `enum.ts` - Enums (`UserRole`, `OrderStatus`, `PaymentMethod`)
  - `global.ts` - Global constants (`API_URL`, `APP_NAME`, `MAX_FILE_SIZE`)
  - `routes.ts` - Route path constants
  - `messages.ts` - Error/success message templates

> [!NOTE]
> **📌 Rule:** UPPER_SNAKE_CASE for constants, PascalCase for enums

---

#### 🔷 `types/`

- **Purpose:** TypeScript type definitions and interfaces
- **Examples:**
  - `index.ts` - Re-export all types
  - `user.type.ts` - User, Profile, UserResponse
  - `product.type.ts` - Product, Category, ProductFilters
  - `api.type.ts` - API request/response types

> [!NOTE]
> **📌 Rule:** Use `.type.ts` extension, PascalCase for types

---

#### 🔄 `redux/`

- **`store.ts`** - Redux store setup
- **`hooks.ts`** - Typed Redux hooks
- **`api/`** - RTK Query base API configuration
- **`features/`** - Feature-based slices and APIs
  - Each feature has its own folder
  - Use `.api.ts` for RTK Query endpoints
  - Use `.slice.ts` for Redux slices

> [!NOTE]
> **📌 Rule:** Follow feature-based organization

---

#### 🖼️ `public/`

- **Purpose:** Static assets served directly
- Organize by type: `images/`, `icons/`, `fonts/`, `videos/`

> [!NOTE]
> **📌 Rule:** Use descriptive names, optimize images before adding

---

### ✅ Best Practices

1. **Naming Conventions:**
   - Components: `PascalCase.tsx`
   - Utilities/Hooks: `camelCase.ts`
   - Constants: `UPPER_SNAKE_CASE`
   - Types: `PascalCase`

2. **File Organization:**
   - Keep related files together
   - Don't nest too deeply (max 3-4 levels)
   - Use `index.ts` for clean exports

3. **Component Structure:**
   - One component per file
   - Co-locate styles if using CSS modules
   - Keep components small and focused

4. **Import Order:**

   ```typescript
   // 1. External imports
   import { useState } from "react";
   import { Button } from "@/components/ui/button";

   // 2. Internal imports
   import { useAuth } from "@/hooks/useAuth";
   import { API_URL } from "@/constants/global";

   // 3. Types
   import type { User } from "@/types/user.type";

   // 4. Styles (if any)
   import "./styles.css";
   ```

---

## 🚀 Development Process

Follow this process strictly to avoid conflicts and maintain a clean workflow.

---

### 1. Create a Branch From `dev`

Always start from the latest `dev` branch:

```bash
git checkout dev
git pull origin dev
git checkout -b feat/fix/chore/docs/branch-name
```

Use the correct prefix:

- `feat/` – new feature
- `fix/` – bug fix
- `chore/` – maintenance or config
- `docs/` – documentation

---

### 2. Update Your New Branch With the Latest `dev` Changes

Even after creating the branch, sync it immediately:

```bash
git pull origin dev
npm install    # or pnpm install
```

---

### 3. Make Your Changes, Commit, and Push

```bash
git add .
git commit -m "meaningful commit message"
git push origin branch-name
```

---

### 4. Create a Pull Request (PR)

All PRs must be created **from your branch → into `dev`**.

```
dev  ←  your-branch
```

> [!CAUTION]
> **Do NOT create PRs into `main`.**
>
> **Do NOT push directly to `main`.**

---

### 5. Wait for Review and Approval

Your PR will be reviewed.
Fix requested changes, update commits, and push again.

> [!TIP]
> **✅ DO:** Always Choose a Reviewer

---

### 6. Merge Into `dev`

Once approved, your PR will be merged into `dev`.
This is the only allowed merge target.

---

### 🔥 Important Rules

> [!IMPORTANT]
> **✅ DO:**
>
> - Always create branches from `dev`
> - Always create PRs into `dev`
> - Keep commit messages clean and meaningful
> - Update your branch before and after development to avoid conflicts

> [!CAUTION]
> **❌ DON'T:**
>
> - Never push directly to `main` (it is protected)
> - Never create PRs into `main`
> - Never work without pulling latest changes first

---

## Learn More

First, run the development server:

npm run dev # or
yarn dev # or
pnpm dev # or
bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
