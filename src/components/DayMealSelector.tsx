import React from 'react';
import { DayOfWeek, MealTime } from '../types';
import { Sun, Sunset, Moon, Calendar, Sparkles } from 'lucide-react';

interface DayMealSelectorProps {
  selectedDay: DayOfWeek;
  onSelectDay: (day: DayOfWeek) => void;
  selectedMealTime: MealTime;
  onSelectMealTime: (meal: MealTime) => void;
  isFastingMode: boolean;
}

const DAYS: { name: DayOfWeek; short: string; highlight: string }[] = [
  { name: 'Monday', short: 'Mon', highlight: 'Uttapam & Paneer Kundan' },
  { name: 'Tuesday', short: 'Tue', highlight: 'Poha, Palak Paneer & Chicken' },
  { name: 'Wednesday', short: 'Wed', highlight: 'Sprouts, Rajma & Egg Curry' },
  { name: 'Thursday', short: 'Thu', highlight: 'Chana Bowl & Dum Aloo' },
  { name: 'Friday', short: 'Fri', highlight: 'Dhokla, Kolhapuri & Sev Tamatar' },
  { name: 'Saturday', short: 'Sat', highlight: 'Idli Sambar & Matar Paneer' },
  { name: 'Sunday', short: 'Sun', highlight: 'Biryani, Misal & Gulab Jamun' }
];

export const DayMealSelector: React.FC<DayMealSelectorProps> = ({
  selectedDay,
  onSelectDay,
  selectedMealTime,
  onSelectMealTime,
  isFastingMode
}) => {
  return (
    <div className="space-y-4">
      
      {/* Day Selector Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#b7102a]" />
          <h2 className="font-display text-lg sm:text-xl font-bold text-gray-900">
            Select Day & Menu
          </h2>
        </div>
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          Full 7-Day Rotational Menu
        </span>
      </div>

      {/* Horizontal Day Pills Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
        {DAYS.map((d) => {
          const isSelected = selectedDay === d.name;
          const isSunday = d.name === 'Sunday';

          return (
            <button
              key={d.name}
              onClick={() => onSelectDay(d.name)}
              className={`shrink-0 flex flex-col items-center justify-center min-w-[76px] sm:min-w-[90px] py-2.5 px-3 rounded-2xl border transition-all ${
                isSelected
                  ? 'bg-[#b7102a] text-white border-[#b7102a] shadow-sm scale-[1.02]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50/80'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  {d.short}
                </span>
                {isSunday && (
                  <Sparkles className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-amber-500'}`} />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium line-clamp-1 ${
                isSelected ? 'text-red-100' : 'text-gray-400'
              }`}>
                {isSunday ? 'Feast' : d.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Meal Time Tabs: Breakfast, Lunch, Dinner */}
      <div className="bg-gray-100/90 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200/80">
        
        <button
          onClick={() => onSelectMealTime('breakfast')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            selectedMealTime === 'breakfast'
              ? 'bg-white text-[#b7102a] shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
          }`}
        >
          <Sun className={`w-4 h-4 ${selectedMealTime === 'breakfast' ? 'text-amber-500' : 'text-gray-400'}`} />
          <span>Breakfast</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 hidden md:inline">
            7:30 - 10:30 AM
          </span>
        </button>

        <button
          onClick={() => onSelectMealTime('lunch')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            selectedMealTime === 'lunch'
              ? 'bg-white text-[#b7102a] shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
          }`}
        >
          <Sunset className={`w-4 h-4 ${selectedMealTime === 'lunch' ? 'text-orange-500' : 'text-gray-400'}`} />
          <span>Lunch</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 hidden md:inline">
            12:30 - 3:00 PM
          </span>
        </button>

        <button
          onClick={() => onSelectMealTime('dinner')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            selectedMealTime === 'dinner'
              ? 'bg-white text-[#b7102a] shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/40'
          }`}
        >
          <Moon className={`w-4 h-4 ${selectedMealTime === 'dinner' ? 'text-indigo-500' : 'text-gray-400'}`} />
          <span>Dinner</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 hidden md:inline">
            7:30 - 10:30 PM
          </span>
        </button>

      </div>

      {isFastingMode && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span><strong>Fasting Mode Active</strong>: Displaying pure Vrat-approved dishes prepared with Sendha Namak & Desi Ghee.</span>
          </div>
        </div>
      )}

    </div>
  );
};
