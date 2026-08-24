import React from 'react';
import { RotiOption, Dish } from '../types';
import { Check, Plus, Minus, Wheat, CheckSquare, Square, Sparkles, ChefHat } from 'lucide-react';

interface RotiAndSidesCustomizerProps {
  availableRotis: RotiOption[];
  selectedRoti: RotiOption;
  onSelectRoti: (roti: RotiOption) => void;
  rotiCount: number;
  onUpdateRotiCount: (count: number) => void;
  includeDalChawal: boolean;
  onToggleDalChawal: () => void;
  dalChawalDish: Dish;
  dessertDish?: Dish;
  includeDessert?: boolean;
  onToggleDessert?: () => void;
  isSubscriberView?: boolean;
}

export const RotiAndSidesCustomizer: React.FC<RotiAndSidesCustomizerProps> = ({
  availableRotis,
  selectedRoti,
  onSelectRoti,
  rotiCount,
  onUpdateRotiCount,
  includeDalChawal,
  onToggleDalChawal,
  dalChawalDish,
  dessertDish,
  includeDessert,
  onToggleDessert,
  isSubscriberView = true
}) => {
  return (
    <div className="space-y-5">
      
      {/* 1. Roti Selection Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-amber-700" />
              <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                Choose Your Fresh Rotis
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              <strong className="text-amber-800">3 Rotis included at 0 extra credits</strong> • 100% stoneground whole flours
            </p>
          </div>

          {/* Roti Quantity Counter */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-gray-50 p-1.5 rounded-full border border-gray-200">
            <span className="text-xs font-semibold text-gray-600 pl-2">Quantity:</span>
            <button
              onClick={() => onUpdateRotiCount(Math.max(1, rotiCount - 1))}
              disabled={rotiCount <= 1}
              className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-display font-black text-sm text-gray-900">
              {rotiCount}
            </span>
            <button
              onClick={() => onUpdateRotiCount(Math.min(6, rotiCount + 1))}
              disabled={rotiCount >= 6}
              className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Roti Type Radio Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableRotis.map((roti) => {
            const isSelected = selectedRoti.id === roti.id;

            return (
              <div
                key={roti.id}
                onClick={() => onSelectRoti(roti)}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-amber-50/60 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                }`}
              >
                {/* Roti Thumbnail Image */}
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                  <img
                    src={roti.image}
                    alt={roti.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {roti.imageNumber && (
                    <span className="absolute bottom-0 left-0 bg-black/80 text-white text-[9px] font-black px-1.5 rounded-tr">
                      #{roti.imageNumber}
                    </span>
                  )}
                </div>

                {/* Roti Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                      {roti.name}
                    </span>
                    {roti.isGlutenFree && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded">
                        GF
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>{roti.caloriesPerRoti * rotiCount} kcal</span>
                    <span>•</span>
                    <span>{(roti.proteinPerRoti * rotiCount).toFixed(1)}g Protein</span>
                  </div>
                </div>

                {/* Radio Circle */}
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600 flex items-center gap-2">
          <span className="text-emerald-700 font-bold">✓ Included Free:</span>
          <span>Standard 3 rotis are included with your 10 credit meal without any extra deduction.</span>
        </div>

      </div>

      {/* 2. Dal Chawal Add-on Checkbox Card (Daily Option for Lunch & Dinner) */}
      <div 
        onClick={onToggleDalChawal}
        className={`bg-white rounded-3xl p-4 sm:p-5 border cursor-pointer transition-all ${
          includeDalChawal
            ? 'border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/20 shadow-xs'
            : 'border-gray-200/90 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Image Thumbnail with #8 badge */}
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
              <img
                src={dalChawalDish.image}
                alt={dalChawalDish.name}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 left-0 bg-black/80 text-white text-[9px] font-black px-1.5 rounded-tr">
                Img #8
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-gray-900">
                  {dalChawalDish.name}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  Daily Standard
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                {dalChawalDish.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>{dalChawalDish.calories} kcal</span>
                <span>•</span>
                <span>{dalChawalDish.protein}g Protein</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-xs font-black text-emerald-800 block">
                {isSubscriberView ? 'Optional Add-on' : '+₹30'}
              </span>
              <span className="text-[10px] text-gray-400 block">
                Daily Option
              </span>
            </div>
            <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
              includeDalChawal
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-white border-gray-300'
            }`}>
              {includeDalChawal && <Check className="w-4 h-4 stroke-[3]" />}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Sunday Dessert Option (Gulab Jamun) if available */}
      {dessertDish && onToggleDessert && (
        <div 
          onClick={onToggleDessert}
          className={`bg-white rounded-3xl p-4 sm:p-5 border cursor-pointer transition-all ${
            includeDessert
              ? 'border-rose-500 bg-rose-50/30 ring-2 ring-rose-500/20 shadow-xs'
              : 'border-gray-200/90 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                <img
                  src={dessertDish.image}
                  alt={dessertDish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 left-0 bg-black/80 text-white text-[9px] font-black px-1.5 rounded-tr">
                  Img #30
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900">
                    {dessertDish.name}
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.5 rounded">
                    Sunday Special
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                  {dessertDish.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>{dessertDish.calories} kcal</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-black text-rose-800 block">
                  {isSubscriberView ? 'Included' : '+₹35'}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                includeDessert
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-white border-gray-300'
              }`}>
                {includeDessert && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
