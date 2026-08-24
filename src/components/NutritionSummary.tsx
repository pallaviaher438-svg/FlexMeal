import React, { useState } from 'react';
import { Dish, RotiOption, MealTime } from '../types';
import { ArrowRight, Flame, ShieldCheck, Zap, HeartPulse, Sparkles, CreditCard, Bookmark, Check } from 'lucide-react';

interface NutritionSummaryProps {
  selectedDish: Dish;
  selectedRoti?: RotiOption;
  rotiCount: number;
  includeDalChawal: boolean;
  dalChawalDish: Dish;
  includeDessert?: boolean;
  dessertDish?: Dish;
  mealTime: MealTime;
  userCredits: number;
  onConfirm: () => void;
  onSaveToMyMenu?: () => void;
  isSubscriberView?: boolean;
}

export const NutritionSummary: React.FC<NutritionSummaryProps> = ({
  selectedDish,
  selectedRoti,
  rotiCount,
  includeDalChawal,
  dalChawalDish,
  includeDessert,
  dessertDish,
  mealTime,
  userCredits,
  onConfirm,
  onSaveToMyMenu,
  isSubscriberView = true
}) => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Compute totals
  const isBreakfast = mealTime === 'breakfast';

  let totalCalories = selectedDish.calories;
  let totalProtein = selectedDish.protein;
  let totalCarbs = selectedDish.carbs;
  let totalFats = selectedDish.fats;
  let totalCredits = 10; // 1 meal = 10 credits strictly
  let totalPrice = selectedDish.price;

  if (!isBreakfast && selectedRoti) {
    totalCalories += selectedRoti.caloriesPerRoti * rotiCount;
    totalProtein += selectedRoti.proteinPerRoti * rotiCount;
    totalCarbs += 15 * rotiCount;
    totalFats += 1 * rotiCount;
    // 3 rotis are included at 0 extra credits
  }

  if (!isBreakfast && includeDalChawal) {
    totalCalories += dalChawalDish.calories;
    totalProtein += dalChawalDish.protein;
    totalCarbs += dalChawalDish.carbs;
    totalFats += dalChawalDish.fats;
    totalPrice += dalChawalDish.price;
  }

  if (includeDessert && dessertDish) {
    totalCalories += dessertDish.calories;
    totalProtein += dessertDish.protein;
    totalCarbs += dessertDish.carbs;
    totalFats += dessertDish.fats;
    totalPrice += dessertDish.price;
  }

  const hasEnoughCredits = userCredits >= totalCredits;

  const handleSave = () => {
    if (onSaveToMyMenu) {
      onSaveToMyMenu();
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-4">
      
      {/* 1. Nutritional Estimate Glass Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-[#b7102a]" />
            <h3 className="font-display font-black text-sm sm:text-base text-gray-900">
              Live Macro Nutrition Tracker
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Realtime Calc
          </span>
        </div>

        {/* 4 Macro Rings / Stats */}
        <div className="grid grid-cols-4 gap-2">
          
          <div className="flex flex-col items-center bg-red-50/60 p-2.5 rounded-2xl border border-red-100">
            <div className="w-11 h-11 rounded-full border-2 border-[#b7102a] flex items-center justify-center mb-1">
              <span className="font-display font-black text-xs text-[#b7102a]">
                {Math.round(totalCalories)}
              </span>
            </div>
            <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
              KCAL
            </span>
          </div>

          <div className="flex flex-col items-center bg-emerald-50/60 p-2.5 rounded-2xl border border-emerald-100">
            <div className="w-11 h-11 rounded-full border-2 border-emerald-600 flex items-center justify-center mb-1">
              <span className="font-display font-black text-xs text-emerald-700">
                {Math.round(totalProtein)}g
              </span>
            </div>
            <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
              PROTEIN
            </span>
          </div>

          <div className="flex flex-col items-center bg-amber-50/60 p-2.5 rounded-2xl border border-amber-100">
            <div className="w-11 h-11 rounded-full border-2 border-amber-500 flex items-center justify-center mb-1">
              <span className="font-display font-black text-xs text-amber-700">
                {Math.round(totalCarbs)}g
              </span>
            </div>
            <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
              CARBS
            </span>
          </div>

          <div className="flex flex-col items-center bg-purple-50/60 p-2.5 rounded-2xl border border-purple-100">
            <div className="w-11 h-11 rounded-full border-2 border-purple-500 flex items-center justify-center mb-1">
              <span className="font-display font-black text-xs text-purple-700">
                {Math.round(totalFats)}g
              </span>
            </div>
            <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
              FATS
            </span>
          </div>

        </div>

        {/* Selected Composition Checklist */}
        <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Main Sabji / Dish:</span>
            <span className="font-bold text-gray-900 truncate max-w-[180px]">{selectedDish.name}</span>
          </div>
          {!isBreakfast && selectedRoti && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Fresh Rotis ({rotiCount}):</span>
              <span className="font-bold text-amber-800">{selectedRoti.name} (Included)</span>
            </div>
          )}
          {includeDalChawal && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Daily Dal Chawal:</span>
              <span className="font-bold text-emerald-800">Included Add-on</span>
            </div>
          )}
          {includeDessert && dessertDish && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Sunday Sweet:</span>
              <span className="font-bold text-rose-800">{dessertDish.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Action & Deduction Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
        
        <div className="space-y-2">
          {isSubscriberView ? (
            <>
              <div className="flex justify-between items-baseline text-xs text-gray-600">
                <span>Standard Meal Spend</span>
                <span className="font-bold text-gray-900">10 Credits</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-gray-600">
                <span>3 Fresh Rotis + Sabji</span>
                <span className="text-emerald-700 font-bold">Included (0 extra pts)</span>
              </div>
              <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
                    Subscription Deduction
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Remaining after order: {Math.max(0, userCredits - 10)} pts
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-black text-amber-600">
                    10 Credits
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-baseline text-xs text-gray-600">
                <span>Meal Unbundled Base</span>
                <span className="font-bold text-gray-900">₹{selectedDish.price}</span>
              </div>
              {includeDalChawal && (
                <div className="flex justify-between items-baseline text-xs text-gray-600">
                  <span>Dal Chawal Combo</span>
                  <span className="font-bold text-gray-900">+₹30</span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
                    Total Walk-In Rate
                  </span>
                  <span className="text-[11px] text-emerald-700 font-bold">
                    Direct Payment Gateway
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-black text-[#b7102a]">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={onConfirm}
            className="w-full bg-[#b7102a] hover:bg-[#960d22] text-white py-3.5 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Confirm & Schedule Meal</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          {onSaveToMyMenu && (
            <button
              onClick={handleSave}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                savedSuccess
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Saved to My Menu!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-[#e25c1d]" />
                  <span>Save this customization to My Menu</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 font-medium">
          {isSubscriberView ? (
            hasEnoughCredits ? (
              <span className="text-emerald-700 font-semibold">
                ✓ 10 Credits will be deducted from your 900 Points wallet ({userCredits} available)
              </span>
            ) : (
              <span className="text-amber-700 font-semibold">
                Low credit balance ({userCredits} pts). Top-up or switch to Walk-in mode.
              </span>
            )
          ) : (
            <span className="text-gray-600">
              Pay via UPI, Cards, Netbanking or Cash on Delivery at checkout.
            </span>
          )}
        </p>

      </div>

    </div>
  );
};

