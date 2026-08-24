import React, { useState } from 'react';
import { OrderItem, UserProfile } from '../types';
import { 
  ChefHat, 
  Flame, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Users, 
  Layers, 
  Search, 
  Filter, 
  Plus, 
  AlertCircle, 
  Calendar,
  Utensils,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  LogOut
} from 'lucide-react';

interface AdminDashboardViewProps {
  currentUser: UserProfile;
  orders: OrderItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderItem['status']) => void;
  onSwitchToCustomerView: () => void;
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  orders,
  onUpdateOrderStatus,
  onSwitchToCustomerView,
  onLogout
}) => {
  const [selectedMealFilter, setSelectedMealFilter] = useState<'all' | 'lunch' | 'dinner' | 'breakfast'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample live orders for the admin pipeline
  const liveAdminOrders = [
    {
      id: 'ORD-841920',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 43210',
      day: 'Monday',
      mealTime: 'lunch',
      dishName: 'Shahi Paneer Kundan (#6)',
      rotiName: 'Multigrain Roti (#4)',
      rotiCount: 3,
      dalChawal: true,
      address: 'Hostel Block B, Room 304, Green Valley Campus',
      status: 'Preparing' as OrderItem['status'],
      slot: '1:00 PM - 1:30 PM',
      type: 'Flex Subscriber'
    },
    {
      id: 'ORD-841921',
      customerName: 'Priya Patel',
      customerPhone: '+91 98234 56789',
      day: 'Monday',
      mealTime: 'lunch',
      dishName: 'Homestyle Handi Mix Veg (#5)',
      rotiName: 'Wheat Roti (#3)',
      rotiCount: 4,
      dalChawal: true,
      address: 'Tower 4, Flat 1102, Sunrise Residency',
      status: 'Scheduled' as OrderItem['status'],
      slot: '1:15 PM - 1:45 PM',
      type: 'Customer (Pay-as-you-go)'
    },
    {
      id: 'ORD-841922',
      customerName: 'Rohan Mehra',
      customerPhone: '+91 98450 67890',
      day: 'Monday',
      mealTime: 'lunch',
      dishName: 'High-Protein Soyabean Masala (#7)',
      rotiName: 'Multigrain Roti (#4)',
      rotiCount: 3,
      dalChawal: false,
      address: 'FinTech Hub, 3rd Floor, Infopark',
      status: 'Out for Delivery' as OrderItem['status'],
      slot: '12:45 PM - 1:15 PM',
      type: 'Flex Subscriber'
    },
    {
      id: 'ORD-841923',
      customerName: 'Ananya Deshmukh',
      customerPhone: '+91 98111 22334',
      day: 'Monday',
      mealTime: 'dinner',
      dishName: 'Kashmiri Dum Aloo (#9)',
      rotiName: 'Wheat Roti (#3)',
      rotiCount: 3,
      dalChawal: true,
      address: 'Block A-12, Green Park Avenue',
      status: 'Scheduled' as OrderItem['status'],
      slot: '8:00 PM - 8:30 PM',
      type: 'Flex Subscriber'
    },
    {
      id: 'ORD-841924',
      customerName: 'Sameer Kulkarni',
      customerPhone: '+91 98999 44556',
      day: 'Monday',
      mealTime: 'dinner',
      dishName: 'Dhaba Style Matar Paneer (#10)',
      rotiName: 'Wheat Roti (#3)',
      rotiCount: 4,
      dalChawal: true,
      address: 'B-601, Marvel Residency',
      status: 'Scheduled' as OrderItem['status'],
      slot: '8:30 PM - 9:00 PM',
      type: 'Customer'
    }
  ];

  const [orderList, setOrderList] = useState(liveAdminOrders);

  const handleStatusChange = (id: string, newStatus: OrderItem['status']) => {
    setOrderList((prev) => 
      prev.map((o) => o.id === id ? { ...o, status: newStatus } : o)
    );
  };

  const filteredOrders = orderList.filter((o) => {
    const matchesMeal = selectedMealFilter === 'all' || o.mealTime === selectedMealFilter;
    const matchesSearch = o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          o.dishName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMeal && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-4">
      
      {/* Top Banner with Kitchen Ops Header & Mode Switch */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <ChefHat className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-extrabold text-gray-900">
                Kitchen Operations & Dispatch
              </h1>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full uppercase">
                Admin Control Room
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Logged in as <strong>{currentUser.name}</strong> • Real-time dispatch pipeline & batch preparation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSwitchToCustomerView}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-bold transition-colors bg-gray-50 hover:bg-gray-100"
          >
            <Utensils className="w-3.5 h-3.5 text-[#164e3f]" />
            Preview Customer Menu
          </button>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-red-600 hover:bg-red-50 border border-red-200 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Real-time Kitchen Prep Counters for Monday/Today */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Lunch Boxes</span>
            <Flame className="w-4 h-4 text-orange-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            142 <span className="text-xs font-semibold text-emerald-600">+18 today</span>
          </div>
          <p className="text-[11px] text-gray-500">Dispatch starts 12:30 PM</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Rotis to Tawa</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            426 <span className="text-xs font-normal text-gray-400">Total</span>
          </div>
          <p className="text-[11px] text-gray-500">310x Wheat (#3) • 116x Multi (#4)</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Sabji Handis</span>
            <Utensils className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            3 <span className="text-xs font-normal text-gray-400">Varieties</span>
          </div>
          <p className="text-[11px] text-gray-500">Paneer (#6), Mix Veg (#5), Soya (#7)</p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold uppercase tracking-wider">Dal Rice Portions</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
            115 <span className="text-xs font-normal text-gray-400">Packs</span>
          </div>
          <p className="text-[11px] text-gray-500">Standard Dal Tadka & Jeera Rice (#8)</p>
        </div>

      </div>

      {/* Live Order Dispatch Management */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-xs space-y-5">
        
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">
              Live Order Dispatch Pipeline
            </h2>
            <p className="text-xs text-gray-500">
              Manage preparation and change status to notify subscribers in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search order or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500 w-44 sm:w-56"
              />
            </div>

            {/* Meal Filter Tabs */}
            <div className="flex items-center p-1 bg-gray-100 rounded-full text-xs font-semibold">
              {(['all', 'lunch', 'dinner'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedMealFilter(tab)}
                  className={`px-3 py-1 rounded-full capitalize transition-colors ${
                    selectedMealFilter === tab
                      ? 'bg-white text-gray-900 shadow-2xs font-bold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl border border-gray-200/90 hover:border-gray-300 transition-all bg-[#fcfdfd] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Order Info */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                    {order.mealTime.toUpperCase()} • {order.slot}
                  </span>
                  <span className="text-xs font-extrabold text-gray-900">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({order.customerPhone})
                  </span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    {order.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                  <span>🍱 {order.dishName}</span>
                  <span>•</span>
                  <span className="text-gray-700">{order.rotiCount}x {order.rotiName}</span>
                  {order.dalChawal && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-700">+ Dal Chawal (#8)</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-gray-500">
                  📍 {order.address}
                </p>
              </div>

              {/* Status Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <span className="text-xs font-bold text-gray-500 mr-1">Status:</span>
                
                {(['Scheduled', 'Preparing', 'Out for Delivery', 'Delivered'] as const).map((st) => {
                  const isActive = order.status === st;
                  return (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(order.id, st)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                        isActive
                          ? st === 'Delivered'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                            : st === 'Out for Delivery'
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : st === 'Preparing'
                            ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                            : 'bg-gray-800 text-white border-gray-800 shadow-2xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {st}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
