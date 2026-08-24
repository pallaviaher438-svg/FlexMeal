import { Dish, RotiOption, MealScheduleDay, SubscriptionPlan, CustomSavedDish } from '../types';

// Curated accurate food imagery mapped precisely to Indian dish names
export const MEAL_IMAGE_REGISTRY: Record<string, string> = {
  // Rotis & Flatbreads
  'Homestyle Wheat Roti': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
  'Multigrain Roti (7 Grains)': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  'Bajra Bhakri (Pearl Millet)': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  'Jowar Bhakri (Sorghum)': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
  'Ragi Roti (Finger Millet)': 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',

  // Standard Rice & Dal
  'Homestyle Dal Tadka & Jeera Basmati Rice': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',

  // Fasting Specials
  'Maharashtrian Sabudana Khichdi': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  'Rajgira Puri & Vrat Sukha Aloo': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
  'Samak Rice (Moraiyo) & Peanut Kadhi': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',

  // Breakfast items
  'Uttappa with Chutneys': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80',
  'Peri-Peri Paneer Toast': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
  'Masala Poha': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
  'Bread Omelette': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
  'Protein Sprouts Bowl': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
  'Egg Sandwich': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
  'Chana Crunch Bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
  'Dhokla with Chutney': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
  'Idli with Sambar & Chutney': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  'Vegetable Roll': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
  'Egg Bhurji Roll': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',

  // Curries & Sabjis
  'Mix Veg': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
  'Paneer Kundan': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
  'Soyabean Masala': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
  'Dum Aloo': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
  'Matar Paneer': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  'Mushroom Masala': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
  'Chana Masala': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
  'Palak Paneer': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
  'Chicken Butter Masala': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
  'Rajma': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
  'Dahi Bhindi': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
  'Egg Curry': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  'Sev Tamatar': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
  'Besan Gatte Masala': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
  'Chicken Kolhapuri': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',

  // Sunday Specials
  'Misal Pav': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
  'Daal Bati': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
  'Mutton Masala': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
  'Veg Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
  'Chicken Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
  'Gulab Jamun (2 Pcs)': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80'
};

export const ROTI_OPTIONS: Record<string, RotiOption> = {
  wheat: {
    id: 'wheat',
    name: 'Homestyle Wheat Roti',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
    imageNumber: 3,
    caloriesPerRoti: 70,
    proteinPerRoti: 2.5,
    isGlutenFree: false
  },
  multigrain: {
    id: 'multigrain',
    name: 'Multigrain Roti (7 Grains)',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    imageNumber: 4,
    caloriesPerRoti: 80,
    proteinPerRoti: 3.8,
    isGlutenFree: false
  },
  bajra: {
    id: 'bajra',
    name: 'Bajra Bhakri (Pearl Millet)',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    imageNumber: 16,
    caloriesPerRoti: 95,
    proteinPerRoti: 3.2,
    isGlutenFree: true
  },
  jowar: {
    id: 'jowar',
    name: 'Jowar Bhakri (Sorghum)',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
    imageNumber: 21,
    caloriesPerRoti: 88,
    proteinPerRoti: 3.0,
    isGlutenFree: true
  },
  ragi: {
    id: 'ragi',
    name: 'Ragi Roti (Finger Millet)',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80',
    imageNumber: 24,
    caloriesPerRoti: 78,
    proteinPerRoti: 2.2,
    isGlutenFree: true
  }
};

export const DAL_CHAWAL_STANDARD: Dish = {
  id: 'dal_chawal_standard',
  name: 'Homestyle Dal Tadka & Jeera Basmati Rice',
  description: 'Slow-tempered yellow toor dal with cumin, ghee, garlic, and fluffy steamed basmati rice.',
  image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
  imageNumber: 8,
  dietary: 'veg',
  calories: 220,
  protein: 8,
  carbs: 38,
  fats: 4,
  category: 'dal_rice',
  credits: 0, // Optional daily add-on (included or nominal +₹30)
  price: 30,
  tags: ['Daily Standard', 'High Fiber', 'Comfort Food']
};

export const FASTING_MEALS: Dish[] = [
  {
    id: 'sabudana_khichdi',
    name: 'Maharashtrian Sabudana Khichdi',
    description: 'Sago pearls tossed with roasted crunchy peanuts, green chillies, potatoes, and pure desi ghee.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    dietary: 'veg',
    calories: 420,
    protein: 6,
    carbs: 64,
    fats: 14,
    category: 'special',
    credits: 10,
    price: 85,
    tags: ['Vrat Special', 'Sendha Namak', 'Gluten Free']
  },
  {
    id: 'rajgira_puri_aloo',
    name: 'Rajgira Puri & Vrat Sukha Aloo',
    description: '4 Crisp amaranth flour puris served with cumin-tempered potato mash and fresh curd.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    dietary: 'veg',
    calories: 460,
    protein: 9,
    carbs: 58,
    fats: 16,
    category: 'special',
    credits: 10,
    price: 90,
    tags: ['Vrat Approved', 'Pure Desi Ghee', 'Shravan/Ekadashi']
  },
  {
    id: 'samak_rice_khichdi',
    name: 'Samak Rice (Moraiyo) & Peanut Kadhi',
    description: 'Barnyard millet cooked with roasted cumin and served with warm spiced peanut yogurt kadhi.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    dietary: 'veg',
    calories: 380,
    protein: 8,
    carbs: 54,
    fats: 10,
    category: 'special',
    credits: 10,
    price: 85,
    tags: ['Vrat Fasting', 'Low GI', 'Light Meal']
  }
];

