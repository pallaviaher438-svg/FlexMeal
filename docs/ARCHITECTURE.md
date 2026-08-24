# FlexMeal — Backend Architecture

## System Overview

```
Browser (React SPA)
        │
        │ HTTPS REST JSON
        ▼
┌─────────────────────────────────┐
│         Express API Server      │
│         /api/v1/                │
│                                 │
│  ┌──────────┐  ┌─────────────┐  │
│  │  Routes  │  │ Middlewares │  │
│  └────┬─────┘  └─────────────┘  │
│       │  authenticate           │
│       │  requireRole            │
│       │  validate               │
│       │  rateLimiter            │
│       ▼                         │
│  ┌─────────────┐                │
│  │ Controllers │                │
│  └──────┬──────┘                │
│         ▼                       │
│  ┌─────────────┐                │
│  │  Services   │  ← Business    │
│  │             │    Logic       │
│  └──────┬──────┘                │
│         ▼                       │
│  ┌─────────────┐                │
│  │Repositories │  ← DB Queries  │
│  └──────┬──────┘                │
│         ▼                       │
│  ┌─────────────┐                │
│  │   Models    │  ← Mongoose    │
│  └──────┬──────┘                │
└─────────┼───────────────────────┘
          │
          ▼
   MongoDB (Atlas / Local)
```

## Layer Responsibilities

| Layer | File location | Responsibility |
|-------|--------------|----------------|
| Routes | `src/routes/` | HTTP method, path, middleware chain, controller binding |
| Controllers | `src/controllers/` | Parse request, call service, return HTTP response |
| Services | `src/services/` | Business rules, transactions, orchestration |
| Repositories | `src/repositories/` | Mongoose queries — no business logic |
| Models | `src/models/` | Schema, indexes, constraints |
| Middlewares | `src/middlewares/` | auth, role, validation, error, rate-limit |
| Validators | `src/validators/` | express-validator rule chains |
| Utils | `src/utils/` | JWT helpers, response helper, logger |
| Constants | `src/constants/` | Business constants (CREDITS_PER_MEAL, etc.) |
| Config | `src/config/` | DB connection, env loader, logger config |

## API Base URL
`/api/v1/`

## Route Groups

```
/api/v1/auth          — register, login
/api/v1/users/me      — profile, custom dishes
/api/v1/menu          — schedule, dishes, rotis, plans
/api/v1/orders        — place order, list, cancel
/api/v1/wallet        — balance, transactions
/api/v1/payments      — initiate/confirm subscription purchase
/api/v1/admin/orders  — admin: list all, update status
/api/v1/admin/stats   — admin: kitchen stats
```

## Authentication Flow

```
POST /auth/login
  → validate input
  → look up user by email
  → bcrypt.compare(password, hash)
  → sign JWT { userId, role, email }
  → return { token, user }

Protected routes:
  Authorization: Bearer <token>
  → authenticate middleware decodes token
  → attaches req.user = { userId, role, email }
  → requireRole(['admin']) checks role
```

## Credit Deduction Flow (Order with Credits)

```
POST /orders
  → authenticate
  → validate input
  → OrderService.createOrder(userId, orderDto)
     → UserRepository.findById(userId)              — check credits ≥ 10
     → session.startTransaction()
     → UserRepository.decrementCredits(userId, 10)  — atomic
     → WalletTransactionRepository.create(debit)
     → OrderRepository.create(orderData)
     → session.commitTransaction()
  → return 201 { order, remainingCredits }
```

## Subscription Activation Flow

```
POST /payments/subscription
  → authenticate
  → validate planId + paymentMethod
  → PaymentService.activateSubscription(userId, planId)
     → look up plan credits + price
     → simulate payment (Phase 1) / Razorpay verify (Phase 2)
     → UserRepository.setSubscription(userId, { credits, planExpiresAt, graceExpiresAt })
     → WalletTransactionRepository.create(credit entry)
  → return 200 { user, creditsAdded }
```

## Error Response Shape
```json
{
  "success": false,
  "message": "Human readable message",
  "code": "ERROR_CODE",
  "errors": []
}
```

## Success Response Shape
```json
{
  "success": true,
  "data": { ... }
}
```
