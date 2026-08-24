# FlexMeal — API Contract

Base URL: `/api/v1`

---

## AUTH

### POST /auth/register
**Auth:** Public  
**Request:**
```json
{ "name": "string", "email": "string", "phone": "string", "password": "string" }
```
**Response 201:**
```json
{ "success": true, "data": { "token": "jwt", "user": { "id", "name", "email", "phone", "role", "credits" } } }
```
**Errors:** 400 VALIDATION_ERROR, 409 EMAIL_EXISTS

---

### POST /auth/login
**Auth:** Public  
**Request:**
```json
{ "email": "string", "password": "string" }
```
**Response 200:**
```json
{ "success": true, "data": { "token": "jwt", "user": { "id", "name", "email", "role", "credits", "planName", "graceDaysRemaining" } } }
```
**Errors:** 400 VALIDATION_ERROR, 401 INVALID_CREDENTIALS

---

## USERS

### GET /users/me
**Auth:** Bearer token  
**Response 200:**
```json
{ "success": true, "data": { "user": { ...UserProfile } } }
```

### PATCH /users/me
**Auth:** Bearer token  
**Request:** `{ "name"?, "phone"? }`  
**Response 200:** Updated user profile

### GET /users/me/custom-dishes
**Auth:** Bearer token  
**Response 200:**
```json
{ "success": true, "data": { "dishes": [ ...CustomSavedDish ] } }
```

### POST /users/me/custom-dishes
**Auth:** Bearer token  
**Request:** CustomSavedDish payload (without id/createdAt — generated server-side)  
**Response 201:** `{ "success": true, "data": { "dish": {...} } }`

### PUT /users/me/custom-dishes/:dishId
**Auth:** Bearer token  
**Response 200:** Updated dish

### DELETE /users/me/custom-dishes/:dishId
**Auth:** Bearer token  
**Response 204:** No content

---

## MENU

### GET /menu/schedule
**Auth:** Public  
**Query:** `?day=Monday` (optional, returns all 7 days if omitted)  
**Response 200:**
```json
{ "success": true, "data": { "schedule": [ ...MealScheduleDay ] } }
```

### GET /menu/dishes
**Auth:** Public  
**Query:** `?category=sabji&dietary=veg&day=Monday&mealTime=lunch`  
**Response 200:**
```json
{ "success": true, "data": { "dishes": [ ...Dish ] } }
```

### GET /menu/rotis
**Auth:** Public  
**Response 200:**
```json
{ "success": true, "data": { "rotis": [ ...RotiOption ] } }
```

### GET /menu/fasting
**Auth:** Public  
**Response 200:**
```json
{ "success": true, "data": { "dishes": [ ...fastingDishes ] } }
```

---

## PLANS

### GET /plans
**Auth:** Public  
**Response 200:**
```json
{ "success": true, "data": { "plans": [ ...SubscriptionPlan ] } }
```

---

## ORDERS

### POST /orders
**Auth:** Bearer token (subscriber or customer)  
**Request:**
```json
{
  "day": "Monday",
  "mealTime": "lunch",
  "dishId": "string",
  "rotiId": "string",
  "rotiCount": 3,
  "includeDalChawal": true,
  "paymentMode": "credits|upi|card|cod",
  "deliveryAddress": "string",
  "deliverySlot": "string",
  "specialInstructions": "string"
}
```
**Response 201:**
```json
{
  "success": true,
  "data": {
    "order": { "id", "status": "Scheduled", "creditsDeducted", "priceINR", ... },
    "remainingCredits": 890
  }
}
```
**Errors:** 400 VALIDATION_ERROR, 402 INSUFFICIENT_CREDITS, 404 DISH_NOT_FOUND

---

### GET /orders
**Auth:** Bearer token (own orders)  
**Query:** `?status=Scheduled&page=1&limit=20`  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "orders": [ ...OrderItem ],
    "pagination": { "total", "page", "limit", "pages" }
  }
}
```

### GET /orders/:id
**Auth:** Bearer token (own order only)  
**Response 200:** Single order

### DELETE /orders/:id
**Auth:** Bearer token (own order, only `Scheduled` status)  
**Response 200:**
```json
{ "success": true, "data": { "refundedCredits": 10, "remainingCredits": 900 } }
```
**Errors:** 403 FORBIDDEN, 409 CANNOT_CANCEL_NON_SCHEDULED

---

## WALLET

### GET /wallet
**Auth:** Bearer token  
**Response 200:**
```json
{ "success": true, "data": { "credits": 890, "planName": "...", "graceDaysRemaining": 11 } }
```

### GET /wallet/transactions
**Auth:** Bearer token  
**Query:** `?page=1&limit=20`  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "transactions": [ { "id", "type": "credit|debit", "amount", "description", "createdAt" } ],
    "pagination": { ... }
  }
}
```

---

## PAYMENTS

### POST /payments/subscription
**Auth:** Bearer token  
**Request:**
```json
{ "planId": "flex_subscriber", "paymentMethod": "upi|card|gpay|cod", "paymentDetails": {} }
```
**Response 200:**
```json
{
  "success": true,
  "data": { "creditsAdded": 900, "remainingCredits": 900, "planExpiresAt": "ISO date", "transactionId": "TXN-..." }
}
```

### POST /payments/order
**Auth:** Bearer token  
**Request:**
```json
{ "orderId": "string", "paymentMethod": "upi|card|cod", "paymentDetails": {} }
```
**Response 200:**
```json
{ "success": true, "data": { "orderId", "amountPaid", "status": "paid" } }
```

---

## ADMIN

### GET /admin/orders
**Auth:** Bearer token (admin only)  
**Query:** `?mealTime=lunch&status=Scheduled&search=aarav&page=1&limit=50&date=2026-08-25`  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "orders": [ { ...order, "customerName", "customerPhone", "deliveryAddress" } ],
    "pagination": { ... }
  }
}
```

### PATCH /admin/orders/:id/status
**Auth:** Bearer token (admin only)  
**Request:**
```json
{ "status": "Preparing|Out for Delivery|Delivered" }
```
**Response 200:**
```json
{ "success": true, "data": { "order": { ...updatedOrder } } }
```
**Errors:** 400 INVALID_STATUS_TRANSITION, 404 ORDER_NOT_FOUND

### GET /admin/stats
**Auth:** Bearer token (admin only)  
**Query:** `?date=2026-08-25`  
**Response 200:**
```json
{
  "success": true,
  "data": {
    "totalLunchBoxes": 142,
    "totalRotiCount": 426,
    "sabjisToday": ["Paneer Kundan", "Mix Veg", "Soyabean Masala"],
    "dalRicePortions": 115,
    "ordersByStatus": { "Scheduled": 3, "Preparing": 1, "Out for Delivery": 1, "Delivered": 0 }
  }
}
```
