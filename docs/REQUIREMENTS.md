# FlexMeal — Backend Requirements

| ID | Description | Source | Priority | Backend Impact | Status |
|----|-------------|--------|----------|----------------|--------|
| REQ-001 | Users can register with name, email, phone, password and role defaults to `customer` | Frontend LoginPage | High | `POST /auth/register` + User model | Pending |
| REQ-002 | Users can log in with email + password; receive JWT | Frontend LoginPage | High | `POST /auth/login` + JWT issue | Pending |
| REQ-003 | Subscriber role gets 900 credits on plan activation; expiry = 30 days; grace = +14 days | Subscription plans, frontend App | High | User.credits, User.planExpiresAt, User.graceExpiresAt | Pending |
| REQ-004 | Walk-in customer has 0 credits; pays per meal in ₹ | Frontend CheckoutDrawer | High | Order.paymentMode = 'upi'/'card'/'cod' | Pending |
| REQ-005 | Meal catalog (dishes, rotis, weekly schedule) must be seeded and served via API | mealData.ts | High | `GET /menu/*`, Dish/Roti models + seed | Pending |
| REQ-006 | Users can browse the weekly meal schedule by day and meal time | Frontend DayMealSelector | Medium | `GET /menu/schedule` | Pending |
| REQ-007 | Users can place an order for a specific day, meal time, dish, roti, rotiCount, dalChawal flag | Frontend CheckoutDrawer | High | `POST /orders` + Order model | Pending |
| REQ-008 | Placing a credit order deducts exactly 10 credits from the user's wallet | Frontend, business rule | High | Service: atomically decrement credits, create WalletTransaction | Pending |
| REQ-009 | Users can view their own order history | Frontend OrderHistoryView | Medium | `GET /orders` (own) | Pending |
| REQ-010 | Users can cancel a `Scheduled` order; credits are refunded if paid by credits | Frontend handleCancelOrder | Medium | `DELETE /orders/:id` + credit refund | Pending |
| REQ-011 | Admin can view all orders (filterable by mealTime, search by customer/dish/id) | AdminDashboardView | High | `GET /admin/orders` + query params | Pending |
| REQ-012 | Admin can update order status: Scheduled → Preparing → Out for Delivery → Delivered | AdminDashboardView handleStatusChange | High | `PATCH /admin/orders/:id/status` | Pending |
| REQ-013 | Users can save custom dishes (My Menu Studio) to their profile | MyCustomMenuView | Medium | `POST /users/me/custom-dishes` | Pending |
| REQ-014 | Users can retrieve, update, and delete their custom saved dishes | MyCustomMenuView | Medium | `GET/PUT/DELETE /users/me/custom-dishes/:id` | Pending |
| REQ-015 | Subscription plans catalog is served via API | Frontend SubscriptionPlansView | Medium | `GET /plans` | Pending |
| REQ-016 | User can initiate a subscription payment; on success credits are added + plan dates set | Frontend PaymentModal | High | `POST /payments/subscription` + credit top-up | Pending |
| REQ-017 | Wallet credit ledger (transactions) stored and retrievable | WalletView | Medium | `GET /wallet/transactions` + WalletTransaction model | Pending |
| REQ-018 | Admin dashboard summary stats (order counts, roti counts) derived from orders | AdminDashboardView counters | Low | `GET /admin/stats` | Pending |
| REQ-019 | Fasting mode dishes available in catalog | Frontend isFastingMode | Low | Dishes tagged `vrat_special` category served | Pending |
| REQ-020 | Sunday dessert (Gulab Jamun) included at 0 credits for subscribers on Sunday dinner | mealData Sunday dessert | Low | Order service special-case Sunday dinner dessert | Pending |
| REQ-021 | Rate limiting on auth endpoints to prevent brute force | Security | High | express-rate-limit on /auth/* | Pending |
| REQ-022 | All API inputs validated server-side; never trust client | Security | High | express-validator on all POST/PATCH routes | Pending |
| REQ-023 | Passwords hashed with bcrypt (min cost 12) | Security | High | User.passwordHash, bcrypt | Pending |
| REQ-024 | JWT secret from environment variable; never hardcoded | Security | High | process.env.JWT_SECRET | Pending |

### ASSUMPTIONS
- ASSUMPTION-001: No real payment gateway in Phase 1. Payment endpoints simulate success and update credits. Razorpay webhook integration deferred to Phase 2.
- ASSUMPTION-002: No email/SMS OTP verification in Phase 1. Registration is immediate.
- ASSUMPTION-003: Delivery address is stored as a plain string on the order (no geocoding).
- ASSUMPTION-004: Weekly meal schedule is static (seeded from mealData.ts). No admin UI to edit the menu in Phase 1.
