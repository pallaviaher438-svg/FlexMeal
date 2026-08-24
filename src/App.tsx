import React, { useState, useMemo, useEffect } from 'react';
import flexmealLogo from './assets/images/flexmeal_logo_1787381955038.jpg';
import { 
  DayOfWeek, 
  MealTime, 
  Dish, 
  RotiOption, 
  UserSelection, 
  OrderItem, 
  SubscriptionPlan,
  UserProfile,
  UserRole,
  CustomSavedDish
} from './types';
import { 
  WEEKLY_SCHEDULE, 
  ROTI_OPTIONS, 
  DAL_CHAWAL_STANDARD, 
  FASTING_MEALS, 
  SUBSCRIPTION_PLANS,
  STARTER_CUSTOM_DISHES
} from './data/mealData';
import { Header } from './components/Header';
import { LoginPage, PRESET_USERS } from './components/LoginPage';
import { AdminDashboardView } from './components/AdminDashboardView';
import { MyCustomMenuView } from './components/MyCustomMenuView';
import { FlexCreditsHero } from './components/FlexCreditsHero';
import { DayMealSelector } from './components/DayMealSelector';
import { MealCard } from './components/MealCard';
import { RotiAndSidesCustomizer } from './components/RotiAndSidesCustomizer';
import { NutritionSummary } from './components/NutritionSummary';
import { WeeklyTimetableModal } from './components/WeeklyTimetableModal';
import { SubscriptionPlansView } from './components/SubscriptionPlansView';
import { CheckoutDrawer } from './components/CheckoutDrawer';
import { OrderHistoryView } from './components/OrderHistoryView';
import { WalletView } from './components/WalletView';
import { AddCreditsModal } from './components/AddCreditsModal';
import { PaymentModal } from './components/PaymentModal';
import { 
  Sparkles, 
  Calendar, 
  Utensils, 
  HeartHandshake, 
  Leaf, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  Info,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

export default function App() {
  // Authentication State (Starts at LoginPage)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Navigation tabs: 'menu' | 'timetable' | 'my_menu' | 'plans' | 'orders' | 'wallet' | 'admin'
  const [activeTab, setActiveTab] = useState<'menu' | 'timetable' | 'my_menu' | 'plans' | 'orders' | 'wallet' | 'admin'>('menu');

  // Subscriber View Toggle State (True: 10 Credits / 900 Points, False: ₹ Cash Rates)
  const [isSubscriberView, setIsSubscriberView] = useState<boolean>(true);

  // Saved Custom Dishes State (Persisted in localStorage)
  const [savedCustomDishes, setSavedCustomDishes] = useState<CustomSavedDish[]>(() => {
    try {
      const stored = localStorage.getItem('flexmeal_saved_custom_dishes');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {}
    return STARTER_CUSTOM_DISHES;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('flexmeal_saved_custom_dishes', JSON.stringify(savedCustomDishes));
    } catch (e) {}
  }, [savedCustomDishes]);

  // User State
  const [userCredits, setUserCredits] = useState<number>(900);
  const [isFastingMode, setIsFastingMode] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ORD-841920',
      day: 'Monday',
      mealTime: 'lunch',
      dishName: 'Paneer Kundan (#6)',
      rotiName: 'Homestyle Wheat Roti (3 Rotis)',
      rotiCount: 3,
      dalChawal: true,
      creditsDeducted: 10,
      priceINR: 120,
      status: 'Scheduled',
      date: 'Today'
    }
  ]);

  // Payment Gateway Modal State
  const [paymentModalData, setPaymentModalData] = useState<{
    isOpen: boolean;
    amount: number;
    title: string;
    description: string;
    creditsPurchased: number;
  }>({
    isOpen: false,
    amount: 5799,
    title: 'The 30-Day Flex Subscription Pass',
    description: '900 Flex Credits (30 pts/day, 10 pts/meal) with 14-day rollover grace.',
    creditsPurchased: 900
  });

  // Handle Login
  const handleLogin = (user: UserProfile, chosenPlan?: 'subscription' | 'walkin') => {
    setCurrentUser(user);
    setUserCredits(user.credits);
    setIsSubscriberView(chosenPlan ? chosenPlan === 'subscription' : user.role === 'subscriber');

    if (user.role === 'admin') {
      setActiveTab('admin');
    } else {
      setActiveTab('menu');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('menu');
  };

  // Active Menu Selection State
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime>('lunch');

  // Modals state
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Retrieve current day schedule from WEEKLY_SCHEDULE
  const currentDayPlan = useMemo(() => {
    return WEEKLY_SCHEDULE.find((d) => d.day === selectedDay) || WEEKLY_SCHEDULE[0];
  }, [selectedDay]);

  // Retrieve available dishes for the selected day and meal time
  const currentDishes: Dish[] = useMemo(() => {
    if (isFastingMode) {
      return FASTING_MEALS;
    }
    if (selectedMealTime === 'breakfast') {
      return currentDayPlan.breakfast.dishes;
    } else if (selectedMealTime === 'lunch') {
      return currentDayPlan.lunch.sabjis;
    } else {
      return currentDayPlan.dinner.sabjis;
    }
  }, [currentDayPlan, selectedMealTime, isFastingMode]);

  // Available rotis for lunch/dinner
  const availableRotis: RotiOption[] = useMemo(() => {
    if (selectedMealTime === 'breakfast') return [];
    if (selectedMealTime === 'lunch') return currentDayPlan.lunch.rotis;
    return currentDayPlan.dinner.rotis;
  }, [currentDayPlan, selectedMealTime]);

  // User Customizer Selections
  const [selectedDishId, setSelectedDishId] = useState<string>('');
  const [selectedRotiId, setSelectedRotiId] = useState<string>('');
  const [rotiCount, setRotiCount] = useState<number>(3);
  const [includeDalChawal, setIncludeDalChawal] = useState<boolean>(true);
  const [includeDessert, setIncludeDessert] = useState<boolean>(false);

  // Custom Selection Override for Checkout Drawer when ordering from "My Menu"
  const [customCheckoutSelection, setCustomCheckoutSelection] = useState<UserSelection | null>(null);

  // Synchronize selection when day or mealTime changes
  const activeDish: Dish = useMemo(() => {
    const found = currentDishes.find((d) => d.id === selectedDishId);
    return found || currentDishes[0];
  }, [currentDishes, selectedDishId]);

  const activeRoti: RotiOption = useMemo(() => {
    if (availableRotis.length === 0) return ROTI_OPTIONS.wheat;
    const found = availableRotis.find((r) => r.id === selectedRotiId);
    return found || availableRotis[0];
  }, [availableRotis, selectedRotiId]);

  // Custom Dish Handlers
  const handleSaveCustomDish = (newDish: CustomSavedDish) => {
    setSavedCustomDishes((prev) => {
      const existingIdx = prev.findIndex((d) => d.id === newDish.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = newDish;
        return updated;
      }
      return [newDish, ...prev];
    });
  };

  const handleDeleteCustomDish = (dishId: string) => {
    setSavedCustomDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const handleOrderCustomDish = (customDish: CustomSavedDish) => {
    const selectionData: UserSelection = {
      day: selectedDay,
      mealTime: customDish.category === 'breakfast_combo' ? 'breakfast' : selectedMealTime === 'breakfast' ? 'lunch' : selectedMealTime,
      selectedDish: {
        ...customDish.dish,
        name: customDish.name,
        price: customDish.priceINR
      },
      selectedRoti: customDish.roti,
      rotiCount: customDish.rotiCount || 3,
      includeDalChawal: customDish.includeDalChawal,
      isFastingMode: false,
      extraAddons: {},
      deliverySlot: 'Standard Express Slot',
      specialInstructions: customDish.notes || ''
    };

    setCustomCheckoutSelection(selectionData);
    setIsCheckoutOpen(true);
  };

  // Save current Today's Menu customization to My Menu
  const handleSaveCurrentMenuCustomization = () => {
    const newDish: CustomSavedDish = {
      id: `custom-${Date.now()}`,
      name: `${activeDish.name} (${selectedDay} ${selectedMealTime.toUpperCase()})`,
      category: selectedMealTime === 'breakfast' ? 'breakfast_combo' : 'custom_thali',
      dish: activeDish,
      roti: selectedMealTime !== 'breakfast' ? activeRoti : undefined,
      rotiCount: rotiCount,
      includeDalChawal: selectedMealTime !== 'breakfast' && includeDalChawal,
      spiceLevel: 'medium',
      oilPreference: 'desi_ghee',
      addOns: includeDalChawal ? ['Dal Tadka & Basmati Rice'] : [],
      totalCalories: activeDish.calories + (selectedMealTime !== 'breakfast' ? activeRoti.caloriesPerRoti * rotiCount : 0) + (includeDalChawal ? DAL_CHAWAL_STANDARD.calories : 0),
      totalProtein: activeDish.protein + (selectedMealTime !== 'breakfast' ? activeRoti.proteinPerRoti * rotiCount : 0) + (includeDalChawal ? DAL_CHAWAL_STANDARD.protein : 0),
      totalCarbs: activeDish.carbs + (selectedMealTime !== 'breakfast' ? 16 * rotiCount : 0) + (includeDalChawal ? DAL_CHAWAL_STANDARD.carbs : 0),
      totalFats: activeDish.fats + (selectedMealTime !== 'breakfast' ? 1 * rotiCount : 0) + (includeDalChawal ? DAL_CHAWAL_STANDARD.fats : 0),
      credits: 10,
      priceINR: activeDish.price + (includeDalChawal ? 30 : 0),
      notes: 'Saved from Today’s Menu customizer',
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tags: [selectedDay, `${rotiCount}x ${activeRoti?.name || 'Roti'}`]
    };

    handleSaveCustomDish(newDish);
  };

  // Handle slot selection from timetable
  const handleSelectSlotFromTimetable = (day: DayOfWeek, mealTime: MealTime) => {
    setSelectedDay(day);
    setSelectedMealTime(mealTime);
    setActiveTab('menu');
  };

  // Handle plan selection from Subscription page
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    if (plan.credits > 0) {
      setPaymentModalData({
        isOpen: true,
        amount: plan.price,
        title: plan.name,
        description: `900 Flex Credits (10 pts/meal) with 14-day rollover grace.`,
        creditsPurchased: plan.credits
      });
    } else {
      setIsSubscriberView(false);
      alert(`You've switched to "${plan.name}". You can now order meals with direct ₹ Pay-As-You-Go rates.`);
      setActiveTab('menu');
    }
  };

  // Handle order success
  const handleOrderSuccess = (newOrder: OrderItem, updatedCredits: number) => {
    setOrders((prev) => [newOrder, ...prev]);
    setUserCredits(updatedCredits);
    setCustomCheckoutSelection(null);
  };

  // Handle cancel order
  const handleCancelOrder = (id: string) => {
    const found = orders.find((o) => o.id === id);
    if (found && found.creditsDeducted > 0) {
      setUserCredits((prev) => prev + found.creditsDeducted);
    }
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Handle adding credits
  const handleAddCreditsSuccess = (amount: number) => {
    setUserCredits((prev) => prev + amount);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders((prev) => 
      prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  const currentSelectionData: UserSelection = customCheckoutSelection || {
    day: selectedDay,
    mealTime: selectedMealTime,
    selectedDish: activeDish,
    selectedRoti: activeRoti,
    rotiCount: rotiCount,
    includeDalChawal: includeDalChawal,
    isFastingMode: isFastingMode,
    extraAddons: {},
    deliverySlot: 'Standard Slot',
    specialInstructions: ''
  };

  // If user is not logged in, show the Login Page directly at starting
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col selection:bg-[#ffdad8] selection:text-[#410007]">
      
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        credits={userCredits}
        isFastingMode={isFastingMode}
        setIsFastingMode={setIsFastingMode}
        savedCustomDishesCount={savedCustomDishes.length}
        onAddCredits={() => {
          setPaymentModalData({
            isOpen: true,
            amount: 5799,
            title: '900 Flex Credits 30-Day Pass',
            description: '10 credits/meal, 30 credits/day, 14-day rollover window.',
            creditsPurchased: 900
          });
        }}
        onLogout={handleLogout}
        onSwitchRole={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* VIEW 0: ADMIN KITCHEN OPERATIONS & DISPATCH */}
        {activeTab === 'admin' && (
          <AdminDashboardView
            currentUser={currentUser}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSwitchToCustomerView={() => setActiveTab('menu')}
            onLogout={handleLogout}
          />
        )}

        {/* VIEW: MY CUSTOM MENU & DISH BUILDER STUDIO */}
        {activeTab === 'my_menu' && (
          <MyCustomMenuView
            currentUser={currentUser}
            userCredits={userCredits}
            savedDishes={savedCustomDishes}
            onSaveDish={handleSaveCustomDish}
            onDeleteDish={handleDeleteCustomDish}
            onOrderCustomDish={handleOrderCustomDish}
            isSubscriberView={isSubscriberView}
          />
        )}

        {/* VIEW 1: TODAY'S ROTATIONAL MENU & CUSTOMIZER */}
        {activeTab === 'menu' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Flex Subscriber Credits Hero Badge */}
            <FlexCreditsHero
              credits={userCredits}
              isSubscriberView={isSubscriberView}
              onToggleViewMode={(isSub) => setIsSubscriberView(isSub)}
              onAddCredits={() => {
                setPaymentModalData({
                  isOpen: true,
                  amount: 5799,
                  title: 'The 30-Day Flex Subscription Pass',
                  description: '900 Flex Credits (30 pts/day, 10 pts/meal) with 14-day rollover grace.',
                  creditsPurchased: 900
                });
              }}
              onViewPlans={() => setActiveTab('plans')}
              onOpenTimetable={() => setIsTimetableOpen(true)}
              currentUser={currentUser}
            />

            {/* Quick Banner to Launch My Menu Studio */}
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 border border-orange-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e25c1d] text-white flex items-center justify-center font-bold shrink-0">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-gray-900">
                    Want to customize your own dish from scratch?
                  </h4>
                  <p className="text-xs text-gray-600">
                    Mix & match any sabji, stoneground rotis, spice level, and cooking oil in <strong className="text-[#e25c1d]">My Menu Studio</strong>.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('my_menu')}
                className="bg-[#e25c1d] hover:bg-[#c94d14] text-white px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-colors shadow-xs"
              >
                Open My Menu Studio →
              </button>
            </div>

            {/* Day and Meal Period Selector */}
            <DayMealSelector
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
              selectedMealTime={selectedMealTime}
              onSelectMealTime={setSelectedMealTime}
              isFastingMode={isFastingMode}
            />

            {/* Main Menu Grid & Customizer Panel Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left 7 Columns: Dish Options Grid */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
                      {isFastingMode
                        ? 'Vrat & Fasting Specials'
                        : selectedMealTime === 'breakfast'
                        ? 'Breakfast Selections'
                        : `${selectedDay}'s ${selectedMealTime === 'lunch' ? 'Lunch' : 'Dinner'} Sabji & Gravy Options`}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Select your primary dish. Freshly prepared in home kitchens.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsTimetableOpen(true)}
                    className="text-xs font-bold text-[#b7102a] hover:underline flex items-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>View All 7 Days</span>
                  </button>
                </div>

                {/* Dish Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentDishes.map((dish) => (
                    <MealCard
                      key={dish.id}
                      dish={dish}
                      isSelected={activeDish.id === dish.id}
                      onSelect={(d) => setSelectedDishId(d.id)}
                      isSubscriberView={isSubscriberView}
                    />
                  ))}
                </div>

                {/* Information Banner on Kitchen Standards */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex items-start gap-3 text-xs text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-900 block mb-0.5">
                      FlexMeal Kitchen Quality Guarantee
                    </span>
                    <span>
                      100% Homestyle spices, unadulterated cold-pressed oils, pure butter, and premium grade basmati rice. Zero artificial preservatives or food colorings.
                    </span>
                  </div>
                </div>

              </div>

              {/* Right 5 Columns: Roti / Sides Customizer & Realtime Nutrition Tracker */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                
                {/* Roti & Sides Selector (For Lunch & Dinner) */}
                {selectedMealTime !== 'breakfast' && !isFastingMode && (
                  <RotiAndSidesCustomizer
                    availableRotis={availableRotis}
                    selectedRoti={activeRoti}
                    onSelectRoti={(r) => setSelectedRotiId(r.id)}
                    rotiCount={rotiCount}
                    onUpdateRotiCount={setRotiCount}
                    includeDalChawal={includeDalChawal}
                    onToggleDalChawal={() => setIncludeDalChawal(!includeDalChawal)}
                    dalChawalDish={DAL_CHAWAL_STANDARD}
                    dessertDish={currentDayPlan.dinner?.dessert}
                    includeDessert={includeDessert}
                    onToggleDessert={() => setIncludeDessert(!includeDessert)}
                    isSubscriberView={isSubscriberView}
                  />
                )}

                {/* Live Nutritional Summary & Confirmation Button */}
                <NutritionSummary
                  selectedDish={activeDish}
                  selectedRoti={selectedMealTime !== 'breakfast' ? activeRoti : undefined}
                  rotiCount={rotiCount}
                  includeDalChawal={selectedMealTime !== 'breakfast' && includeDalChawal}
                  dalChawalDish={DAL_CHAWAL_STANDARD}
                  includeDessert={includeDessert}
                  dessertDish={currentDayPlan.dinner?.dessert}
                  mealTime={selectedMealTime}
                  userCredits={userCredits}
                  isSubscriberView={isSubscriberView}
                  onConfirm={() => {
                    setCustomCheckoutSelection(null);
                    setIsCheckoutOpen(true);
                  }}
                  onSaveToMyMenu={handleSaveCurrentMenuCustomization}
                />

              </div>

            </div>

          </div>
        )}

        {/* VIEW 2: WEEKLY TIMETABLE TABLE VIEW */}
        {activeTab === 'timetable' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
                    Interactive 7-Day Meal Timetable
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Direct mapping of the weekly rotation with breakfast, lunch rotis, sabjis, and dinner specials.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    onClick={() => setActiveTab('my_menu')}
                    className="bg-orange-50 text-[#e25c1d] border border-orange-200 px-4 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition-colors"
                  >
                    Build Custom Thali
                  </button>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="bg-[#b7102a] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs hover:bg-[#960d22] transition-colors"
                  >
                    Back to Today's Menu
                  </button>
                </div>
              </div>

              {/* 7-Day Table Grid */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {WEEKLY_SCHEDULE.map((dayPlan) => {
                  const isSunday = dayPlan.day === 'Sunday';

                  return (
                    <div
                      key={dayPlan.day}
                      className={`rounded-2xl border p-4 flex flex-col justify-between space-y-4 ${
                        isSunday ? 'bg-rose-50/40 border-rose-200' : 'bg-gray-50/60 border-gray-200'
                      }`}
                    >
                      <div className="border-b border-gray-200/80 pb-2 flex items-center justify-between">
                        <span className="font-display font-extrabold text-base text-gray-900">
                          {dayPlan.day}
                        </span>
                        {isSunday && (
                          <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">
                            Feast
                          </span>
                        )}
                      </div>

                      {/* Breakfast */}
                      <div 
                        onClick={() => handleSelectSlotFromTimetable(dayPlan.day, 'breakfast')}
                        className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#b7102a] cursor-pointer transition-all space-y-1 group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                          Breakfast
                        </span>
                        {dayPlan.breakfast.dishes.map((dish) => (
                          <p key={dish.id} className="text-xs text-gray-800 font-medium leading-tight">
                            • {dish.name} {dish.imageNumber && <span className="text-gray-400 font-bold">(#{dish.imageNumber})</span>}
                          </p>
                        ))}
                      </div>

                      {/* Lunch */}
                      <div 
                        onClick={() => handleSelectSlotFromTimetable(dayPlan.day, 'lunch')}
                        className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#b7102a] cursor-pointer transition-all space-y-1.5 group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block">
                          Lunch
                        </span>
                        <p className="text-[11px] text-gray-500 font-semibold">
                          Rotis: {dayPlan.lunch.rotis.map(r => r.name.split(' ')[0]).join(' / ')}
                        </p>
                        {dayPlan.lunch.sabjis.map((dish) => (
                          <p key={dish.id} className="text-xs text-gray-800 font-medium leading-tight">
                            • {dish.name} {dish.imageNumber && <span className="text-gray-400 font-bold">(#{dish.imageNumber})</span>}
                          </p>
                        ))}
                        <p className="text-[10px] text-emerald-700 font-bold pt-0.5">
                          + Dal Chawal (#8)
                        </p>
                      </div>

                      {/* Dinner */}
                      <div 
                        onClick={() => handleSelectSlotFromTimetable(dayPlan.day, 'dinner')}
                        className="bg-white p-3 rounded-xl border border-gray-200 hover:border-[#b7102a] cursor-pointer transition-all space-y-1.5 group"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                          Dinner
                        </span>
                        <p className="text-[11px] text-gray-500 font-semibold">
                          Rotis: {dayPlan.dinner.rotis.map(r => r.name.split(' ')[0]).join(' / ')}
                        </p>
                        {dayPlan.dinner.sabjis.map((dish) => (
                          <p key={dish.id} className="text-xs text-gray-800 font-medium leading-tight">
                            • {dish.name} {dish.imageNumber && <span className="text-gray-400 font-bold">(#{dish.imageNumber})</span>}
                          </p>
                        ))}
                        {dayPlan.dinner.dessert ? (
                          <p className="text-[10px] text-rose-700 font-bold pt-0.5">
                            ★ Gulab Jamun
                          </p>
                        ) : (
                          <p className="text-[10px] text-emerald-700 font-bold pt-0.5">
                            + Dal Chawal (#8)
                          </p>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: MEAL PLANS & STRATEGY */}
        {activeTab === 'plans' && (
          <SubscriptionPlansView
            onSelectPlan={handleSelectPlan}
            onBackToMenu={() => setActiveTab('menu')}
          />
        )}

        {/* VIEW 4: MY SCHEDULED ORDERS */}
        {activeTab === 'orders' && (
          <OrderHistoryView
            orders={orders}
            onBackToMenu={() => setActiveTab('menu')}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {/* VIEW 5: WALLET & CREDITS LEDGER */}
        {activeTab === 'wallet' && (
          <WalletView
            credits={userCredits}
            onAddCredits={() => {
              setPaymentModalData({
                isOpen: true,
                amount: 5799,
                title: '900 Flex Credits 30-Day Pass',
                description: '10 credits/meal, 30 credits/day, 14-day rollover window.',
                creditsPurchased: 900
              });
            }}
            onViewPlans={() => setActiveTab('plans')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 bg-white flex items-center justify-center p-0.5 shrink-0">
              <img 
                src={flexmealLogo} 
                alt="FlexMeal"
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div>
              <span className="font-display font-bold text-gray-900 text-sm">FlexMeal</span>
              <span className="mx-2">•</span>
              <span>Your life is flexible, your meals should be too.</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>Flexible • Customisable • Healthy • Affordable</span>
            <span>•</span>
            <span>14-Day Grace Rollover Active</span>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-overs */}
      <WeeklyTimetableModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        onSelectSlot={handleSelectSlotFromTimetable}
      />

      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setCustomCheckoutSelection(null);
        }}
        selection={currentSelectionData}
        userCredits={userCredits}
        isSubscriberView={isSubscriberView}
        onOrderSuccess={handleOrderSuccess}
      />

      <AddCreditsModal
        isOpen={isAddCreditsOpen}
        onClose={() => setIsAddCreditsOpen(false)}
        onAddCreditsSuccess={handleAddCreditsSuccess}
      />

      {/* Dedicated Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalData.isOpen}
        onClose={() => setPaymentModalData((prev) => ({ ...prev, isOpen: false }))}
        amount={paymentModalData.amount}
        itemTitle={paymentModalData.title}
        itemDescription={paymentModalData.description}
        creditsPurchased={paymentModalData.creditsPurchased}
        onPaymentSuccess={(addedCredits) => {
          if (addedCredits > 0) {
            setUserCredits((prev) => prev + addedCredits);
            setIsSubscriberView(true);
          }
        }}
      />

    </div>
  );
}

