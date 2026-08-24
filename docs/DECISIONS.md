# FlexMeal — Architecture Decision Log

---

## DEC-001
**Decision:** Use MongoDB + Mongoose as the database.  
**Why:** Flexible schema suits a meal catalog with varied dish structures. JSON-native — maps cleanly to frontend TypeScript interfaces. Simple to host on Atlas.  
**Alternatives considered:** PostgreSQL (relational, stronger consistency), SQLite (too limited for production).  
**Impact:** Repositories use Mongoose queries. Atomic credit operations use Mongoose sessions + transactions (requires MongoDB replica set or Atlas).  
**Date:** 2026-08-25

---

## DEC-002
**Decision:** JWT stateless authentication (no server-side sessions).  
**Why:** Stateless fits a REST API. No session store needed. Scales horizontally.  
**Alternatives considered:** Express-session + Redis (adds infrastructure complexity for Phase 1).  
**Impact:** Tokens expire in 7 days. No refresh token in Phase 1 (added in Phase 2).  
**Date:** 2026-08-25

---

## DEC-003
**Decision:** Simulate payment gateway in Phase 1; stub Razorpay integration for Phase 2.  
**Why:** No payment provider credentials in env. Frontend already simulates payment success. Real gateway integration does not block the backend API shape.  
**Alternatives considered:** Integrate Razorpay immediately (blocked by missing API keys — see REQUIREMENTS ASSUMPTION-001).  
**Impact:** `POST /payments/subscription` and `POST /payments/order` simulate success and return transaction IDs. Webhook endpoint stubbed.  
**Date:** 2026-08-25

---

## DEC-004
**Decision:** Denormalize dish name and roti name onto Order documents.  
**Why:** Menu items can change over time. An order snapshot must preserve what was ordered at the time, not a live reference.  
**Alternatives considered:** Pure reference (joins) — risk: dish renamed/deleted breaks order history display.  
**Impact:** `dishName`, `rotiName` stored as strings on Order in addition to `dishId`, `rotiId` ObjectId refs.  
**Date:** 2026-08-25

---

## DEC-005
**Decision:** Soft delete orders (status = 'Cancelled') rather than hard delete.  
**Why:** Admin needs full order history including cancellations. Cancelled orders should still appear in wallet refund audit trail.  
**Alternatives considered:** Hard delete + separate cancellation log.  
**Impact:** All order list queries filter with `status: { $ne: 'Cancelled' }` by default unless admin requests full history.  
**Date:** 2026-08-25

---

## DEC-006
**Decision:** Atomic credit deduction using MongoDB `findOneAndUpdate` with a conditional filter `{ credits: { $gte: 10 } }`.  
**Why:** Prevents race conditions where two simultaneous requests could both pass a separate read-check, then both deduct credits, resulting in negative balance.  
**Alternatives considered:** Mongoose transactions (heavier, requires replica set); optimistic locking (complex).  
**Impact:** If the update returns null, the service throws `INSUFFICIENT_CREDITS`. No separate read step needed.  
**Date:** 2026-08-25

---

## DEC-007
**Decision:** API versioning at `/api/v1/` from day one.  
**Why:** Allows breaking changes in future versions without disrupting existing frontend clients.  
**Alternatives considered:** No versioning (risky), header-based versioning (less discoverable).  
**Impact:** All route files registered under `/api/v1/` prefix in `app.js`.  
**Date:** 2026-08-25

---

## DEC-008
**Decision:** Seed static meal data (weekly schedule, dishes, rotis, subscription plans) from `mealData.ts` at server startup.  
**Why:** Menu is static in Phase 1. Frontend already uses this data. Seeding ensures DB always has current catalog without manual setup.  
**Alternatives considered:** Admin UI for menu management (Phase 2 feature).  
**Impact:** `src/utils/seeder.js` runs once on startup, skipping records that already exist (upsert by dishId/planId).  
**Date:** 2026-08-25

---

## DEC-009
**Decision:** Use `express-rate-limit` on auth routes only (not all routes) in Phase 1.  
**Why:** Auth endpoints are the primary brute-force target. Meal catalog and order endpoints need higher throughput.  
**Impact:** 10 login attempts per 15-minute window per IP. Configurable via env.  
**Date:** 2026-08-25
