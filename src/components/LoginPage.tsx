import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  User, 
  Lock, 
  Mail, 
  ArrowRight, 
  ChefHat, 
  CreditCard, 
  CheckCircle2,
  Utensils,
  Eye,
  EyeOff,
  Leaf,
  Clock,
  HeartHandshake
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: UserProfile, chosenPlan?: 'subscription' | 'walkin') => void;
}

export const PRESET_USERS: Record<UserRole, UserProfile> = {
  subscriber: {
    id: 'USR-SUB-902',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'subscriber',
    phone: '+91 98765 43210',
    credits: 900,
    planName: 'Flex 30-Day Pass (900 Credits)',
    graceDaysRemaining: 14,
    avatarInitials: 'AS'
  },
  customer: {
    id: 'USR-CUST-104',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    role: 'customer',
    phone: '+91 98234 56789',
    credits: 0,
    planName: 'Pay-As-You-Go Walk-In',
    avatarInitials: 'PP'
  },
  admin: {
    id: 'USR-ADM-001',
    name: 'Chef Vikram Singh',
    email: 'admin@flexmeal.in',
    role: 'admin',
    phone: '+91 98000 11223',
    credits: 9999,
    planName: 'Head Kitchen Operations & Admin',
    avatarInitials: 'VS'
  }
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('subscriber');
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Aarav Sharma');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showSubscriptionPrompt, setShowSubscriptionPrompt] = useState(false);
  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRole(role);
    const preset = PRESET_USERS[role];
    setEmail(preset.email);
    setName(preset.name);
    setPassword('flexmeal2026');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const basePreset = PRESET_USERS[selectedRole];
    const userToLogin: UserProfile = {
      ...basePreset,
      name: name || basePreset.name,
      email: email || basePreset.email,
    };

    if (selectedRole === 'admin') {
      onLogin(userToLogin);
    } else {
      setPendingUser(userToLogin);
      setShowSubscriptionPrompt(true);
    }
  };

  const handleGoogleSignIn = () => {
    const googleUser: UserProfile = {
      id: 'USR-GGL-' + Math.floor(1000 + Math.random() * 9000),
      name: 'Google User',
      email: 'user.google@gmail.com',
      role: 'subscriber',
      phone: '+91 99887 76655',
      credits: 900,
      planName: 'Flex 30-Day Pass (900 Credits)',
      graceDaysRemaining: 14,
      avatarInitials: 'GU'
    };
    setPendingUser(googleUser);
    setShowSubscriptionPrompt(true);
  };

  const handleQuickLogin = (role: UserRole) => {
    const user = PRESET_USERS[role];
    if (role === 'admin') {
      onLogin(user);
    } else {
      setPendingUser(user);
      setShowSubscriptionPrompt(true);
    }
  };

  const handleChoosePlan = (choice: 'subscription' | 'walkin') => {
    if (!pendingUser) return;

    if (choice === 'subscription') {
      onLogin({
        ...pendingUser,
        role: 'subscriber',
        credits: 900,
        planName: 'Flex 30-Day Pass (900 Credits)'
      }, 'subscription');
    } else {
      onLogin({
        ...pendingUser,
        role: 'customer',
        credits: 0,
        planName: 'Pay-As-You-Go Walk-In'
      }, 'walkin');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#ffdad8] selection:text-[#410007] relative overflow-hidden">
      
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-100/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-100/60 blur-3xl pointer-events-none" />

      {/* Post-Login Subscription Prompt Dialog */}
      {showSubscriptionPrompt && pendingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 animate-in zoom-in-95">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900">
                Welcome, {pendingUser.name.split(' ')[0]}!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Choose your preferred meal access plan. You can switch between views anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option A: 30-Day Flex Subscription */}
              <div 
                onClick={() => handleChoosePlan('subscription')}
                className="rounded-3xl p-5 border-2 border-[#e25c1d] bg-gradient-to-b from-orange-50/50 via-amber-50/20 to-white hover:shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-[#e25c1d] text-white px-2 py-0.5 rounded-full inline-block">
                    Recommended (Save 40%)
                  </span>
                  <h3 className="font-display text-lg font-black text-gray-900">
                    The 30-Day Flex Pass
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-black text-[#e25c1d]">900</span>
                    <span className="text-xs font-bold text-gray-700">Credits (@ ₹5,799)</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5">✓ <strong>10 Credits / meal</strong> (30/day)</li>
                    <li className="flex items-center gap-1.5">✓ <strong>3 Rotis included</strong> per sabji</li>
                    <li className="flex items-center gap-1.5">✓ <strong>14-Day Grace Rollover</strong></li>
                    <li className="flex items-center gap-1.5">✓ <strong>Fasting Mode Swap</strong> included</li>
                  </ul>
                </div>

                <button className="w-full py-3 rounded-2xl bg-[#e25c1d] text-white font-black text-xs hover:bg-[#c94d14] transition-colors shadow-sm">
                  Start with 900 Credits Pass →
                </button>
              </div>

              {/* Option B: Pay-As-You-Go Walk-In */}
              <div 
                onClick={() => handleChoosePlan('walkin')}
                className="rounded-3xl p-5 border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full inline-block">
                    No Upfront Lock-In
                  </span>
                  <h3 className="font-display text-lg font-black text-gray-900">
                    Pay-As-You-Go Walk-In
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-2xl font-black text-gray-900">₹ Direct</span>
                    <span className="text-xs font-bold text-gray-500">Unbundled Rates</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-1.5">✓ Breakfast: ₹50–₹60</li>
                    <li className="flex items-center gap-1.5">✓ Lunch/Dinner: ₹90–₹100</li>
                    <li className="flex items-center gap-1.5">✓ Instant UPI, Cards & Cash</li>
                    <li className="flex items-center gap-1.5">✓ Upgrade to credits anytime</li>
                  </ul>
                </div>

                <button className="w-full py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-black transition-colors shadow-sm">
                  Continue as Walk-In →
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <div className="inline-flex items-center justify-center p-2 bg-white rounded-3xl shadow-sm border border-gray-200/80 mb-0.5 hover:shadow-md transition-shadow">
          <img 
            src="/flexmeal-logo.jpg" 
            alt="FlexMeal Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl"
          />
        </div>

        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Sign In to Flex<span className="text-[#e25c1d]">Meal</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-sm mx-auto mt-1 font-medium">
            Fresh, wholesome homestyle meals tailored to your everyday flexibility.
          </p>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="bg-white/95 backdrop-blur-md py-7 px-5 sm:px-8 shadow-xl shadow-gray-200/50 border border-gray-200/80 rounded-3xl space-y-5">
          
          {/* Auth Tab Switcher (Sign In vs Sign Up) */}
          <div className="flex items-center bg-gray-100/90 p-1 rounded-2xl border border-gray-200/70">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authMode === 'signin'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Google Sign-in Option */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-4 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-2xs hover:shadow-xs transition-all hover:border-gray-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-grow border-t border-gray-200/80" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">or with credentials</span>
            <div className="flex-grow border-t border-gray-200/80" />
          </div>

          {/* Role Profile Selector (Refined Tabs) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                Account Type
              </label>
              <span className="text-[10px] font-semibold text-[#e25c1d]">
                {selectedRole === 'subscriber' ? '900 Credits Pass' : selectedRole === 'customer' ? 'Pay-As-You-Go' : 'Kitchen Admin'}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100/90 rounded-2xl border border-gray-200/70">
              
              {/* Subscriber Role Tab */}
              <button
                type="button"
                onClick={() => handleRoleTabChange('subscriber')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'subscriber'
                    ? 'bg-white text-[#164e3f] shadow-xs border border-gray-200/80'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Subscriber</span>
              </button>

              {/* Customer Role Tab */}
              <button
                type="button"
                onClick={() => handleRoleTabChange('customer')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'customer'
                    ? 'bg-white text-[#b7102a] shadow-xs border border-gray-200/80'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="w-3.5 h-3.5 text-[#b7102a] shrink-0" />
                <span>Customer</span>
              </button>

              {/* Admin Role Tab */}
              <button
                type="button"
                onClick={() => handleRoleTabChange('admin')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-white text-indigo-900 shadow-xs border border-gray-200/80'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Admin</span>
              </button>

            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#164e3f] focus:border-[#164e3f] bg-gray-50/40"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address or Phone
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#164e3f] focus:border-[#164e3f] bg-gray-50/40"
                  placeholder="name@example.com or mobile"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("For this live demo, password is pre-filled. You can sign in directly!")}
                  className="text-[11px] text-[#e25c1d] hover:underline font-semibold"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-[#164e3f] focus:border-[#164e3f] bg-gray-50/40"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md text-[#164e3f] focus:ring-[#164e3f] border-gray-300"
                />
                <span className="text-xs text-gray-600 font-medium">Keep me signed in</span>
              </label>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded-full">
                Instant Auto-Fill
              </span>
            </div>

            {/* Clean, Polished Single Sign In Button */}
            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all bg-[#b7102a] hover:bg-[#960d22] active:scale-[0.99] cursor-pointer"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                1-Click Quick Demo Sign In
              </span>
              <span className="text-[10px] text-gray-400">Click any avatar</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              
              <button
                type="button"
                onClick={() => handleQuickLogin('subscriber')}
                className="p-2 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 text-left transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                  AS
                </div>
                <div className="overflow-hidden">
                  <span className="font-bold text-[11px] text-gray-900 block truncate">Aarav S.</span>
                  <span className="text-[10px] text-amber-800 font-semibold">900 Credits</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="p-2 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100/70 text-left transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#b7102a] text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                  PP
                </div>
                <div className="overflow-hidden">
                  <span className="font-bold text-[11px] text-gray-900 block truncate">Priya P.</span>
                  <span className="text-[10px] text-rose-800 font-semibold">Pay-As-You-Go</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/70 text-left transition-colors flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-105 transition-transform">
                  VS
                </div>
                <div className="overflow-hidden">
                  <span className="font-bold text-[11px] text-gray-900 block truncate">Chef Vikram</span>
                  <span className="text-[10px] text-indigo-800 font-semibold">Kitchen Ops</span>
                </div>
              </button>

            </div>
          </div>

        </div>

        {/* Feature Badges Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-gray-500 font-medium text-center">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            100% Homestyle Spices
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            10-Credit Flexible Swap
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            14-Day Grace Rollover
          </span>
        </div>
      </div>

    </div>
  );
};
