import React, { useState } from 'react';
import { 
  Sparkles, 
  Utensils, 
  CalendarDays, 
  CreditCard, 
  Clock, 
  User, 
  Leaf, 
  Flame, 
  CheckCircle2, 
  Plus,
  ChefHat,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Bookmark,
  SlidersHorizontal
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface HeaderProps {
  activeTab: 'menu' | 'timetable' | 'my_menu' | 'plans' | 'orders' | 'wallet' | 'admin';
  setActiveTab: (tab: 'menu' | 'timetable' | 'my_menu' | 'plans' | 'orders' | 'wallet' | 'admin') => void;
  currentUser: UserProfile | null;
  credits: number;
  isFastingMode: boolean;
  setIsFastingMode: (v: boolean) => void;
  onAddCredits: () => void;
  onLogout: () => void;
  onSwitchRole: () => void;
  savedCustomDishesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  credits,
  isFastingMode,
  setIsFastingMode,
  onAddCredits,
  onLogout,
  onSwitchRole,
  savedCustomDishesCount = 0
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab(currentUser?.role === 'admin' ? 'admin' : 'menu')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-2xl overflow-hidden border border-emerald-800/10 shadow-sm shadow-emerald-950/10 group-hover:scale-105 transition-all bg-[#faf8f5] flex items-center justify-center p-0.5">
              <img 
                src="/flexmeal-logo.jpg" 
                alt="FlexMeal Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-tight text-[#164e3f]">
                  Flex<span className="text-[#e25c1d]">Meal</span>
                </span>
                {currentUser?.role === 'admin' ? (
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-800 border border-indigo-200 px-1.5 py-0.5 rounded-md">
                    Admin Ops
                  </span>
                ) : currentUser?.role === 'subscriber' ? (
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md">
                    Subscriber
                  </span>
                ) : (
                  <span className="text-[9px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200 px-1.5 py-0.5 rounded-md">
                    Customer
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block font-medium">
                Flexible Meals, Made for You
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-100/90 p-1.5 rounded-full border border-gray-200/60">
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                  activeTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <ChefHat className="w-4 h-4" />
                Kitchen Ops
              </button>
            )}

            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'menu'
                  ? 'bg-white text-[#b7102a] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Today's Menu
            </button>

            <button
              onClick={() => setActiveTab('my_menu')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all relative ${
                activeTab === 'my_menu'
                  ? 'bg-white text-[#e25c1d] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#e25c1d]" />
              <span>My Menu</span>
              {savedCustomDishesCount > 0 && (
                <span className="bg-[#e25c1d] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCustomDishesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('timetable')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'timetable'
                  ? 'bg-white text-[#b7102a] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              Weekly Table
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'plans'
                  ? 'bg-white text-[#b7102a] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Meal Plans
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-white text-[#b7102a] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              My Orders
            </button>
          </nav>

          {/* Medium Screen Navigation (md to lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-1 bg-gray-100/90 p-1 rounded-full border border-gray-200/60 text-xs">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3 py-1.5 rounded-full font-bold ${activeTab === 'menu' ? 'bg-white text-[#b7102a] shadow-xs' : 'text-gray-600'}`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('my_menu')}
              className={`px-3 py-1.5 rounded-full font-bold flex items-center gap-1 ${activeTab === 'my_menu' ? 'bg-white text-[#e25c1d] shadow-xs' : 'text-gray-600'}`}
            >
              <span>My Menu</span>
              {savedCustomDishesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#e25c1d]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('timetable')}
              className={`px-3 py-1.5 rounded-full font-bold ${activeTab === 'timetable' ? 'bg-white text-[#b7102a] shadow-xs' : 'text-gray-600'}`}
            >
              Table
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-full font-bold ${activeTab === 'orders' ? 'bg-white text-[#b7102a] shadow-xs' : 'text-gray-600'}`}
            >
              Orders
            </button>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Fasting / Vrat Pill Toggle */}
            <button
              onClick={() => setIsFastingMode(!isFastingMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isFastingMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-400/30'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
              title="Toggle Vrat / Fasting friendly meals"
            >
              <Leaf className={`w-3.5 h-3.5 ${isFastingMode ? 'text-emerald-600 fill-emerald-600' : 'text-gray-400'}`} />
              <span className="hidden sm:inline">Vrat Mode</span>
              <span className="sm:hidden">Vrat</span>
              <span className={`w-2 h-2 rounded-full ${isFastingMode ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
            </button>

            {/* Flex Credits Badge */}
            <div 
              onClick={onAddCredits}
              className="flex items-center gap-2 bg-[#E9C46A]/20 hover:bg-[#E9C46A]/30 border border-[#E9C46A]/60 px-3 py-1.5 rounded-full cursor-pointer transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-[#E9C46A] flex items-center justify-center text-[#410007] font-extrabold text-[11px] shadow-2xs">
                ★
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-sm text-gray-900">
                  {credits}
                </span>
                <span className="text-[11px] font-medium text-gray-600">
                  pts
                </span>
              </div>
              <button 
                className="w-4 h-4 rounded-full bg-[#b7102a] text-white flex items-center justify-center group-hover:scale-110 transition-transform"
                title="Add credits"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* User Profile & Role Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full border transition-all ${
                  currentUser?.role === 'admin'
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    : currentUser?.role === 'subscriber'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
                title="Account Menu"
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-extrabold text-xs text-white ${
                  currentUser?.role === 'admin'
                    ? 'bg-indigo-600'
                    : currentUser?.role === 'subscriber'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}>
                  {currentUser?.avatarInitials || 'U'}
                </div>
                <span className="text-xs font-bold hidden sm:inline max-w-[90px] truncate">
                  {currentUser?.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* Popover Menu */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2.5 border-b border-gray-100">
                    <p className="text-xs font-extrabold text-gray-900 truncate">
                      {currentUser?.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {currentUser?.email}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                      {currentUser?.role === 'admin' ? '🛡️ Admin' : currentUser?.role === 'subscriber' ? '⭐ Flex Subscriber' : '👤 Customer'}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('my_menu');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-[#e25c1d]" />
                      My Custom Menu ({savedCustomDishesCount})
                    </button>

                    {currentUser?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <ChefHat className="w-4 h-4 text-indigo-600" />
                        Kitchen Dispatch Ops
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('wallet');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4 text-gray-500" />
                      Wallet & Billing
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Order History
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSwitchRole();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 border-t border-gray-100"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      Switch Profile / Role
                    </button>
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

