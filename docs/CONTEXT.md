# FlexMeal — Project Context

## Project Name
FlexMeal

## Purpose
Homestyle meal subscription and walk-in service delivering fresh Indian food (breakfast, lunch, dinner) to hostels, PGs, and offices. Users subscribe for a 30-day credit pass or order pay-as-you-go.

## Target Users
| Role | Description |
|------|-------------|
| `subscriber` | Pre-paid 30-day pass holder (900 credits) |
| `customer` | Walk-in / pay-as-you-go user |
| `admin` | Kitchen operations & dispatch manager |

## Core Modules
1. Authentication (register / login / JWT)
2. User Profile & Wallet
3. Meal Catalog (dishes, rotis, weekly schedule)
4. Custom Saved Dishes (My Menu Studio)
5. Subscription Plans
6. Orders & Checkout
7. Admin Kitchen Dashboard
8. Payments (UPI / Card / COD / Credits)

## Technology Stack
| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite, TailwindCSS v4 |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (access token), bcrypt |
| Validation | express-validator |
| Logging | morgan + custom logger |
| Environment | dotenv |

## Backend Architecture
REST API — `/api/v1/` prefix. Layered: Routes → Controllers → Services → Repositories → Models.

## Database
MongoDB (hosted on MongoDB Atlas in production; local `mongodb://localhost:27017/flexmeal` in development).

## Authentication Strategy
JWT Bearer tokens. Stateless. Tokens issued on login, verified via middleware on protected routes.

## Authorization Strategy
Role-based middleware (`requireRole`). Object-level: users can only access their own orders/wallet. Admins can access all orders.

## Important Integrations
- Payment gateway: Simulated in Phase 1 (webhook-ready stub). Real integration (Razorpay) deferred — recorded in DECISIONS.md.
- Gemini AI API key is already available in env (GEMINI_API_KEY).

## Current Implementation Status
Backend: **To be built** (Phase 1).
Frontend: Complete React SPA (no API calls yet — all state in memory/localStorage).

## Current Development Phase
Phase 1 — Production-ready REST API backend.

## Important Constraints
- Frontend uses Indian currency (₹ INR) throughout.
- 1 meal = 10 credits always (never partial).
- Dal Chawal add-on = +₹30 for walk-ins (free/included at 0 extra credits for subscribers).
- 14-day grace rollover on unused credits — enforced by backend on subscription activation date.
- Admin cannot place orders. Customers/subscribers cannot access admin routes.
