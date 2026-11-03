# E-Commerce Store and Dashboard

A responsive storefront and analytics dashboard demo. The project includes a Node.js/Express API backed by SQLite, customer registration and login, a persistent product catalog, a browser cart, and checkout that creates orders (no payment processor is connected).

## Requirements
- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm start
```

Open <http://localhost:3000/store.html> for the storefront. Other pages: `/cart.html`, `/account.html`, and `/index.html` (analytics dashboard). The API is served from the same origin under `/api`.

The database and session store are created automatically in `data/` on first run. For deployment, set `SESSION_SECRET` to a long, random secret and use HTTPS. The app configures secure cookies in production. Do not commit `.env` files or real credentials.

## API overview
- `GET /api/products` — searchable product catalog
- `GET /api/csrf` — session-bound CSRF token for write requests
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`
- `POST /api/orders` — validates stock and creates a signed-in user's order
- `GET /api/orders` — current user's orders

Registration passwords are hashed with bcrypt. Sessions and application data are persisted in SQLite. Rate limits protect authentication endpoints. Checkout records an order but does not charge a payment method; configure a payment provider before accepting real payments.

## Demo data and limitations
The catalog is seeded with sample products. The existing analytics page still uses its own demo reporting data; it is not connected to the store's sales database. This project is a learning/demo starting point, not a production-ready commerce platform. Before production, add automated tests, email verification/password recovery, operational monitoring and backups, stricter deployment configuration, and a payment provider.
