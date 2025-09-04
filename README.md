<img src="https://github.com/user-attachments/assets/0087564e-2352-4c3d-b8ae-f44eab60acaf" alt="Naima_logo" width="300" height="200">

# Naima — Fika with Benefits

A full-stack MERN app for Naima, a Swedish fika brand. The site showcases products, the brand story, an interactive store map, and a company dashboard for wholesale partners.

## 🧩 The assignment

Build a production-style full-stack web app with persistent data, authentication, and a modern, accessible UX. Ship a public site and protected “company” area, integrate at least one external service, and document everything.

## The plan

Goals

- Represent Naima’s brand online (products, story, social, where to buy).
- Serve real data from a backend (products, partners, retailers).
- Provide a simple, secure wholesale dashboard.
- Be fast and accessible.

Approach

- Plan: MVP → iterate. Start with static JSON/data and progressively wire backend.
- Tech choices:
  - Frontend: React (Vite), styled-components, Zustand, Framer Motion, React Hook Form, Leaflet.
  - Backend: Express, Mongoose/MongoDB Atlas, JWT auth, express-validator, rate-limit.
  - Performance: lazy images, pre-geocoded retailers, simple animations that respect prefers-reduced-motion.
  - A11y first: skip link, keyboard hamburger with focus trap, visible focus, ≥44px tap targets, ARIA-labeled carousel dots.
    If we had more time: admin CRUD, IG Graph API with caching, tests, and analytics.

## ✨ Highlights

- Modern stack: React + Vite, themeable design system via styled-components.
- Real data: Products & partners from the backend; retailers shown on a map.
- Map: Leaflet + OSM tiles; inline SVG pins tinted with brand palette.
- Auth: JWT; protected company dashboard.
- A11y: Lighthouse Accessibility 100% (skip link, keyboard nav, proper labels).
- Performance: Lazy images, static geocoded JSON, reduced motion support.

## Frontend Structure

The frontend uses a React component-based architecture.
Main folders:
src/components/: Reusable UI components
src/pages/: Route components (views)
src/sections/: Page sections/layouts
src/data/: Static data (models)
src/styles/: Styling system

## Backend Structure

The backend follows an MVC pattern with a service layer (Node.js + Express + MongoDB).

Main layers:

- Routes: URL mapping (presentation/routing)
- Controllers: HTTP request/response handling
- Services: Business logic
- Models: Data access (MongoDB schemas and operations)

Architecture patterns used: MVC, 3-Tier, Layered, and Clean Architecture.

## 🌐 View it live

Deployed Frontend: https://resetwithnaima.netlify.app/

Deployed Backenhttps://naima-website.onrender.com/

## 👩‍💻 Developers - Find us:

<img src="https://github.com/LindaSchonfeldt.png" width="80px"/><br />
<sub><a href="https://github.com/LindaSchonfeldt">Linda Schonfeldt</a></sub>

<img src="https://github.com/Bianka2112.png" width="80px"/><br />
<sub><a href="https://github.com/Bianka2112">Bianka R</a></sub>
