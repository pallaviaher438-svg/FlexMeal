import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '../data/mealData';
import { DayOfWeek, MealTime } from '../types';
import { Calendar, X, Utensils, Check, ArrowRight, Sparkles, Filter, Leaf } from 'lucide-react';

interface WeeklyTimetableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (day: DayOfWeek, mealTime: MealTime) => void;
}

export const WeeklyTimetableModal: React.FC<WeeklyTimetableModalProps> = ({
  isOpen,
  onClose,
  onSelectSlot
}) => {
  const [filter, setFilter] = useState<'all' | 'veg_only' | 'high_protein'>('all');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      
      <div className="relative bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 via-white to-gray-50 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#b7102a] text-white flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                Complete Weekly Meal Timetable
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Hand-curated 7-day nutritional rotation according to standard kitchen schedule.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Pills */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  filter === 'all' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Meals
              </button>
              <button
                onClick={() => setFilter('veg_only')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  filter === 'veg_only' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Leaf className="w-3 h-3" />
                Pure Veg
              </button>
              <button
                onClick={() => setFilter('high_protein')}
                className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                  filter === 'high_protein' ? 'bg-[#b7102a] text-white shadow-2xs' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                High Protein
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Table Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {WEEKLY_SCHEDULE.map((dayPlan) => {
              const isSunday = dayPlan.day === 'Sunday';

              return (
                <div
                  key={dayPlan.day}
                  className={`rounded-2xl border p-3 sm:p-4 flex flex-col justify-between space-y-4 ${
                    isSunday
                      ? 'bg-rose-50/40 border-rose-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  {/* Day Header */}
                  <div className="border-b border-gray-100 pb-2 flex items-center justify-between">
                    <span className="font-display font-extrabold text-sm sm:text-base text-gray-900">
                      {dayPlan.day}
                    </span>
                    {isSunday && (
                      <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.2 rounded">
                        Special
                      </span>
                    )}
                  </div>

                  {/* 1. Breakfast Slot */}
                  <div 
                    onClick={() => {
                      onSelectSlot(dayPlan.day, 'breakfast');
                      onClose();
                    }}
                    className="group bg-gray-50 hover:bg-red-50/50 p-2.5 rounded-xl border border-gray-200/80 hover:border-[#b7102a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                      <span>Breakfast</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#b7102a]" />
                    </div>
                    {dayPlan.breakfast.dishes.map((dish) => (
                      <div key={dish.id} className="text-xs font-medium text-gray-800 flex items-start gap-1">
                        <span className="text-gray-400">•</span>
                        <span className="leading-tight">
                          {dish.name}
                          {dish.imageNumber && (
                            <span className="text-[10px] text-gray-400 font-bold ml-1">
                              (#{dish.imageNumber})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 2. Lunch Slot */}
                  <div 
                    onClick={() => {
                      onSelectSlot(dayPlan.day, 'lunch');
                      onClose();
                    }}
                    className="group bg-gray-50 hover:bg-red-50/50 p-2.5 rounded-xl border border-gray-200/80 hover:border-[#b7102a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-orange-700 uppercase tracking-wider">
                      <span>Lunch</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#b7102a]" />
                    </div>

                    <div className="text-[11px] text-gray-500 font-semibold">
                      Rotis: {dayPlan.lunch.rotis.map(r => r.name.split(' ')[0]).join(' / ')}
                    </div>

                    <div className="space-y-1">
                      {dayPlan.lunch.sabjis.map((dish) => (
                        <div key={dish.id} className="text-xs font-medium text-gray-800 flex items-start gap-1">
                          <span className="text-gray-400">•</span>
                          <span className="leading-tight">
                            {dish.name}
                            {dish.imageNumber && (
                              <span className="text-[10px] text-gray-400 font-bold ml-1">
                                (#{dish.imageNumber})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] text-emerald-700 font-semibold pt-1">
                      + Dal Chawal (#8)
                    </div>
                  </div>

                  {/* 3. Dinner Slot */}
                  <div 
                    onClick={() => {
                      onSelectSlot(dayPlan.day, 'dinner');
                      onClose();
                    }}
                    className="group bg-gray-50 hover:bg-red-50/50 p-2.5 rounded-xl border border-gray-200/80 hover:border-[#b7102a] cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                      <span>Dinner</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#b7102a]" />
                    </div>

                    <div className="text-[11px] text-gray-500 font-semibold">
                      Rotis: {dayPlan.dinner.rotis.map(r => r.name.split(' ')[0]).join(' / ')}
                    </div>

                    <div className="space-y-1">
                      {dayPlan.dinner.sabjis.map((dish) => (
                        <div key={dish.id} className="text-xs font-medium text-gray-800 flex items-start gap-1">
                          <span className="text-gray-400">•</span>
                          <span className="leading-tight">
                            {dish.name}
                            {dish.imageNumber && (
                              <span className="text-[10px] text-gray-400 font-bold ml-1">
                                (#{dish.imageNumber})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {dayPlan.dinner.dessert ? (
                      <div className="text-[10px] text-rose-700 font-bold pt-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        Gulab Jamun Dessert
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-700 font-semibold pt-1">
                        + Dal Chawal (#8)
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b7102a]" />
            <span>Click any meal card above to load and customize your selection immediately.</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
          >
            Close Timetable
          </button>
        </div>

      </div>

    </div>
  );
};
