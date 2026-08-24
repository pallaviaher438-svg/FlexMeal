# FlexMeal — Database Design

**Database:** MongoDB  
**ODM:** Mongoose  
**Strategy:** Soft delete on Orders (status = 'Cancelled'). Hard delete for custom dishes.

---

## Collections

### users
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| name | String | required |
| email | String | required, unique, lowercase |
| phone | String | required |
| passwordHash | String | bcrypt, never returned in API responses |
| role | String | enum: admin, subscriber, customer; default: customer |
| credits | Number | default: 0 |
| planName | String | e.g. "Flex 30-Day Pass" |
| planActivatedAt | Date | when subscription started |
| planExpiresAt | Date | +30 days from activation |
| graceExpiresAt | Date | +44 days from activation (30+14) |
| avatarInitials | String | derived: first letter of first + last name |
| createdAt | Date | auto |
| updatedAt | Date | auto |

**Indexes:** `email` (unique)

---

### dishes
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| dishId | String | e.g. "mon_lun_1", unique, used by frontend |
| name | String | required |
| description | String | |
| image | String | URL |
| imageNumber | Number | |
| dietary | String | enum: veg, non-veg, egg |
| calories | Number | |
| protein | Number | grams |
| carbs | Number | grams |
| fats | Number | grams |
| category | String | enum: sabji, breakfast_item, dal_rice, dessert, special |
| credits | Number | usually 10, 0 for dal_chawal/dessert included items |
| price | Number | INR |
| tags | [String] | |
| isActive | Boolean | default: true |

**Indexes:** `dishId` (unique), `category`, `dietary`

---

### rotioptions
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| rotiId | String | e.g. "wheat", unique |
| name | String | |
| image | String | URL |
| imageNumber | Number | |
| caloriesPerRoti | Number | |
| proteinPerRoti | Number | |
| isGlutenFree | Boolean | |
| isActive | Boolean | default: true |

---

### mealschedules
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| day | String | enum: Monday–Sunday |
| weekNumber | Number | for future rotation management |
| breakfast | Object | `{ dishes: [dishId refs] }` |
| lunch | Object | `{ rotis: [rotiId refs], sabjis: [dishId refs], dalChawalId: dishId }` |
| dinner | Object | `{ rotis: [rotiId refs], sabjis: [dishId refs], dalChawalId: dishId, dessertId?: dishId }` |
| isActive | Boolean | default: true |

---

### orders
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| orderId | String | "ORD-XXXXXX", unique, generated |
| userId | ObjectId | ref: users |
| day | String | enum: Monday–Sunday |
| mealTime | String | enum: breakfast, lunch, dinner |
| dishId | ObjectId | ref: dishes |
| dishName | String | denormalized snapshot |
| rotiId | ObjectId | ref: rotioptions, optional |
| rotiName | String | denormalized snapshot |
| rotiCount | Number | default: 0 |
| includeDalChawal | Boolean | |
| paymentMode | String | enum: credits, upi, card, cod |
| creditsDeducted | Number | 10 if credits, else 0 |
| priceINR | Number | |
| status | String | enum: Scheduled, Preparing, Out for Delivery, Delivered, Cancelled |
| deliveryAddress | String | |
| deliverySlot | String | |
| specialInstructions | String | |
| orderedAt | Date | auto |
| updatedAt | Date | auto |

**Indexes:** `userId`, `status`, `mealTime`, `orderedAt`, `orderId` (unique)

---

### wallettransactions
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| txId | String | "TX-XXXXXX", unique, generated |
| userId | ObjectId | ref: users |
| type | String | enum: credit, debit |
| amount | Number | credits (always positive) |
| description | String | human readable |
| relatedOrderId | ObjectId | ref: orders, optional |
| relatedPaymentId | String | optional |
| createdAt | Date | auto |

**Indexes:** `userId`, `createdAt`

---

### subscriptionplans
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| planId | String | e.g. "flex_subscriber", unique |
| name | String | |
| tagline | String | |
| price | Number | INR |
| period | String | display string |
| credits | Number | |
| isPopular | Boolean | |
| features | [String] | |
| recommendedFor | String | |
| isActive | Boolean | default: true |

---

### customsaveddishes
| Field | Type | Notes |
|-------|------|-------|
| _id | ObjectId | |
| customDishId | String | unique, generated |
| userId | ObjectId | ref: users |
| name | String | |
| category | String | enum: custom_thali, breakfast_combo, special_bowl |
| dishId | ObjectId | ref: dishes |
| rotiId | ObjectId | ref: rotioptions, optional |
| rotiCount | Number | |
| includeDalChawal | Boolean | |
| spiceLevel | String | enum: mild, medium, spicy, kolhapuri_fiery |
| oilPreference | String | enum: desi_ghee, cold_pressed, low_oil |
| addOns | [String] | |
| totalCalories | Number | |
| totalProtein | Number | |
| totalCarbs | Number | |
| totalFats | Number | |
| credits | Number | |
| priceINR | Number | |
| notes | String | |
| tags | [String] | |
| createdAt | Date | auto |
| updatedAt | Date | auto |

**Indexes:** `userId`

---

## Important Queries

1. **Admin order pipeline:** `Order.find({ status: { $ne: 'Cancelled' } }).populate('userId', 'name phone').sort({ orderedAt: -1 })`
2. **User order history:** `Order.find({ userId, status: { $ne: 'Cancelled' } }).sort({ orderedAt: -1 })`
3. **Credit check before order:** `User.findOne({ _id: userId, credits: { $gte: 10 } })`
4. **Atomic credit deduction:** `User.findOneAndUpdate({ _id: userId, credits: { $gte: 10 } }, { $inc: { credits: -10 } }, { new: true })`
5. **Wallet ledger:** `WalletTransaction.find({ userId }).sort({ createdAt: -1 }).limit(50)`
