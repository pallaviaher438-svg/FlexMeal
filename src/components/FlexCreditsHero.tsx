import React from 'react';
import { 
  Sparkles, 
  Info, 
  Plus, 
  Calendar,
  Zap,
  Wallet,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  TrendingDown,
  Clock,
  Utensils
} from 'lucide-react';
import { UserProfile } from '../types';

interface FlexCreditsHeroProps {
  credits: number;
  isSubscriberView: boolean;
  onToggleViewMode: (isSubscriber: boolean) => void;
  onAddCredits: () => void;
  onViewPlans: () => void;
  onOpenTimetable: () => void;
  currentUser?: UserProfile | null;
}

export const FlexCreditsHero: React.FC<FlexCreditsHeroProps> = ({
  credits,
  isSubscriberView,
  onToggleViewMode,
  onAddCredits,
  onViewPlans,
  onOpenTimetable,
  currentUser
}) => {
  return (
    <div className="space-y-6">
      
      {/* 1. Main Header Title & Subheadline as strictly requested by user */}
      <div className="text-center sm:text-left space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbeae5] border border-[#f5b8a8] text-[#b7102a] text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-[#b7102a]" />
          <span>India&apos;s 1st Flexible Meal Subscription</span>
        </div>

        {/* EXACT HEADLINE REQUESTED */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
          Your life is flexible, your meals should be too.
        </h1>

        {/* EXACT SUB HEADLINE REQUESTED */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium max-w-3xl">
          Flexible meals for Students, young professionals and fitness focused lifestyles.
        </p>
      </div>

      {/* 2. Interactive Wallet Showcase & Dual Mode Switcher */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b1e22] via-[#21262d] to-[#161a1f] text-white p-6 sm:p-8 shadow-xl border border-gray-700/80">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#e25c1d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-[#b7102a]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Column: Credit Card / Wallet Graphic */}
          <div className="space-y-4 max-w-xl">
            
            {/* Top Badge and Mode Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[#b7102a] text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                <Wallet className="w-3.5 h-3.5" />
                <span>Primary Subscription Wallet</span>
              </div>

              {/* DUAL MODE TOGGLE: Subscriber (Credits) vs Non-Subscriber (Rupees) */}
              <div className="flex items-center bg-gray-800/90 p-1 rounded-full border border-gray-700">
                <button
                  onClick={() => onToggleViewMode(true)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSubscriberView
                      ? 'bg-amber-400 text-gray-950 shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Subscriber Mode (10 Pts)</span>
                </button>

                <button
                  onClick={() => onToggleViewMode(false)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    !isSubscriberView
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Walk-In Mode (₹ Rates)</span>
                </button>
              </div>
            </div>

            {/* BIG HIGHLIGHTED 900 CREDITS SHOWCASE */}
            <div className="pt-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl sm:text-6xl md:text-7xl font-black text-amber-400 tracking-tight drop-shadow-sm">
                  {isSubscriberView ? credits : '900'}
                </span>
                <div className="flex flex-col">
                  <span className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-wider">
                    {isSubscriberView ? 'Available Credits' : 'Credits / Month'}
                  </span>
                  <span className="text-xs text-amber-300/90 font-semibold">
                    ₹5,799 Pre-paid 30-Day Package
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Core Wallet Mechanics Formula */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Per Meal Spend</span>
                <span className="text-base font-extrabold text-white">10 Credits</span>
                <span className="text-[11px] text-gray-300 block mt-0.5">3 Rotis + Sabji</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Daily Allocation</span>
                <span className="text-base font-extrabold text-amber-300">30 Credits / Day</span>
                <span className="text-[11px] text-gray-300 block mt-0.5">Breakfast + Lunch + Dinner</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Grace Rollover</span>
                <span className="text-base font-extrabold text-emerald-400">14-Day Window</span>
                <span className="text-[11px] text-gray-300 block mt-0.5">44-Day Total Validity</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              * Users receive 900 points monthly (30 points/day) and spend 10 points per meal with complete scheduling flexibility. Unused points rollover for a 2-week grace period.
            </p>

          </div>

          {/* Right Column: Key Benefits & Action CTA */}
          <div className="lg:border-l lg:border-gray-700/80 lg:pl-8 flex flex-col justify-between space-y-5">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Subscription Value Matrix
              </span>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span><strong>3 Hot Stoneground Rotis</strong> included with each sabji meal</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span><strong>Optional Dal Chawal</strong> available daily for Lunch & Dinner</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span><strong>Fasting Mode:</strong> Swap for Sabudana & Rajgira Vrat menus</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    ✓
                  </div>
                  <span><strong>Save ~40%</strong> vs Walk-in unbundled rates (₹90–₹100/meal)</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onAddCredits}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 px-5 py-3 rounded-2xl font-black text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Get 900 Credits Pass (₹5,799)</span>
              </button>

              <button
                onClick={onOpenTimetable}
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-4 py-3 rounded-2xl font-bold text-xs transition-colors"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>View 7-Day Menu</span>
              </button>

              <button
                onClick={onViewPlans}
                className="flex items-center justify-center gap-1 text-gray-400 hover:text-white text-xs font-semibold py-2 transition-colors"
              >
                <span>Compare Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
