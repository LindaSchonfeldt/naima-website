# Naima Website — Backend

Lightweight README for the backend service (Express + Mongoose).

## Overview

This Express app provides the API for the Naima website: companies, customers, products, orders, retailers, partners and admin operations. Routes are organized under `routes/` and handlers in `controllers/`. Mongoose models live in `models/`. Basic JWT authentication is implemented in `middleware/auth.js`.

## Requirements

- Node.js 18+ (or your project's target)
- npm
- MongoDB (local or Atlas)

## Quick start

1. Install
   ```bash
   npm install
   ```
2. Create a `.env` file in this folder (see Environment).
3. Start development server
   ```bash
   npm run dev
   ```
4. Start production server
   ```bash
   npm start
   ```

## Environment variables

Create `.env` with at least:

- PORT=3001
- MONGODB_URI=mongodb://localhost:27017/naima
- JWT_SECRET=your_jwt_secret
- NODE_ENV=development

Adjust values to your environment (Atlas connection string, secrets, etc).

## Scripts

Common scripts (expected):

- `npm run dev` — development with auto-reload (nodemon)
- `npm start` — start production server
- `node scripts/seedData.js` — seed data (if present)

Check `package.json` for exact script names in this repo.

## API overview

Routes are mounted in `routes/`:

- `/api/products` — product listing and management (controllers/productControllers.js)
- `/api/orders` — create and manage orders (controllers/orderController.js)
- `/api/company` — company auth/profile (controllers/companyControllers.js)
- `/api/customers` — customer endpoints (controllers/customerControllers.js)
- `/api/retailers` — retailer locations (controllers/retailerController.js)
- `/api/partners` — partners
- `/api/admin` — admin endpoints
- `/api/contact` — contact form messages

Use the route files to see exact endpoints and required params.

## Authentication

- JWT-based. Tokens are signed with `JWT_SECRET`.
- Auth middleware: `middleware/auth.js` — verifies tokens and attaches decoded user to `req`.
- Protect routes by applying `authenticate` and `authorize` where required.

Example header for protected routes:

```
Authorization: Bearer <token>
```

## Models (high level)

Look in `models/` for schemas:

- Company, Customer, Admin
- Product
- Order (items, totalCost, status)
- RetailLocation, Partner, ContactMessage

## Seeding & data import

- `scripts/seedData.js` and `scripts/import-retailers.mjs` are available for seeding and importing retailer geocoded data. Inspect and run with Node as needed.

## Logging & debugging

- Check server console for auth / JWT errors (invalid signature, expired).
- Ensure `MONGODB_URI` is correct when you see connection errors.
- Use Postman / curl to test endpoints. Inspect response status (401 for auth issues, 500 for server errors).

Example: log in (company) and fetch order

```bash
# login -> get token
curl -X POST http://localhost:3001/api/company/login -H "Content-Type: application/json" -d '{"email":"...","password":"..."}'

# fetch order
curl http://localhost:3001/api/orders/<orderId> -H "Authorization: Bearer <token>"
```

## Troubleshooting

- JsonWebTokenError: invalid signature — check `JWT_SECRET` consistency between token issuer and verifier.
- 401 Unauthorized — ensure token is present and not expired.
- CORS issues — check server CORS settings and client origin.
- 500 Server Error — check server console for stack trace and controller errors.

## Deployment

- Set env variables on your host (PORT, MONGODB_URI, JWT_SECRET).
- Use a process manager (pm2) or containerize with Docker.
- Ensure proper CORS and HTTPS handling in production.

## Contributing

- Follow the existing project structure: routes → controllers → models → services.
- Keep controllers focused and move reusable logic to `services/`.

## Contacts

- Repository owner / maintainer: see project-level README or repository meta.
