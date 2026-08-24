export type UserRole = 'admin' | 'customer' | 'subscriber';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  credits: number;
  planName?: string;
  graceDaysRemaining?: number;
  avatarInitials: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type MealTime = 'breakfast' | 'lunch' | 'dinner';

export type DietaryType = 'veg' | 'non-veg' | 'egg';

export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  imageNumber?: number;
  dietary: DietaryType;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  category: 'sabji' | 'breakfast_item' | 'dal_rice' | 'dessert' | 'special';
  credits: number;
  price: number; // in INR for walk-in
  tags: string[];
}

export interface RotiOption {
  id: string;
  name: string;
  image: string;
  imageNumber?: number;
  caloriesPerRoti: number;
  proteinPerRoti: number;
  isGlutenFree?: boolean;
}

export interface CustomSavedDish {
  id: string;
  name: string;
  category: 'custom_thali' | 'breakfast_combo' | 'special_bowl';
  dish: Dish;
  roti?: RotiOption;
  rotiCount: number;
  includeDalChawal: boolean;
  spiceLevel: 'mild' | 'medium' | 'spicy' | 'kolhapuri_fiery';
  oilPreference: 'desi_ghee' | 'cold_pressed' | 'low_oil';
  addOns: string[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  credits: number;
  priceINR: number;
  notes?: string;
  createdAt: string;
  tags: string[];
}

export interface MealScheduleDay {
  day: DayOfWeek;
  breakfast: {
    dishes: Dish[];
  };
  lunch: {
    rotis: RotiOption[];
    sabjis: Dish[];
    dalChawal: Dish;
  };
  dinner: {
    rotis: RotiOption[];
    sabjis: Dish[];
    dalChawal: Dish;
    dessert?: Dish;
  };
}

export interface UserSelection {
  day: DayOfWeek;
  mealTime: MealTime;
  selectedDish: Dish;
  selectedRoti?: RotiOption;
  rotiCount: number;
  includeDalChawal: boolean;
  isFastingMode: boolean;
  extraAddons: { [key: string]: number };
  deliverySlot: string;
  specialInstructions: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  credits: number;
  isPopular?: boolean;
  features: string[];
  recommendedFor: string;
}

export interface OrderItem {
  id: string;
  day: DayOfWeek;
  mealTime: MealTime;
  dishName: string;
  rotiName?: string;
  rotiCount?: number;
  dalChawal: boolean;
  creditsDeducted: number;
  priceINR: number;
  status: 'Scheduled' | 'Preparing' | 'Out for Delivery' | 'Delivered';
  date: string;
}
