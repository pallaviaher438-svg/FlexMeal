import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Receipt,
  Clock,
  Zap,
  Banknote
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  itemTitle: string;
  itemDescription?: string;
  creditsPurchased?: number;
  onPaymentSuccess: (creditsAdded: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  itemTitle,
  itemDescription,
  creditsPurchased = 0,
  onPaymentSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'gpay' | 'phonepe' | 'cod'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen) return null;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(creditsPurchased);
        setIsSuccess(false);
        onClose();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#164e3f] to-[#0f382d] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <CreditCard className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl">
                Secure Payment Gateway
              </h3>
              <p className="text-xs text-emerald-200 font-medium">
                100% 256-Bit SSL Encrypted Transaction
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Payment Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-2xl font-black text-gray-900">
                Payment Successful!
              </h4>
              <p className="text-sm text-gray-600">
                ₹{amount} received securely.
              </p>
              {creditsPurchased > 0 && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{creditsPurchased} Flex Credits credited to your wallet!</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Payment Checkout Form */
          <div className="p-5 sm:p-6 space-y-5">
            
            {/* Order Summary Box */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  Payment For
                </span>
                <span className="font-extrabold text-sm sm:text-base text-gray-900 block">
                  {itemTitle}
                </span>
                {itemDescription && (
                  <span className="text-xs text-gray-500 block mt-0.5">
                    {itemDescription}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Total Due</span>
                <span className="font-display text-2xl sm:text-3xl font-black text-[#164e3f]">
                  ₹{amount}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-gray-500 mb-2.5">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold">UPI QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gpay')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'gpay'
                      ? 'bg-blue-50 border-blue-600 text-blue-950 ring-2 ring-blue-600/20'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold">GPay / PhonePe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-purple-50 border-purple-600 text-purple-950 ring-2 ring-purple-600/20'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-bold">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-50 border-amber-600 text-amber-950 ring-2 ring-amber-600/20'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-600" />
                  <span className="text-xs font-bold">Cash On Del</span>
                </button>

              </div>
            </div>

            {/* Dynamic Payment Method Fields */}
            {paymentMethod === 'upi' && (
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 text-center space-y-3">
                <div className="w-36 h-36 bg-white p-2 mx-auto rounded-xl border border-gray-300 shadow-xs flex flex-col items-center justify-center">
                  <div className="grid grid-cols-4 gap-1 p-2 bg-gray-900 rounded-lg">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-xs ${i % 3 === 0 ? 'bg-amber-400' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-semibold">
                  Scan with any UPI app (GPay, PhonePe, Paytm, BHIM)
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="or enter UPI ID (e.g. name@okhdfcbank)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'gpay' && (
              <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <label className="block text-xs font-bold text-gray-700">Enter UPI Mobile or ID</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210 or user@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-gray-300 bg-white"
                />
                <span className="text-[11px] text-gray-500 block">
                  A payment request of ₹{amount} will be sent to your app.
                </span>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-3 bg-purple-50/40 p-4 rounded-2xl border border-purple-100">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8892"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-gray-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                <span className="font-extrabold block">Pay on Delivery:</span>
                <span>You can pay ₹{amount} via cash or UPI scan directly to our delivery executive when your meal arrives.</span>
              </div>
            )}

            {/* Pay Button */}
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl text-white font-black text-sm sm:text-base bg-[#164e3f] hover:bg-[#0f382d] flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing ₹{amount}...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span>Pay ₹{amount} Securely</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Merchant • Instant Refund Protection</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
