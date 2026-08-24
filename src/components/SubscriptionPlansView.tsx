import React from 'react';
import { SUBSCRIPTION_PLANS } from '../data/mealData';
import { SubscriptionPlan } from '../types';
import { Check, Sparkles, Zap, ShieldCheck, Clock, ArrowRight, HelpCircle } from 'lucide-react';

interface SubscriptionPlansViewProps {
  onSelectPlan: (plan: SubscriptionPlan) => void;
  onBackToMenu: () => void;
}

export const SubscriptionPlansView: React.FC<SubscriptionPlansViewProps> = ({
  onSelectPlan,
  onBackToMenu
}) => {
  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      
      {/* Header Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#b7102a] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Transparent & Flexible
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Choose Your Meal Strategy
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Whether you want a flexible monthly plan with rollover credits or pay-as-you-go meals, FlexMeal adapts to your schedule.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isSubscriber = plan.id === 'flex_subscriber';

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                isSubscriber
                  ? 'bg-gradient-to-b from-[#FFFDF5] via-white to-[#FDF8E7] border-2 border-[#E9C46A] shadow-lg ring-4 ring-[#E9C46A]/20 scale-100 lg:-translate-y-2'
                  : 'bg-white border border-gray-200 hover:border-gray-300 shadow-xs'
              }`}
            >
              {isSubscriber && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#b7102a] text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                  Most Popular Choice
                </div>
              )}

              <div>
                {/* Plan Title & Tagline */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      {plan.recommendedFor}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 min-h-[38px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mt-6 mb-6 pt-4 border-t border-gray-100 flex items-baseline gap-1">
                  {plan.price > 0 ? (
                    <>
                      <span className="text-base sm:text-lg font-bold text-gray-500">₹</span>
                      <span className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        {plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        {plan.period}
                      </span>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <span className="font-display text-3xl font-extrabold text-gray-900">
                        Pay-As-You-Go
                      </span>
                      <span className="text-xs text-gray-500">No monthly commitment</span>
                    </div>
                  )}
                </div>

                {/* Credits badge if applicable */}
                {plan.credits > 0 && (
                  <div className="mb-6 bg-[#E9C46A]/20 border border-[#E9C46A]/60 p-3 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#E9C46A] flex items-center justify-center text-[#410007] text-xs font-bold">
                        ★
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {plan.credits} Flex Credits
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-900 font-semibold">
                      14-day Grace Rollover
                    </span>
                  </div>
                )}

                {/* Feature Checklist */}
                <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isSubscriber ? 'bg-[#b7102a] text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                    isSubscriber
                      ? 'bg-[#b7102a] hover:bg-[#960d22] text-white shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-gray-900 hover:bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <span>{plan.price > 0 ? 'Subscribe Now' : 'Start Ordering'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Comparison & Guarantee Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900">
            The FlexMeal Promise
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              14-Day Credit Rollover
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Traveling or eating out? All unused monthly credits automatically roll over into the next 14 days so you never lose your money.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              100% Homestyle Preparation
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Zero palm oil, zero artificial food coloring, and freshly stoneground flours prepared daily in small batches.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Unlimited Pause / Fasting Swaps
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pause deliveries with 1 tap or switch to pure Vrat dishes with zero added fees.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onBackToMenu}
            className="text-xs font-bold text-[#b7102a] hover:underline"
          >
            ← Back to Today's Menu
          </button>
        </div>
      </div>

    </div>
  );
};