export const WEEKLY_SCHEDULE: MealScheduleDay[] = [
  // ===================== MONDAY =====================
  {
    day: 'Monday',
    breakfast: {
      dishes: [
        {
          id: 'mon_bf_1',
          name: 'Uttappa with Chutneys',
          description: 'Fluffy fermented rice-lentil savoury pancake loaded with diced red onions, fresh coriander, and tomato concasse.',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80',
          imageNumber: 1,
          dietary: 'veg',
          calories: 310,
          protein: 8,
          carbs: 52,
          fats: 6,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Fermented', 'Probiotic', 'South Indian']
        },
        {
          id: 'mon_bf_2',
          name: 'Peri-Peri Paneer Toast',
          description: 'Spiced cottage cheese cubes tossed in piquant peri-peri rub, grilled between whole-grain sourdough slices.',
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
          imageNumber: 2,
          dietary: 'veg',
          calories: 380,
          protein: 18,
          carbs: 42,
          fats: 12,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['High Protein', 'Whole Grain', 'Chef Special']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.multigrain],
      sabjis: [
        {
          id: 'mon_lun_1',
          name: 'Mix Veg',
          description: 'Garden fresh cauliflower florets, french beans, carrots, and sweet green peas simmered in a spiced homestyle onion-tomato gravy.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 5,
          dietary: 'veg',
          calories: 240,
          protein: 7,
          carbs: 26,
          fats: 9,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['Rich in Fiber', '3 Rotis Included', 'Zero Preservatives']
        },
        {
          id: 'mon_lun_2',
          name: 'Paneer Kundan',
          description: 'Tender malai paneer steeped in a velvety golden cashew-melon seed gravy infused with shahi jeera and green cardamom.',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
          imageNumber: 6,
          dietary: 'veg',
          calories: 340,
          protein: 19,
          carbs: 18,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['Rich & Creamy', '3 Rotis Included', 'High Protein']
        },
        {
          id: 'mon_lun_3',
          name: 'Soyabean Masala',
          description: 'Nutritious soya chunks pressure-cooked in a robust rustic Maharashtrian curry packed with roasted spices.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 7,
          dietary: 'veg',
          calories: 290,
          protein: 26,
          carbs: 22,
          fats: 8,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['26g Protein', '3 Rotis Included', 'Lean Plant Protein']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.multigrain],
      sabjis: [
        {
          id: 'mon_din_1',
          name: 'Dum Aloo',
          description: 'Baby potatoes slow simmered in an aromatic Kashmiri red chilli and fennel yoghurt gravy.',
          image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
          imageNumber: 9,
          dietary: 'veg',
          calories: 270,
          protein: 5,
          carbs: 38,
          fats: 10,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Classic Homestyle', 'Mildly Spiced']
        },
        {
          id: 'mon_din_2',
          name: 'Matar Paneer',
          description: 'Succulent paneer cubes and tender green peas cooked in a rich, lightly spiced onion-tomato masala.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 10,
          dietary: 'veg',
          calories: 320,
          protein: 17,
          carbs: 20,
          fats: 15,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Comfort Favorite', 'Fresh Peas']
        },
        {
          id: 'mon_din_3',
          name: 'Mushroom Masala',
          description: 'Fresh sliced button mushrooms cooked with crunchy bell peppers in a freshly roasted coriander and red pepper masala.',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
          imageNumber: 11,
          dietary: 'veg',
          calories: 220,
          protein: 8,
          carbs: 18,
          fats: 7,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Low Calorie', 'Antioxidant Rich']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== TUESDAY =====================
  {
    day: 'Tuesday',
    breakfast: {
      dishes: [
        {
          id: 'tue_bf_1',
          name: 'Masala Poha',
          description: 'Flattened rice tossed with roasted peanuts, mustard seeds, curry leaves, onions, turmeric, and fresh lime juice.',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
          imageNumber: 12,
          dietary: 'veg',
          calories: 280,
          protein: 6,
          carbs: 48,
          fats: 8,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Maharashtrian Classic', 'Light on Stomach']
        },
        {
          id: 'tue_bf_2',
          name: 'Bread Omelette',
          description: 'Double-egg fluffy masala omelette with onions, tomatoes, and green chillies sandwiched between toasted wheat bread.',
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 13,
          dietary: 'egg',
          calories: 360,
          protein: 20,
          carbs: 34,
          fats: 14,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['20g Protein', 'Fresh Double Egg']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.bajra],
      sabjis: [
        {
          id: 'tue_lun_1',
          name: 'Chana Masala',
          description: 'Kabuli chickpeas simmered in an aromatic punjabi pomegranate and roasted cumin gravy.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 17,
          dietary: 'veg',
          calories: 310,
          protein: 15,
          carbs: 44,
          fats: 8,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['High Fiber', '3 Rotis Included', 'Plant Protein']
        },
        {
          id: 'tue_lun_2',
          name: 'Palak Paneer',
          description: 'Fresh spinach puree tempered with burnt garlic, finished with soft diced cottage cheese cubes.',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
          imageNumber: 18,
          dietary: 'veg',
          calories: 290,
          protein: 18,
          carbs: 12,
          fats: 16,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['Iron Rich', '3 Rotis Included', 'Fresh Greens']
        },
        {
          id: 'tue_lun_3',
          name: 'Chicken Butter Masala',
          description: 'Tender boneless chicken morsels simmered in a silky tomato, cashew, and butter makhani gravy.',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
          imageNumber: 19,
          dietary: 'non-veg',
          calories: 390,
          protein: 34,
          carbs: 14,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 100,
          tags: ['34g Protein', '3 Rotis Included', 'Chef Special']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.bajra],
      sabjis: [
        {
          id: 'tue_din_1',
          name: 'Rajma',
          description: 'Kashmiri red kidney beans slow cooked overnight with ginger, bay leaves, and whole spices.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 20,
          dietary: 'veg',
          calories: 280,
          protein: 14,
          carbs: 46,
          fats: 6,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Heart Healthy', 'Comfort Food']
        },
        {
          id: 'tue_din_2',
          name: 'Dahi Bhindi',
          description: 'Crispy pan-fried tender ladyfingers tossed in a tangy spiced yogurt gravy with cumin seeds.',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
          imageNumber: 22,
          dietary: 'veg',
          calories: 210,
          protein: 6,
          carbs: 22,
          fats: 9,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Tangy & Light', 'Zero Sticky']
        },
        {
          id: 'tue_din_3',
          name: 'Egg Curry',
          description: '2 Farm-fresh boiled eggs pan-seared and simmered in a spiced onion, tomato, and ginger curry.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 23,
          dietary: 'egg',
          calories: 310,
          protein: 16,
          carbs: 14,
          fats: 15,
          category: 'sabji',
          credits: 10,
          price: 95,
          tags: ['3 Rotis Included', 'Double Egg', 'High Bioavailable Protein']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== WEDNESDAY =====================
  {
    day: 'Wednesday',
    breakfast: {
      dishes: [
        {
          id: 'wed_bf_1',
          name: 'Protein Sprouts Bowl',
          description: 'Steamed sprouted moong & black chana salad tossed with pomegranate pearls, cucumber, tomato, and chaat masala.',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
          imageNumber: 14,
          dietary: 'veg',
          calories: 220,
          protein: 16,
          carbs: 36,
          fats: 3,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['16g Clean Protein', 'Zero Oil', 'Pre-Workout']
        },
        {
          id: 'wed_bf_2',
          name: 'Egg Sandwich',
          description: 'Boiled egg slices tossed with light herb dressing, crisp lettuce, and cracked pepper in toasted multigrain bread.',
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
          imageNumber: 15,
          dietary: 'egg',
          calories: 330,
          protein: 18,
          carbs: 32,
          fats: 10,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['18g Protein', 'Fitness Fuel']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.jowar],
      sabjis: [
        {
          id: 'wed_lun_1',
          name: 'Rajma',
          description: 'Slow-simmered Kashmiri rajma cooked with whole spices, tomato puree, and desi ghee tadka.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 20,
          dietary: 'veg',
          calories: 280,
          protein: 14,
          carbs: 46,
          fats: 6,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Comfort Food', 'High Fiber']
        },
        {
          id: 'wed_lun_2',
          name: 'Dahi Bhindi',
          description: 'Fresh ladyfinger stir fried with spices, bathed in a silky roasted cumin yogurt sauce.',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
          imageNumber: 22,
          dietary: 'veg',
          calories: 210,
          protein: 6,
          carbs: 22,
          fats: 9,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Tangy & Homestyle']
        },
        {
          id: 'wed_lun_3',
          name: 'Egg Curry',
          description: 'Boiled eggs cooked in a rustic golden masala gravy with coriander and mustard seeds.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 23,
          dietary: 'egg',
          calories: 310,
          protein: 16,
          carbs: 14,
          fats: 15,
          category: 'sabji',
          credits: 10,
          price: 95,
          tags: ['3 Rotis Included', 'Protein Packed']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.jowar],
      sabjis: [
        {
          id: 'wed_din_1',
          name: 'Chana Masala',
          description: 'Black chickpeas slow braised in aromatic spices and amchur.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 17,
          dietary: 'veg',
          calories: 300,
          protein: 15,
          carbs: 42,
          fats: 7,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Rich in Plant Protein']
        },
        {
          id: 'wed_din_2',
          name: 'Palak Paneer',
          description: 'Spinach and fresh cottage cheese with burnt garlic aroma.',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
          imageNumber: 18,
          dietary: 'veg',
          calories: 290,
          protein: 18,
          carbs: 12,
          fats: 16,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Rich in Micro-nutrients']
        },
        {
          id: 'wed_din_3',
          name: 'Chicken Butter Masala',
          description: 'Tender chicken simmered in rich creamy tomato and kasoori methi gravy.',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
          imageNumber: 19,
          dietary: 'non-veg',
          calories: 390,
          protein: 34,
          carbs: 14,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 100,
          tags: ['3 Rotis Included', '34g Protein', 'Gourmet']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== THURSDAY =====================
  {
    day: 'Thursday',
    breakfast: {
      dishes: [
        {
          id: 'thu_bf_1',
          name: 'Chana Crunch Bowl',
          description: 'Boiled black desi chickpeas tossed with chopped onions, green chillies, ginger slivers and fresh mint.',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
          imageNumber: 14,
          dietary: 'veg',
          calories: 270,
          protein: 14,
          carbs: 40,
          fats: 5,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Pre-Workout Fuel', 'Low Calorie', 'High Fiber']
        },
        {
          id: 'thu_bf_2',
          name: 'Uttappa with Chutneys',
          description: 'Thick fermented rice-dal base topped with bell peppers, tomatoes and served with fresh coconut chutney.',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80',
          imageNumber: 1,
          dietary: 'veg',
          calories: 310,
          protein: 8,
          carbs: 52,
          fats: 6,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Traditional South Indian', 'Fermented']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.ragi],
      sabjis: [
        {
          id: 'thu_lun_1',
          name: 'Mix Veg',
          description: 'Beans, carrots, cauliflower and green peas in a medium spiced gravy.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 5,
          dietary: 'veg',
          calories: 240,
          protein: 7,
          carbs: 26,
          fats: 9,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Fiber Rich']
        },
        {
          id: 'thu_lun_2',
          name: 'Paneer Kundan',
          description: 'Creamy paneer cubes in velvety cashew-melon seed gravy.',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
          imageNumber: 6,
          dietary: 'veg',
          calories: 340,
          protein: 19,
          carbs: 18,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'High Protein']
        },
        {
          id: 'thu_lun_3',
          name: 'Soyabean Masala',
          description: 'Protein rich soya chunks slow cooked in Maharashtrian goda masala.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 7,
          dietary: 'veg',
          calories: 290,
          protein: 26,
          carbs: 22,
          fats: 8,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', '26g Protein']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.ragi],
      sabjis: [
        {
          id: 'thu_din_1',
          name: 'Dum Aloo',
          description: 'Baby potatoes cooked in aromatic Kashmiri spices.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 9,
          dietary: 'veg',
          calories: 270,
          protein: 5,
          carbs: 38,
          fats: 10,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Comfort Food']
        },
        {
          id: 'thu_din_2',
          name: 'Matar Paneer',
          description: 'Paneer cubes and green peas in onion-tomato gravy.',
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 10,
          dietary: 'veg',
          calories: 320,
          protein: 17,
          carbs: 20,
          fats: 15,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Classic Flavor']
        },
        {
          id: 'thu_din_3',
          name: 'Mushroom Masala',
          description: 'Sliced button mushrooms with bell peppers and roasted spices.',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
          imageNumber: 11,
          dietary: 'veg',
          calories: 220,
          protein: 8,
          carbs: 18,
          fats: 7,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Light & Nutritious']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== FRIDAY =====================
  {
    day: 'Friday',
    breakfast: {
      dishes: [
        {
          id: 'fri_bf_1',
          name: 'Dhokla with Chutney',
          description: 'Spongy steamed gram-flour savoury squares tempered with mustard seeds, curry leaves, and green chillies.',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
          imageNumber: 12,
          dietary: 'veg',
          calories: 230,
          protein: 9,
          carbs: 38,
          fats: 4,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Steamed', 'Zero Oil option', 'Light on Stomach']
        },
        {
          id: 'fri_bf_2',
          name: 'Egg Sandwich',
          description: 'Double egg slices with herbs, lettuce and light vinaigrette in whole wheat bread.',
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
          imageNumber: 15,
          dietary: 'egg',
          calories: 340,
          protein: 18,
          carbs: 32,
          fats: 11,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['18g Protein', 'High Protein Fuel']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.multigrain],
      sabjis: [
        {
          id: 'fri_lun_1',
          name: 'Chana Masala',
          description: 'Black chickpeas slow cooked in rich roasted Punjabi masala.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 17,
          dietary: 'veg',
          calories: 310,
          protein: 15,
          carbs: 44,
          fats: 8,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'High Fiber']
        },
        {
          id: 'fri_lun_2',
          name: 'Palak Paneer',
          description: 'Spinach puree with paneer cubes and garlic tadka.',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
          imageNumber: 18,
          dietary: 'veg',
          calories: 290,
          protein: 18,
          carbs: 12,
          fats: 16,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Iron Packed']
        },
        {
          id: 'fri_lun_3',
          name: 'Chicken Butter Masala',
          description: 'Succulent chicken in aromatic tomato makhani sauce.',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
          imageNumber: 19,
          dietary: 'non-veg',
          calories: 390,
          protein: 34,
          carbs: 14,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 100,
          tags: ['3 Rotis Included', '34g Protein']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.multigrain],
      sabjis: [
        {
          id: 'fri_din_1',
          name: 'Sev Tamatar',
          description: 'Crisp ratlami sev simmered in sweet-tangy spiced tomato broth with cumin and coriander.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 25,
          dietary: 'veg',
          calories: 290,
          protein: 9,
          carbs: 30,
          fats: 14,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Spicy & Tangy', 'Dhaba Style']
        },
        {
          id: 'fri_din_2',
          name: 'Besan Gatte Masala',
          description: 'Steamed spiced gram flour dumplings cooked in a fragrant spiced curd curry.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 26,
          dietary: 'veg',
          calories: 310,
          protein: 14,
          carbs: 32,
          fats: 12,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Traditional Rajasthani']
        },
        {
          id: 'fri_din_3',
          name: 'Chicken Kolhapuri',
          description: 'Tender chicken cuts slow-simmered in a fiery, roasted coconut and red byadgi chilli gravy.',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
          imageNumber: 27,
          dietary: 'non-veg',
          calories: 410,
          protein: 36,
          carbs: 10,
          fats: 22,
          category: 'sabji',
          credits: 10,
          price: 100,
          tags: ['3 Rotis Included', '36g Protein', 'Fiery Spices']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== SATURDAY =====================
  {
    day: 'Saturday',
    breakfast: {
      dishes: [
        {
          id: 'sat_bf_1',
          name: 'Peri-Peri Paneer Toast',
          description: 'Spiced cottage cheese toasted on whole wheat sourdough.',
          image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
          imageNumber: 2,
          dietary: 'veg',
          calories: 380,
          protein: 18,
          carbs: 42,
          fats: 12,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['High Protein Weekend Fuel']
        },
        {
          id: 'sat_bf_2',
          name: 'Idli with Sambar & Chutney',
          description: '4 Pillowy soft steamed rice cakes served with hot vegetable lentil stew and coconut chutney.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 13,
          dietary: 'veg',
          calories: 290,
          protein: 10,
          carbs: 56,
          fats: 3,
          category: 'breakfast_item',
          credits: 10,
          price: 50,
          tags: ['Zero Oil', 'Easy Digestion', 'South Indian']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.jowar],
      sabjis: [
        {
          id: 'sat_lun_1',
          name: 'Dum Aloo',
          description: 'Baby potatoes cooked in aromatic Kashmiri spices.',
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
          imageNumber: 9,
          dietary: 'veg',
          calories: 270,
          protein: 5,
          carbs: 38,
          fats: 10,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Homestyle Classic']
        },
        {
          id: 'sat_lun_2',
          name: 'Matar Paneer',
          description: 'Paneer cubes and green peas in rich onion-tomato masala.',
          image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 10,
          dietary: 'veg',
          calories: 320,
          protein: 17,
          carbs: 20,
          fats: 15,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Weekend Favorite']
        },
        {
          id: 'sat_lun_3',
          name: 'Mushroom Masala',
          description: 'Fresh sliced mushrooms with bell peppers and roasted spices.',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
          imageNumber: 11,
          dietary: 'veg',
          calories: 220,
          protein: 8,
          carbs: 18,
          fats: 7,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Rich Aroma']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.jowar],
      sabjis: [
        {
          id: 'sat_din_1',
          name: 'Mix Veg',
          description: 'Garden fresh vegetables cooked in homestyle gravy.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 5,
          dietary: 'veg',
          calories: 240,
          protein: 7,
          carbs: 26,
          fats: 9,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'High Fiber']
        },
        {
          id: 'sat_din_2',
          name: 'Paneer Kundan',
          description: 'Creamy paneer in fragrant cashew and shahi melon sauce.',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
          imageNumber: 6,
          dietary: 'veg',
          calories: 340,
          protein: 19,
          carbs: 18,
          fats: 18,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', 'Weekend Indulgence']
        },
        {
          id: 'sat_din_3',
          name: 'Soyabean Masala',
          description: 'High protein soya chunks cooked in hearty curry.',
          image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
          imageNumber: 7,
          dietary: 'veg',
          calories: 290,
          protein: 26,
          carbs: 22,
          fats: 8,
          category: 'sabji',
          credits: 10,
          price: 90,
          tags: ['3 Rotis Included', '26g Protein']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    }
  },

  // ===================== SUNDAY =====================
  {
    day: 'Sunday',
    breakfast: {
      dishes: [
        {
          id: 'sun_bf_1',
          name: 'Vegetable Roll',
          description: 'Handmade flaky wheat paratha wrapped around spiced julienned vegetables, mint chutney, and raw onions.',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
          imageNumber: 27,
          dietary: 'veg',
          calories: 330,
          protein: 9,
          carbs: 48,
          fats: 10,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['Street Style Healthy', 'Sunday Brunch']
        },
        {
          id: 'sun_bf_2',
          name: 'Egg Bhurji Roll',
          description: 'Spiced Mumbai-style scrambled eggs with green chilies, tomatoes, and cilantro rolled in a hot buttered paratha.',
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 28,
          dietary: 'egg',
          calories: 420,
          protein: 24,
          carbs: 38,
          fats: 18,
          category: 'breakfast_item',
          credits: 10,
          price: 60,
          tags: ['24g Protein', 'Sunday Sensation']
        }
      ]
    },
    lunch: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.bajra],
      sabjis: [
        {
          id: 'sun_lun_1',
          name: 'Misal Pav',
          description: 'Sprouted moth bean curry with spicy kat/tarri gravy, farsan crunch, chopped onions, lemon, and 2 fresh bakery pavs.',
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
          imageNumber: 28,
          dietary: 'veg',
          calories: 480,
          protein: 16,
          carbs: 68,
          fats: 14,
          category: 'special',
          credits: 10,
          price: 95,
          tags: ['Spicy Feast', 'Maharashtra Icon']
        },
        {
          id: 'sun_lun_2',
          name: 'Daal Bati',
          description: '3 Oven-baked wheat baatis crushed with desi ghee, paired with panchmel spiced dal and sweet cardamom churma.',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
          imageNumber: 28,
          dietary: 'veg',
          calories: 580,
          protein: 18,
          carbs: 76,
          fats: 22,
          category: 'special',
          credits: 10,
          price: 100,
          tags: ['Pure Desi Ghee', 'Royal Heritage']
        },
        {
          id: 'sun_lun_3',
          name: 'Mutton Masala',
          description: 'Tender on-the-bone goat meat slow cooked for 3 hours in a deeply spiced whole coriander and brown onion gravy.',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
          imageNumber: 28,
          dietary: 'non-veg',
          calories: 520,
          protein: 38,
          carbs: 12,
          fats: 32,
          category: 'special',
          credits: 10,
          price: 120,
          tags: ['38g Protein', 'Slow-Simmered 3h', 'Sunday Chef Special']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD
    },
    dinner: {
      rotis: [ROTI_OPTIONS.wheat, ROTI_OPTIONS.bajra],
      sabjis: [
        {
          id: 'sun_din_1',
          name: 'Veg Biryani',
          description: 'Fragrant basmati rice layered with garden vegetables, saffron milk, caramelized mint & fried onions, slow cooked in dum.',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 29,
          dietary: 'veg',
          calories: 490,
          protein: 14,
          carbs: 72,
          fats: 15,
          category: 'special',
          credits: 10,
          price: 100,
          tags: ['Dum Cooked', 'Saffron Infused', 'Sunday Celebration']
        },
        {
          id: 'sun_din_2',
          name: 'Chicken Biryani',
          description: 'Aromatic basmati rice cooked on charcoal dum with tender marinated chicken pieces, whole spices, and mint raita.',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
          imageNumber: 29,
          dietary: 'non-veg',
          calories: 560,
          protein: 36,
          carbs: 65,
          fats: 18,
          category: 'special',
          credits: 10,
          price: 110,
          tags: ['36g Protein', 'Dum Pukht', 'Chef Bestseller']
        }
      ],
      dalChawal: DAL_CHAWAL_STANDARD,
      dessert: {
        id: 'sun_dessert_1',
        name: 'Gulab Jamun (2 Pcs)',
        description: 'Golden fried khoya dumplings soaked in warm rosewater and green cardamom sugar syrup.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
        imageNumber: 30,
        dietary: 'veg',
        calories: 220,
        protein: 4,
        carbs: 42,
        fats: 6,
        category: 'dessert',
        credits: 0, // Included as Sunday sweet treat
        price: 35,
        tags: ['Sweet Finale', 'Pure Khoya']
      }
    }
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'flex_subscriber',
    name: 'The Flex Subscriber (30-Day Pass)',
    tagline: 'Pre-paid 30-day package priced at ₹5,799 securing complete scheduling freedom.',
    price: 5799,
    period: '/month (30 Days)',
    credits: 900,
    isPopular: true,
    features: [
      '900 Credit Points monthly (30 points/day = 10 pts per meal)',
      '10 points deducted per meal (Breakfast, Lunch, or Dinner)',
      '3 Rotis included with each sabji meal at zero extra credit/cost',
      'Unused points rollover for a 2-week grace period (44-day total validity)',
      'Fasting Mode included: Swap regular meal credits for vrat items',
      'Optional Dal Chawal add-on available daily for Lunch & Dinner',
      'Free express priority delivery to hostel/PG/office'
    ],
    recommendedFor: 'Save ~40% vs Walk-In rates'
  },
  {
    id: 'walk_in',
    name: 'Pay-As-You-Go Walk-In',
    tagline: 'Pay-per-meal single orders for non-subscribers at standard unbundled rates.',
    price: 0,
    period: 'Pay per meal',
    credits: 0,
    isPopular: false,
    features: [
      'Breakfast: ₹50–₹60 base unbundled rate',
      'Lunch: ₹90–₹100 (Includes 3 fresh rotis + choice of 1 sabji)',
      'Dinner: ₹90–₹100 (Includes 3 fresh rotis + choice of 1 sabji)',
      'Optional Dal Chawal add-on for +₹30',
      'No upfront lock-in or subscription commitments',
      'Instant UPI, Card & Cash payment options'
    ],
    recommendedFor: 'Trial & Occasional Diners'
  },
  {
    id: 'fitness_pro',
    name: 'Fitness & High Protein 30-Day Pack',
    tagline: 'Targeted high-protein nutrition with guaranteed 30g+ protein per lunch/dinner.',
    price: 6799,
    period: '/month',
    credits: 900,
    isPopular: false,
    features: [
      '900 High-Protein Credits with automatic macro calculator',
      'High protein sabjis (Soyabean Masala, Chicken Butter Masala, Paneer)',
      '14-day Grace Rollover window included',
      'Direct macro & calorie tracking on every selection',
      'Free upgrade to Multigrain & Millet rotis (Ragi/Bajra/Jowar)'
    ],
    recommendedFor: 'Gym & Fitness Focused Lifestyles'
  }
];

// Helper collection of all unique dishes in the menu catalog for the custom dish builder
export const ALL_MENU_DISHES: Dish[] = [
  // Breakfasts
  {
    id: 'dish_uttappa',
    name: 'Uttappa with Chutneys',
    description: 'Fluffy fermented rice-lentil savoury pancake with diced onions, tomatoes, and coriander.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80',
    imageNumber: 1,
    dietary: 'veg',
    calories: 310,
    protein: 8,
    carbs: 52,
    fats: 6,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['Fermented', 'Probiotic', 'South Indian']
  },
  {
    id: 'dish_peri_paneer_toast',
    name: 'Peri-Peri Paneer Toast',
    description: 'Spiced cottage cheese cubes in piquant peri-peri rub, grilled between sourdough slices.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80',
    imageNumber: 2,
    dietary: 'veg',
    calories: 380,
    protein: 18,
    carbs: 42,
    fats: 12,
    category: 'breakfast_item',
    credits: 10,
    price: 60,
    tags: ['High Protein', 'Whole Grain']
  },
  {
    id: 'dish_poha',
    name: 'Masala Poha',
    description: 'Flattened rice with peanuts, curry leaves, onions, turmeric, and fresh lime juice.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    imageNumber: 12,
    dietary: 'veg',
    calories: 280,
    protein: 6,
    carbs: 48,
    fats: 8,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['Maharashtrian Classic', 'Light on Stomach']
  },
  {
    id: 'dish_bread_omelette',
    name: 'Bread Omelette',
    description: 'Double-egg fluffy masala omelette with onions, tomatoes, and toasted wheat bread.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    imageNumber: 13,
    dietary: 'egg',
    calories: 360,
    protein: 20,
    carbs: 34,
    fats: 14,
    category: 'breakfast_item',
    credits: 10,
    price: 60,
    tags: ['20g Protein', 'Fresh Double Egg']
  },
  {
    id: 'dish_sprouts_bowl',
    name: 'Protein Sprouts Bowl',
    description: 'Steamed sprouted moong & black chana salad with pomegranate pearls and cucumber.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
    imageNumber: 14,
    dietary: 'veg',
    calories: 220,
    protein: 16,
    carbs: 36,
    fats: 3,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['16g Clean Protein', 'Zero Oil']
  },
  {
    id: 'dish_egg_sandwich',
    name: 'Egg Sandwich',
    description: 'Boiled egg slices with light herb dressing, crisp lettuce, and cracked pepper in toasted wheat bread.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    imageNumber: 15,
    dietary: 'egg',
    calories: 330,
    protein: 18,
    carbs: 32,
    fats: 10,
    category: 'breakfast_item',
    credits: 10,
    price: 60,
    tags: ['18g Protein', 'Fitness Fuel']
  },
  {
    id: 'dish_chana_crunch',
    name: 'Chana Crunch Bowl',
    description: 'Boiled black desi chickpeas with onions, green chillies, ginger slivers and fresh mint.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    imageNumber: 14,
    dietary: 'veg',
    calories: 270,
    protein: 14,
    carbs: 40,
    fats: 5,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['Pre-Workout Fuel', 'High Fiber']
  },
  {
    id: 'dish_dhokla',
    name: 'Dhokla with Chutney',
    description: 'Spongy steamed gram-flour savoury squares tempered with mustard seeds and curry leaves.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    imageNumber: 12,
    dietary: 'veg',
    calories: 230,
    protein: 9,
    carbs: 38,
    fats: 4,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['Steamed', 'Light on Stomach']
  },
  {
    id: 'dish_idli_sambar',
    name: 'Idli with Sambar & Chutney',
    description: '4 Pillowy soft steamed rice cakes with vegetable lentil sambar and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    imageNumber: 13,
    dietary: 'veg',
    calories: 290,
    protein: 10,
    carbs: 56,
    fats: 3,
    category: 'breakfast_item',
    credits: 10,
    price: 50,
    tags: ['Zero Oil', 'Easy Digestion']
  },
  {
    id: 'dish_veg_roll',
    name: 'Vegetable Roll',
    description: 'Handmade flaky wheat paratha wrapped around spiced julienned vegetables and mint chutney.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    imageNumber: 27,
    dietary: 'veg',
    calories: 330,
    protein: 9,
    carbs: 48,
    fats: 10,
    category: 'breakfast_item',
    credits: 10,
    price: 60,
    tags: ['Street Style Healthy']
  },
  {
    id: 'dish_egg_bhurji_roll',
    name: 'Egg Bhurji Roll',
    description: 'Spiced scrambled eggs with chilies and cilantro rolled in hot paratha.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80',
    imageNumber: 28,
    dietary: 'egg',
    calories: 420,
    protein: 24,
    carbs: 38,
    fats: 18,
    category: 'breakfast_item',
    credits: 10,
    price: 60,
    tags: ['24g Protein', 'Egg Special']
  },

  // Sabjis / Gravies
  {
    id: 'dish_mix_veg',
    name: 'Mix Veg',
    description: 'Cauliflower, french beans, carrots, and sweet peas in homestyle spiced onion-tomato gravy.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    imageNumber: 5,
    dietary: 'veg',
    calories: 240,
    protein: 7,
    carbs: 26,
    fats: 9,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['Rich in Fiber', '3 Rotis Included']
  },
  {
    id: 'dish_paneer_kundan',
    name: 'Paneer Kundan',
    description: 'Tender malai paneer in a velvety golden cashew-melon seed gravy infused with shahi jeera.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80',
    imageNumber: 6,
    dietary: 'veg',
    calories: 340,
    protein: 19,
    carbs: 18,
    fats: 18,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['Rich & Creamy', '3 Rotis Included', 'High Protein']
  },
  {
    id: 'dish_soyabean_masala',
    name: 'Soyabean Masala',
    description: 'Nutritious soya chunks pressure-cooked in a robust rustic Maharashtrian curry.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
    imageNumber: 7,
    dietary: 'veg',
    calories: 290,
    protein: 26,
    carbs: 22,
    fats: 8,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['26g Protein', '3 Rotis Included', 'Lean Plant Protein']
  },
  {
    id: 'dish_dum_aloo',
    name: 'Dum Aloo',
    description: 'Baby potatoes slow simmered in an aromatic Kashmiri red chilli and fennel gravy.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80',
    imageNumber: 9,
    dietary: 'veg',
    calories: 270,
    protein: 5,
    carbs: 38,
    fats: 10,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Classic Homestyle']
  },
  {
    id: 'dish_matar_paneer',
    name: 'Matar Paneer',
    description: 'Succulent paneer cubes and sweet green peas cooked in onion-tomato masala.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    imageNumber: 10,
    dietary: 'veg',
    calories: 320,
    protein: 17,
    carbs: 20,
    fats: 15,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Fresh Peas']
  },
  {
    id: 'dish_mushroom_masala',
    name: 'Mushroom Masala',
    description: 'Fresh sliced button mushrooms with bell peppers and freshly roasted coriander spices.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=700&q=80',
    imageNumber: 11,
    dietary: 'veg',
    calories: 220,
    protein: 8,
    carbs: 18,
    fats: 7,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Low Calorie']
  },
  {
    id: 'dish_chana_masala',
    name: 'Chana Masala',
    description: 'Kabuli chickpeas simmered in aromatic punjabi pomegranate and roasted cumin gravy.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
    imageNumber: 17,
    dietary: 'veg',
    calories: 310,
    protein: 15,
    carbs: 44,
    fats: 8,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['High Fiber', '3 Rotis Included']
  },
  {
    id: 'dish_palak_paneer',
    name: 'Palak Paneer',
    description: 'Fresh spinach puree tempered with burnt garlic and soft diced cottage cheese cubes.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    imageNumber: 18,
    dietary: 'veg',
    calories: 290,
    protein: 18,
    carbs: 12,
    fats: 16,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['Iron Rich', '3 Rotis Included']
  },
  {
    id: 'dish_chicken_butter_masala',
    name: 'Chicken Butter Masala',
    description: 'Boneless chicken morsels simmered in silky tomato, cashew, and butter makhani gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
    imageNumber: 19,
    dietary: 'non-veg',
    calories: 390,
    protein: 34,
    carbs: 14,
    fats: 18,
    category: 'sabji',
    credits: 10,
    price: 100,
    tags: ['34g Protein', '3 Rotis Included', 'Non-Veg Special']
  },
  {
    id: 'dish_rajma',
    name: 'Rajma',
    description: 'Kashmiri red kidney beans slow cooked with ginger, bay leaves, and desi ghee tadka.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    imageNumber: 20,
    dietary: 'veg',
    calories: 280,
    protein: 14,
    carbs: 46,
    fats: 6,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Comfort Food']
  },
  {
    id: 'dish_dahi_bhindi',
    name: 'Dahi Bhindi',
    description: 'Crispy pan-fried ladyfingers tossed in a tangy spiced roasted cumin yogurt gravy.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80',
    imageNumber: 22,
    dietary: 'veg',
    calories: 210,
    protein: 6,
    carbs: 22,
    fats: 9,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Tangy & Light']
  },
  {
    id: 'dish_egg_curry',
    name: 'Egg Curry',
    description: '2 Farm-fresh boiled eggs pan-seared and simmered in a spiced onion-tomato curry.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    imageNumber: 23,
    dietary: 'egg',
    calories: 310,
    protein: 16,
    carbs: 14,
    fats: 15,
    category: 'sabji',
    credits: 10,
    price: 95,
    tags: ['3 Rotis Included', 'Double Egg']
  },
  {
    id: 'dish_sev_tamatar',
    name: 'Sev Tamatar',
    description: 'Crisp ratlami sev simmered in sweet-tangy spiced tomato broth with cumin.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    imageNumber: 25,
    dietary: 'veg',
    calories: 290,
    protein: 9,
    carbs: 30,
    fats: 14,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Spicy & Tangy']
  },
  {
    id: 'dish_besan_gatte',
    name: 'Besan Gatte Masala',
    description: 'Steamed spiced gram flour dumplings cooked in a fragrant spiced curd curry.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80',
    imageNumber: 26,
    dietary: 'veg',
    calories: 310,
    protein: 14,
    carbs: 32,
    fats: 12,
    category: 'sabji',
    credits: 10,
    price: 90,
    tags: ['3 Rotis Included', 'Rajasthani Special']
  },
  {
    id: 'dish_chicken_kolhapuri',
    name: 'Chicken Kolhapuri',
    description: 'Tender chicken cuts slow-simmered in a fiery roasted coconut and red chilli gravy.',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
    imageNumber: 27,
    dietary: 'non-veg',
    calories: 410,
    protein: 36,
    carbs: 10,
    fats: 22,
    category: 'sabji',
    credits: 10,
    price: 100,
    tags: ['3 Rotis Included', '36g Protein', 'Fiery Spices']
  },
  {
    id: 'dish_misal_pav',
    name: 'Misal Pav',
    description: 'Sprouted moth bean curry with spicy kat gravy, farsan crunch, and bakery pavs.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80',
    imageNumber: 28,
    dietary: 'veg',
    calories: 480,
    protein: 16,
    carbs: 68,
    fats: 14,
    category: 'special',
    credits: 10,
    price: 95,
    tags: ['Spicy Feast', 'Maharashtra Icon']
  },
  {
    id: 'dish_daal_bati',
    name: 'Daal Bati',
    description: 'Oven-baked wheat baatis with desi ghee, panchmel spiced dal and sweet churma.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
    imageNumber: 28,
    dietary: 'veg',
    calories: 580,
    protein: 18,
    carbs: 76,
    fats: 22,
    category: 'special',
    credits: 10,
    price: 100,
    tags: ['Pure Desi Ghee', 'Royal Heritage']
  },
  {
    id: 'dish_mutton_masala',
    name: 'Mutton Masala',
    description: 'Tender goat meat slow cooked for 3 hours in whole coriander and brown onion gravy.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80',
    imageNumber: 28,
    dietary: 'non-veg',
    calories: 520,
    protein: 38,
    carbs: 12,
    fats: 32,
    category: 'special',
    credits: 10,
    price: 120,
    tags: ['38g Protein', 'Sunday Chef Special']
  },
  {
    id: 'dish_veg_biryani',
    name: 'Veg Biryani',
    description: 'Basmati rice layered with vegetables, saffron milk, caramelized mint & fried onions.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    imageNumber: 29,
    dietary: 'veg',
    calories: 490,
    protein: 14,
    carbs: 72,
    fats: 15,
    category: 'special',
    credits: 10,
    price: 100,
    tags: ['Dum Cooked', 'Saffron Infused']
  },
  {
    id: 'dish_chicken_biryani',
    name: 'Chicken Biryani',
    description: 'Basmati rice cooked on charcoal dum with tender marinated chicken pieces and mint raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    imageNumber: 29,
    dietary: 'non-veg',
    calories: 560,
    protein: 36,
    carbs: 65,
    fats: 18,
    category: 'special',
    credits: 10,
    price: 110,
    tags: ['36g Protein', 'Dum Pukht']
  }
];

// Starter curated custom dishes pre-loaded in "My Menu"
export const STARTER_CUSTOM_DISHES: CustomSavedDish[] = [
  {
    id: 'custom-preset-1',
    name: 'High-Protein Muscle Thali (44g Protein)',
    category: 'custom_thali',
    dish: ALL_MENU_DISHES.find(d => d.name === 'Soyabean Masala') || ALL_MENU_DISHES[12],
    roti: ROTI_OPTIONS.multigrain,
    rotiCount: 3,
    includeDalChawal: true,
    spiceLevel: 'medium',
    oilPreference: 'desi_ghee',
    addOns: ['Dal Tadka & Basmati Rice', 'Boondi Raita'],
    totalCalories: 590,
    totalProtein: 44,
    totalCarbs: 64,
    totalFats: 14,
    credits: 10,
    priceINR: 120,
    notes: 'Extra roasted cumin, zero refined oil, crisp multigrain rotis',
    createdAt: 'Default Signature',
    tags: ['High Protein', '44g Protein', 'Fitness Favorite']
  },
  {
    id: 'custom-preset-2',
    name: 'Maharashtrian Bajra & Palak Paneer Bowl',
    category: 'custom_thali',
    dish: ALL_MENU_DISHES.find(d => d.name === 'Palak Paneer') || ALL_MENU_DISHES[17],
    roti: ROTI_OPTIONS.bajra,
    rotiCount: 3,
    includeDalChawal: true,
    spiceLevel: 'spicy',
    oilPreference: 'cold_pressed',
    addOns: ['Dal Tadka & Basmati Rice', 'Roasted Masala Papad'],
    totalCalories: 585,
    totalProtein: 28,
    totalCarbs: 66,
    totalFats: 20,
    credits: 10,
    priceINR: 120,
    notes: 'Hot toasted bajra bhakris with dollop of white butter',
    createdAt: 'Default Signature',
    tags: ['Gluten Free Bhakri', 'Iron Rich', 'Homestyle']
  },
  {
    id: 'custom-preset-3',
    name: 'Kashmiri Rajma & Jeera Rice Comfort Plate',
    category: 'custom_thali',
    dish: ALL_MENU_DISHES.find(d => d.name === 'Rajma') || ALL_MENU_DISHES[19],
    roti: ROTI_OPTIONS.wheat,
    rotiCount: 2,
    includeDalChawal: true,
    spiceLevel: 'mild',
    oilPreference: 'desi_ghee',
    addOns: ['Dal Tadka & Basmati Rice'],
    totalCalories: 510,
    totalProtein: 22,
    totalCarbs: 78,
    totalFats: 10,
    credits: 10,
    priceINR: 120,
    notes: 'Mildly spiced, extra ginger tadka on rajma',
    createdAt: 'Default Signature',
    tags: ['Comfort Classics', 'Low Fat']
  }
];
