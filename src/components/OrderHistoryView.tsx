import React from 'react';
import { OrderItem } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  AlertCircle, 
  ArrowRight, 
  Utensils, 
  PauseCircle,
  RotateCcw
} from 'lucide-react';

interface OrderHistoryViewProps {
  orders: OrderItem[];
  onBackToMenu: () => void;
  onCancelOrder: (id: string) => void;
}

export const OrderHistoryView: React.FC<OrderHistoryViewProps> = ({
  orders,
  onBackToMenu,
  onCancelOrder
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            My Meal Schedule & Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Track, pause, or reschedule your upcoming kitchen dispatches.
          </p>
        </div>

        <button
          onClick={onBackToMenu}
          className="self-start sm:self-center flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#b7102a] bg-red-50 hover:bg-red-100 border border-red-200 px-4 py-2 rounded-full transition-colors"
        >
          <Utensils className="w-4 h-4" />
          Schedule More Meals
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center space-y-4 border border-gray-200">
          <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-gray-800">
            No Scheduled Meals Yet
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Browse today's rotational menu or pick from the 7-day timetable to schedule your first hot homestyle meal!
          </p>
          <button
            onClick={onBackToMenu}
            className="bg-[#b7102a] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-sm hover:bg-[#960d22] transition-colors"
          >
            Explore Menu Now
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-gray-300"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-[#b7102a] border border-red-200 px-2 py-0.5 rounded-md">
                    {order.day} • {order.mealTime.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    Order #{order.id}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-gray-900">
                  {order.dishName}
                </h3>

                <div className="text-xs text-gray-600 flex flex-wrap items-center gap-2">
                  {order.rotiName && (
                    <span>{order.rotiCount}x {order.rotiName}</span>
                  )}
                  {order.dalChawal && (
                    <span>• Dal Tadka & Jeera Rice</span>
                  )}
                  <span>• {order.date}</span>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-gray-500 font-semibold">
                  {order.creditsDeducted > 0 ? (
                    <span className="text-[#b7102a] font-bold">-{order.creditsDeducted} Flex Credits</span>
                  ) : (
                    <span>₹{order.priceINR} Paid</span>
                  )}
                </div>

                <button
                  onClick={() => onCancelOrder(order.id)}
                  className="text-xs text-gray-400 hover:text-red-600 font-medium hover:underline"
                >
                  Cancel / Skip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flexible Scheduling Notice */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">100% Flex Cancellation Rule:</span>
          <span>
            You can skip or reschedule any meal up to 90 minutes before kitchen dispatch. Credits are instantly refunded to your active balance without any penalty.
          </span>
        </div>
      </div>

    </div>
  );
};
