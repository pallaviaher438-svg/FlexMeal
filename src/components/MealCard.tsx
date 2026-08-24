import React from 'react';
import { Dish } from '../types';
import { CheckCircle2, Circle, Flame, Sparkles, Wheat } from 'lucide-react';

interface MealCardProps {
  dish: Dish;
  isSelected: boolean;
  onSelect: (dish: Dish) => void;
  isSubscriberView?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({
  dish,
  isSelected,
  onSelect,
  isSubscriberView = true
}) => {
  const isSabji = dish.category === 'sabji' || dish.category === 'special';

  return (
    <div
      onClick={() => onSelect(dish)}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
        isSelected
          ? 'bg-white border-[#b7102a] ring-2 ring-[#b7102a]/20 shadow-lg scale-[1.01]'
          : 'bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      {/* Top Image Section */}
      <div>
        <div className="relative h-44 sm:h-52 w-full bg-gray-100 overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Gradient Overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

          {/* Top Badges: Sequence Number & Dietary Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            {/* Image Number Badge (e.g. Img #1, #5, #6, etc.) */}
            {dish.imageNumber && (
              <span className="bg-black/75 backdrop-blur-md text-white text-xs font-black px-2.5 py-1 rounded-lg border border-white/20 shadow-sm flex items-center gap-1">
                <span className="text-amber-400 font-bold">Img</span> #{dish.imageNumber}
              </span>
            )}

            {/* Dietary Indicator */}
            <div className="flex items-center gap-1.5 ml-auto">
              {dish.dietary === 'veg' && (
                <div className="w-6 h-6 rounded-md bg-white/95 p-1 flex items-center justify-center border border-emerald-600 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
              )}
              {dish.dietary === 'non-veg' && (
                <div className="w-6 h-6 rounded-md bg-white/95 p-1 flex items-center justify-center border border-red-600 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
                </div>
              )}
              {dish.dietary === 'egg' && (
                <div className="w-6 h-6 rounded-md bg-white/95 p-1 flex items-center justify-center border border-amber-600 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                </div>
              )}
            </div>
          </div>

          {/* 3 Rotis Included Badge */}
          {isSabji && (
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="bg-amber-400 text-gray-950 text-[11px] font-black px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                <Wheat className="w-3 h-3" />
                3 Rotis Included (₹0 extra)
              </span>
            </div>
          )}

          {/* Selected Checkmark Badge */}
          <div className="absolute bottom-3 right-3">
            {isSelected ? (
              <div className="flex items-center gap-1 bg-[#b7102a] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md animate-in fade-in zoom-in-95">
                <CheckCircle2 className="w-4 h-4" />
                <span>Selected</span>
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <Circle className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Dish Details */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Title & Dual Pricing */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-gray-900 leading-snug group-hover:text-[#b7102a] transition-colors">
                {dish.name}
              </h3>
              {isSabji && (
                <span className="text-[11px] font-semibold text-emerald-700 block mt-0.5">
                  ✓ Choose 1 of 3 Sabji options
                </span>
              )}
            </div>

            {/* Price Badge */}
            <div className="text-right shrink-0">
              {isSubscriberView ? (
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full inline-block">
                    10 Credits
                  </span>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    (Walk-in: ₹{dish.price})
                  </span>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-[#b7102a] bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-full inline-block">
                    ₹{dish.price}
                  </span>
                  <span className="text-[10px] text-gray-400 block font-medium">
                    (Sub: 10 Credits)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {dish.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Macro Nutrition Strip */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="pt-3 border-t border-gray-100 grid grid-cols-4 gap-1 text-center text-xs">
          <div className="bg-gray-50/90 p-1.5 rounded-xl border border-gray-100">
            <span className="text-[9px] text-gray-400 uppercase font-black block">Calories</span>
            <span className="font-extrabold text-gray-800">{dish.calories}</span>
          </div>
          <div className="bg-emerald-50/90 p-1.5 rounded-xl border border-emerald-100">
            <span className="text-[9px] text-emerald-600 uppercase font-black block">Protein</span>
            <span className="font-extrabold text-emerald-800">{dish.protein}g</span>
          </div>
          <div className="bg-amber-50/90 p-1.5 rounded-xl border border-amber-100">
            <span className="text-[9px] text-amber-600 uppercase font-black block">Carbs</span>
            <span className="font-extrabold text-amber-800">{dish.carbs}g</span>
          </div>
          <div className="bg-purple-50/90 p-1.5 rounded-xl border border-purple-100">
            <span className="text-[9px] text-purple-600 uppercase font-black block">Fat</span>
            <span className="font-extrabold text-purple-800">{dish.fats}g</span>
          </div>
        </div>
      </div>

    </div>
  );
};
