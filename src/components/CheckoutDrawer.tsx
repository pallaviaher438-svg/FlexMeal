import React, { useState } from 'react';
import { UserSelection, Dish, OrderItem } from '../types';
import { 
  X, 
  Check, 
  MapPin, 
  Clock, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Wheat,
  QrCode,
  Banknote
} from 'lucide-react';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selection: UserSelection;
  userCredits: number;
  isSubscriberView?: boolean;
  onOrderSuccess: (order: OrderItem, updatedCredits: number) => void;
  onOpenPaymentGateway?: (amount: number, itemTitle: string) => void;
}

export const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  isOpen,
  onClose,
  selection,
  userCredits,
  isSubscriberView = true,
  onOrderSuccess,
  onOpenPaymentGateway
}) => {
  const [address, setAddress] = useState('Flat 402, Sunshine Residency, Outer Ring Rd, HSR Layout');
  const [paymentMode, setPaymentMode] = useState<'credits' | 'upi' | 'card' | 'cod'>(
    isSubscriberView ? 'credits' : 'upi'
  );
  const [deliverySlot, setDeliverySlot] = useState(
    selection.mealTime === 'breakfast' 
      ? '8:00 AM - 9:00 AM' 
      : selection.mealTime === 'lunch' 
        ? '1:00 PM - 2:00 PM' 
        : '8:00 PM - 9:00 PM'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const isBreakfast = selection.mealTime === 'breakfast';
  let totalCredits = 10; // strictly 10 credits per meal
  let totalPrice = selection.selectedDish.price;

  if (!isBreakfast && selection.includeDalChawal) {
    totalPrice += 30;
  }

  const hasEnoughCredits = userCredits >= totalCredits;

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newCredits = paymentMode === 'credits' ? Math.max(0, userCredits - totalCredits) : userCredits;
      
      const newOrder: OrderItem = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        day: selection.day,
        mealTime: selection.mealTime,
        dishName: selection.selectedDish.name,
        rotiName: selection.selectedRoti?.name,
        rotiCount: isBreakfast ? undefined : selection.rotiCount,
        dalChawal: selection.includeDalChawal,
        creditsDeducted: paymentMode === 'credits' ? totalCredits : 0,
        priceINR: totalPrice,
        status: 'Scheduled',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        onOrderSuccess(newOrder, newCredits);
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      
      <div className="relative bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-200 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-gray-900">
              Confirm & Schedule Meal
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Review details for {selection.day} {selection.mealTime.toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success State */
          <div className="p-8 text-center space-y-4 my-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-gray-900">
              Meal Scheduled Successfully!
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Your freshly prepared {selection.selectedDish.name} has been confirmed for {selection.day}.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {paymentMode === 'credits' ? `10 Credits Deducted (${userCredits - 10} remaining)` : `₹${totalPrice} Paid`}
            </div>
          </div>
        ) : (
          /* Order Form Body */
          <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            {/* Selected Meal Summary Card */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-200 border border-gray-300">
                  <img
                    src={selection.selectedDish.image}
                    alt={selection.selectedDish.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {selection.selectedDish.imageNumber && (
                    <span className="absolute bottom-0 left-0 bg-black/80 text-white text-[9px] font-black px-1.5 rounded-tr">
                      #{selection.selectedDish.imageNumber}
                    </span>
                  )}
                </div>

                <div className="flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/60 px-2 py-0.5 rounded">
                    {selection.day} • {selection.mealTime}
                  </span>
                  <h4 className="font-display font-bold text-sm sm:text-base text-gray-900 mt-1">
                    {selection.selectedDish.name}
                  </h4>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {!isBreakfast && selection.selectedRoti && (
                      <span>{selection.rotiCount}x {selection.selectedRoti.name} (Included)</span>
                    )}
                    {selection.includeDalChawal && (
                      <span className="text-amber-800 font-semibold"> • +Dal & Rice</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {paymentMode === 'credits' ? (
                    <div>
                      <span className="font-display font-extrabold text-base text-[#b7102a] block">
                        10 Pts
                      </span>
                      <span className="text-[10px] text-gray-400">Flex Credits</span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-display font-extrabold text-base text-gray-900 block">
                        ₹{totalPrice}
                      </span>
                      <span className="text-[10px] text-gray-400">Walk-in rate</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Delivery Location
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#b7102a]" />
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#b7102a] focus:outline-hidden"
                  placeholder="Enter hostel/flat, street, landmark"
                />
              </div>
            </div>

            {/* Delivery Time Slot */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Preferred Delivery Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySlot(isBreakfast ? '7:30 AM - 8:30 AM' : selection.mealTime === 'lunch' ? '12:30 PM - 1:30 PM' : '7:30 PM - 8:30 PM')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    deliverySlot.includes('7:30') || deliverySlot.includes('12:30')
                      ? 'bg-red-50 border-[#b7102a] text-[#b7102a]'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Early Slot</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliverySlot(isBreakfast ? '8:30 AM - 9:30 AM' : selection.mealTime === 'lunch' ? '1:30 PM - 2:30 PM' : '8:30 PM - 9:30 PM')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                    deliverySlot.includes('8:30') || deliverySlot.includes('1:30')
                      ? 'bg-red-50 border-[#b7102a] text-[#b7102a]'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Regular Slot</span>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Payment Option
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* 1. Use 10 Subscription Credits */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('credits')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMode === 'credits'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500/20'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-black text-xs text-amber-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>10 Credits</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    Wallet: {userCredits} pts
                  </span>
                </button>

                {/* 2. Instant UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('upi')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMode === 'upi'
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                    <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                    <span>UPI / GPay</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    ₹{totalPrice}
                  </span>
                </button>

                {/* 3. Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('cod')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMode === 'cod'
                      ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-600/20'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900">
                    <Banknote className="w-3.5 h-3.5 text-purple-600" />
                    <span>Cash on Del</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    ₹{totalPrice}
                  </span>
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Cooking / Delivery Note (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Less spicy, call on arrival, extra green chillies"
                className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Confirm & Place Order CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmitting || (paymentMode === 'credits' && !hasEnoughCredits)}
                className="w-full py-3.5 px-6 rounded-full text-white font-bold text-sm sm:text-base bg-[#b7102a] hover:bg-[#960d22] flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Scheduling Your Meal...</span>
                ) : (
                  <>
                    <span>Confirm {selection.day} {selection.mealTime.toUpperCase()} Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {paymentMode === 'credits' && !hasEnoughCredits && (
                <p className="text-center text-xs text-amber-800 font-semibold mt-2">
                  Insufficient credits ({userCredits} pts). Top up or choose UPI/Cash.
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Contactless Hygiene Assured • Fresh Home Cooking</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
