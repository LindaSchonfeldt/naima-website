# Naima — Fika with Benefits

A full-stack MERN app for **Naima**, a Swedish fika brand. The site showcases products, the brand story, retail partners on an interactive map, and a company dashboard for existing wholesale partners.

---

## Quick start

- Install dependencies

  - cd frontend
  - npm install

- Run dev server

  - npm run dev

- Build for production
  - npm run build
  - npm run preview (serve the built app locally)

---

## Environment

Create a `.env` in the frontend (if required) and in the backend with the following keys as needed:

- VITE_API_BASE or API_BASE — base URL for the backend API (example: https://naima-api.example.com)
- Other keys used by components or services (check `vite.config.js` and `src/services/api.js`)

---

## Folder structure (recommended reference)

This is the current working layout; use it as a guide when adding files.

- public/
  - fonts/
  - images/
  - data/
  - index.html
- src/
  - App.jsx
  - main.jsx
  - index.css
  - pages/ — route-level pages (Home, Shop, Checkout, CompanyPortal, ...)
  - sections/ — composable page sections (Hero, SocialProof, InstagramGrid, ...)
  - components/ — smaller reusable components (Button, ProductCard, Nav, Cart, ...)
    - primitives/ — low-level UI primitives (optional)
    - layout/ — PageContainer, PageTitle, Footer
  - stores/ — zustand stores (useCartStore, useUiStore, ...)
  - services/ — API client (api.js) and domain helpers
  - styles/ — theme.js, GlobalStyles, SkeletonTheme
  - hooks/ — custom hooks (useBreakpoint, useInView)
  - utils/ — helpers
- build / dist

Keep cross-cutting providers (theme, skeleton, stores) near `src/main.jsx` so they're applied globally.

---

## ⭐ Highlights

- **Modern stack:** React + Vite, Styled-Components theme system, Express + Mongoose, MongoDB Atlas.
- **Real data:** Products & partners served from the backend. Retailer locations pre-geocoded and rendered on a map.
- **Accessible UX:** Skip link, keyboard-navigable mobile menu with focus trap, large touch targets, visible focus, a11y carousel indicators.
- **Performance wins:** Lazy images, static geocoded JSON, small animations respecting `prefers-reduced-motion`.
- **Design system:** Centralized `theme.js` + `GlobalStyles`, semantic typography, brand palette:
  - **primary (mint)** `#BCE8C2`
  - **blush** `#F7CDD0`
  - **salmon** `#F4A6A3`
  - **lavender** `#D0C3F1`
  - **sky** `#B3D9F3`

---

## 🧭 MVP Scope

### Public site

- Home: hero carousel, “served at” rolling logo track, featured products, Instagram grid _(pending client access → Graph API planned)_.
- Find us: responsive **Leaflet** map with brand-colored pins; directions links.
- Our story: founder & mission sections, responsive imagery, reveal animations.
- Contact: validated form via `react-hook-form`; posts to backend; success/failure UI.
- Products: featured grid; product cards.
- Navigation: sticky header, mobile hamburger (focus-trapped), active link states (`NavLink`).
- Footer: full-bleed banner background; social links with hover/focus states.

### Auth & dashboard (wholesale/company)

- JWT auth: `JWT_SECRET` required (see `.env`).
- Protected routes: middleware `authenticate` + `authorize(role[])`.
- Company dashboard nav: a11y (≥44px targets, focus outlines), active route styling, native select on mobile.
- Company features _(ongoing)_: shop/orders/profile UI (routes scaffolded, data/UX polish in progress).

### Data & APIs

- Partners & Products: Mongoose models + routes mounted at `/api/products`, `/api/partners`.
- Retailer map data: geocoded with **Nominatim** script → static JSON served to frontend.
- Instagram feed: via **Meta Graph API** once client provides tokens _(instructions prepared)_.

---

## ✅ Technigo Final — Requirements Checklist

- [x] **Fullstack** (backend + database + frontend)
- [x] **Persistent data** (MongoDB/Mongoose) — Products, Partners, Retailers
- [x] **REST API endpoints** — `/api/products`, `/api/partners`, `/api/contact`, `/api/orders` _(as applicable)_
- [x] **Authentication / Protected pages** — JWT, middleware, company dashboard
- [x] **Responsive design** — breakpoints in `theme.breakpoints`, mobile-first
- [x] **Accessibility** — Skip link, focus styles, keyboard menu, ≥44px tap targets, improved carousel indicators
- [x] **External service / API** — Leaflet + OpenStreetMap tiles, Nominatim geocoding _(IG Graph API planned)_
- [x] **Collaboration workflow (Git)** — branching, PRs; see below
- [ ] **Deployment** — ⏳ _(add links once live)_
- [ ] **Testing** — _(manual + Lighthouse done)_

---

## 🗺️ Map Details

- **Leaflet + react-leaflet** with **OpenStreetMap** tiles.
- Brand-colored **SVG pins** generated inline (no external icon files), themed via `useTheme()`.
- `fitBounds` to include all retailers; popup shows address + **Directions** link.
- Data loaded from `frontend/public/data/geocodedRetailers.json` for speed (no API call at runtime).

---

## ♿ Accessibility

- **Skip link:** first in DOM, visually hidden until focus, targets `<main id="main">`.
- **Keyboard navigation:**
  - Hamburger menu opens/closes via keyboard; focus is trapped within and returns to trigger on close.
  - `Esc` closes the menu.
- **Visible focus:** consistent `:focus-visible` outlines using brand colors.
- **Touch targets:** ≥44px for nav links & controls.
- **Carousel indicators:** real `<button>`s with `aria-label="Go to slide n"` & `aria-current="true"` on the active dot.
- **Reduced motion:** animations respect `prefers-reduced-motion`.
- **Lighthouse Accessibility:** **100%**

---

## 🧭 Roadmap / Stretch

- Instagram Graph API feed (client tokens) with caching.
- Admin CRUD UI for products/partners.
- Order management UI for companies.
- Automated tests (Jest/React Testing Library, Supertest).
- Production analytics & error tracking.

---

## 👯 Collaboration Workflow

- **Branch naming:**  
  Use clear prefixes to describe the change type.  
  `feat/<feature-name>` • `fix/<bug-name>` • `chore/<task-name>`

- **Keep `main` deployable:**  
  All changes go through **Pull Requests (PRs)**. Keep PRs small with clear titles & descriptions.
