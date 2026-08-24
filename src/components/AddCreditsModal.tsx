import React, { useState } from 'react';
import { X, Sparkles, Check, CreditCard, ShieldCheck } from 'lucide-react';

interface AddCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCreditsSuccess: (addedAmount: number) => void;
}

const CREDIT_PACKAGES = [
  { credits: 300, price: 1999, label: 'Starter Pack', bonus: '0 Bonus' },
  { credits: 600, price: 3899, label: 'Pro Pack', bonus: '+25 Bonus Pts', isPopular: true },
  { credits: 900, price: 5799, label: 'Full Monthly Tier', bonus: '+60 Bonus Pts + 14d Rollover', isBestValue: true },
  { credits: 1500, price: 8999, label: 'Mega Bundle', bonus: '+150 Bonus Pts' }
];

export const AddCreditsModal: React.FC<AddCreditsModalProps> = ({
  isOpen,
  onClose,
  onAddCreditsSuccess
}) => {
  const [selectedPack, setSelectedPack] = useState(CREDIT_PACKAGES[2]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAddCreditsSuccess(selectedPack.credits);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#FFFDF5] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E9C46A] flex items-center justify-center text-[#3d2700] font-black text-base shadow-xs">
              ★
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">
                Top Up Flex Credits
              </h2>
              <p className="text-xs text-gray-500">
                Credits never expire within active subscription grace period
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Packages List */}
        <div className="p-5 sm:p-6 space-y-3">
          {CREDIT_PACKAGES.map((pkg) => {
            const isSelected = selectedPack.credits === pkg.credits;

            return (
              <div
                key={pkg.credits}
                onClick={() => setSelectedPack(pkg)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-[#b7102a] bg-red-50/30 ring-2 ring-[#b7102a]/20 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-base text-gray-900">
                      {pkg.credits} Credits
                    </span>
                    {pkg.isBestValue && (
                      <span className="text-[10px] font-bold bg-[#E9C46A] text-[#3d2700] px-2 py-0.5 rounded-full">
                        Best Value
                      </span>
                    )}
                    {pkg.isPopular && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 block">
                    {pkg.bonus}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-display font-bold text-lg text-gray-900 block">
                    ₹{pkg.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    ₹{(pkg.price / pkg.credits).toFixed(1)}/pt
                  </span>
                </div>
              </div>
            );
          })}

          <div className="pt-4">
            <button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="w-full bg-[#b7102a] hover:bg-[#960d22] text-white py-3.5 px-6 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {isProcessing ? (
                <span>Adding Credits...</span>
              ) : (
                <>
                  <span>Pay ₹{selectedPack.price.toLocaleString('en-IN')} & Add {selectedPack.credits} Pts</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout via UPI / Cards / Net Banking</span>
          </div>
        </div>

      </div>
    </div>
  );
};
