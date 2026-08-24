import React from 'react';
import { 
  Sparkles, 
  CreditCard, 
  Clock, 
  Plus, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  User, 
  Calendar,
  Zap,
  Download
} from 'lucide-react';

interface WalletViewProps {
  credits: number;
  onAddCredits: () => void;
  onViewPlans: () => void;
}

export const WalletView: React.FC<WalletViewProps> = ({
  credits,
  onAddCredits,
  onViewPlans
}) => {
  const transactions = [
    { id: 'TX-902', type: 'debit', desc: 'Lunch: Paneer Kundan & 3 Wheat Rotis', credits: 10, time: 'Today, 1:15 PM' },
    { id: 'TX-901', type: 'debit', desc: 'Breakfast: Indori Masala Kanda Poha (#12)', credits: 6, time: 'Today, 8:40 AM' },
    { id: 'TX-900', type: 'credit', desc: 'Monthly Subscription Credits Added', credits: 900, time: 'Oct 1, 2026' },
    { id: 'TX-899', type: 'credit', desc: '14-Day Grace Window Rollover from Sept', credits: 120, time: 'Oct 1, 2026' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#b7102a] to-[#db313f] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-sm">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-gray-900">
                Aarav Sharma
              </h2>
              <span className="text-[10px] font-bold bg-[#E9C46A] text-[#3d2700] px-2 py-0.5 rounded-full">
                The Flex Subscriber
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              aarav.sharma@example.com • Student / Pro Meal Plan
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>14-day Grace Rollover Active (11 days remaining)</span>
            </div>
          </div>
        </div>

        <button
          onClick={onViewPlans}
          className="px-4 py-2 rounded-full border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-bold transition-colors"
        >
          Manage Plan
        </button>
      </div>

      {/* Credit Balance Box */}
      <div className="bg-gradient-to-r from-[#FDF8E7] via-[#FFFDF5] to-[#F7F9FA] rounded-3xl p-6 sm:p-8 border border-[#E9C46A]/60 shadow-xs relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Available Flex Wallet Balance
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl sm:text-6xl font-extrabold text-gray-900">
              {credits}
            </span>
            <span className="text-xl font-bold text-gray-500">Credits</span>
          </div>
          <p className="text-xs text-gray-600">
            Equivalent to ~{Math.floor(credits / 10)} Full Meals or ~{Math.floor(credits / 6)} Healthy Breakfasts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={onAddCredits}
            className="flex items-center justify-center gap-2 bg-[#b7102a] hover:bg-[#960d22] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            Top Up Credits
          </button>
        </div>
      </div>

      {/* Ledger Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-700" />
            <h3 className="font-display text-base sm:text-lg font-bold text-gray-900">
              Credit Activity Ledger
            </h3>
          </div>
          <span className="text-xs text-gray-400">
            Updated in Real-Time
          </span>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {tx.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-gray-900">
                    {tx.desc}
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    {tx.time} • Ref {tx.id}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className={`font-display font-extrabold text-sm sm:text-base ${
                  tx.type === 'credit' ? 'text-emerald-700' : 'text-gray-900'
                }`}>
                  {tx.type === 'credit' ? `+${tx.credits}` : `-${tx.credits}`} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
