import React, { useState } from 'react';
import { 
  Dish, 
  RotiOption, 
  CustomSavedDish, 
  UserProfile 
} from '../types';
import { 
  ROTI_OPTIONS, 
  ALL_MENU_DISHES, 
  STARTER_CUSTOM_DISHES 
} from '../data/mealData';
import { 
  Utensils, 
  Plus, 
  Sparkles, 
  Flame, 
  Wheat, 
  HeartPulse, 
  Check, 
  Trash2, 
  Edit3, 
  Copy, 
  ChefHat, 
  ArrowRight, 
  ShoppingBag, 
  CheckCircle2, 
  Filter, 
  Search, 
  SlidersHorizontal,
  Bookmark,
  Droplet,
  Info
} from 'lucide-react';

interface MyCustomMenuViewProps {
  currentUser: UserProfile | null;
  userCredits: number;
  savedDishes: CustomSavedDish[];
  onSaveDish: (dish: CustomSavedDish) => void;
  onDeleteDish: (dishId: string) => void;
  onOrderCustomDish: (dish: CustomSavedDish) => void;
  isSubscriberView?: boolean;
}

export const MyCustomMenuView: React.FC<MyCustomMenuViewProps> = ({
  currentUser,
  userCredits,
  savedDishes,
  onSaveDish,
  onDeleteDish,
  onOrderCustomDish,
  isSubscriberView = true
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'my_list' | 'builder'>('my_list');
  const [filterDietary, setFilterDietary] = useState<'all' | 'veg' | 'egg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Builder State
  const [builderDish, setBuilderDish] = useState<Dish>(ALL_MENU_DISHES.find(d => d.name === 'Paneer Kundan') || ALL_MENU_DISHES[11]);
  const [builderRoti, setBuilderRoti] = useState<RotiOption | undefined>(ROTI_OPTIONS.multigrain);
  const [builderRotiCount, setBuilderRotiCount] = useState<number>(3);
  const [builderIncludeDalChawal, setBuilderIncludeDalChawal] = useState<boolean>(true);
  const [builderSpiceLevel, setBuilderSpiceLevel] = useState<'mild' | 'medium' | 'spicy' | 'kolhapuri_fiery'>('medium');
  const [builderOilPref, setBuilderOilPref] = useState<'desi_ghee' | 'cold_pressed' | 'low_oil'>('desi_ghee');
  const [builderAddOns, setBuilderAddOns] = useState<string[]>(['Dal Tadka & Basmati Rice']);
  const [builderCustomName, setBuilderCustomName] = useState<string>('');
  const [builderNotes, setBuilderNotes] = useState<string>('');
  const [editingDishId, setEditingDishId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper for available rotis list
  const availableRotiList = Object.values(ROTI_OPTIONS);

  // Available add-ons options
  const ADD_ON_OPTIONS = [
    { id: 'dal_chawal', name: 'Dal Tadka & Basmati Rice', calories: 210, protein: 7, carbs: 42, fats: 4, price: 30 },
    { id: 'boondi_raita', name: 'Fresh Boondi Raita', calories: 95, protein: 4, carbs: 10, fats: 4, price: 20 },
    { id: 'masala_papad', name: 'Roasted Masala Papad & Salad', calories: 45, protein: 2, carbs: 7, fats: 1, price: 15 },
    { id: 'extra_ghee', name: 'Desi Cow Ghee Tadka Dollop', calories: 90, protein: 0, carbs: 0, fats: 10, price: 15 },
    { id: 'gulab_jamun', name: 'Sunday Gulab Jamun (1 pc)', calories: 150, protein: 3, carbs: 24, fats: 5, price: 35 }
  ];

  // Calculate live macros for builder
  const computeBuilderMacros = () => {
    let cal = builderDish.calories;
    let prot = builderDish.protein;
    let carbs = builderDish.carbs;
    let fats = builderDish.fats;
    let price = builderDish.price;

    if (builderRoti) {
      cal += builderRoti.caloriesPerRoti * builderRotiCount;
      prot += builderRoti.proteinPerRoti * builderRotiCount;
      carbs += 16 * builderRotiCount;
      fats += 1 * builderRotiCount;
    }

    builderAddOns.forEach(addonName => {
      const match = ADD_ON_OPTIONS.find(a => a.name === addonName);
      if (match) {
        cal += match.calories;
        prot += match.protein;
        carbs += match.carbs;
        fats += match.fats;
        price += match.price;
      }
    });

    if (builderOilPref === 'low_oil') {
      cal = Math.max(cal - 40, 150);
      fats = Math.max(fats - 5, 2);
    } else if (builderOilPref === 'desi_ghee') {
      cal += 45;
      fats += 5;
    }

    return {
      calories: Math.round(cal),
      protein: Math.round(prot),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      credits: 10, // Standard 10 credits
      priceINR: Math.round(price)
    };
  };

  const currentMacros = computeBuilderMacros();

  // Handle Save Dish
  const handleSaveToMyMenu = (directOrder = false) => {
    const finalName = builderCustomName.trim() || `${builderDish.name} & ${builderRoti ? `${builderRotiCount}x ${builderRoti.name}` : 'Rice Thali'}`;
    
    const newCustomDish: CustomSavedDish = {
      id: editingDishId || `custom-${Date.now()}`,
      name: finalName,
      category: builderDish.category === 'breakfast_item' ? 'breakfast_combo' : 'custom_thali',
      dish: builderDish,
      roti: builderRoti,
      rotiCount: builderRotiCount,
      includeDalChawal: builderAddOns.includes('Dal Tadka & Basmati Rice'),
      spiceLevel: builderSpiceLevel,
      oilPreference: builderOilPref,
      addOns: builderAddOns,
      totalCalories: currentMacros.calories,
      totalProtein: currentMacros.protein,
      totalCarbs: currentMacros.carbs,
      totalFats: currentMacros.fats,
      credits: 10,
      priceINR: currentMacros.priceINR,
      notes: builderNotes,
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      tags: [
        `${currentMacros.protein}g Protein`,
        builderRoti?.name || 'Rice Plate',
        builderSpiceLevel === 'spicy' || builderSpiceLevel === 'kolhapuri_fiery' ? 'Spicy Tadka' : 'Mild & Balanced'
      ]
    };

    onSaveDish(newCustomDish);
    showToast(`✓ "${finalName}" saved to My Menu!`);
    setEditingDishId(null);

    if (directOrder) {
      onOrderCustomDish(newCustomDish);
    } else {
      setActiveSubTab('my_list');
    }
  };

  // Edit existing dish
  const handleEditDish = (dish: CustomSavedDish) => {
    setEditingDishId(dish.id);
    setBuilderDish(dish.dish);
    setBuilderRoti(dish.roti);
    setBuilderRotiCount(dish.rotiCount || 3);
    setBuilderSpiceLevel(dish.spiceLevel || 'medium');
    setBuilderOilPref(dish.oilPreference || 'desi_ghee');
    setBuilderAddOns(dish.addOns || []);
    setBuilderCustomName(dish.name);
    setBuilderNotes(dish.notes || '');
    setActiveSubTab('builder');
  };

  // Duplicate dish
  const handleDuplicateDish = (dish: CustomSavedDish) => {
    const duplicated: CustomSavedDish = {
      ...dish,
      id: `custom-${Date.now()}`,
      name: `${dish.name} (Copy)`,
      createdAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    };
    onSaveDish(duplicated);
    showToast(`✓ Duplicated "${dish.name}"`);
  };

  // Filtered dishes for builder catalog
  const filteredCatalogDishes = ALL_MENU_DISHES.filter(d => {
    if (filterDietary !== 'all' && d.dietary !== filterDietary) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#164e3f] via-[#103b30] to-[#0a2720] rounded-3xl p-6 sm:p-8 text-white shadow-md border border-emerald-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Homestyle Meal Studio</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-white">
              My Menu & Dish Customizer
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Design your tailor-made meal combo with your choice of sabjis, stoneground rotis, spice intensity, cooking oil, and sides. Save it to your personal menu and order anytime with 1-click.
            </p>
          </div>

          {/* Quick Tab Switcher Pill */}
          <div className="flex items-center bg-black/30 p-1.5 rounded-2xl border border-white/15 backdrop-blur-sm self-start md:self-center shrink-0">
            <button
              onClick={() => setActiveSubTab('my_list')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeSubTab === 'my_list'
                  ? 'bg-white text-[#164e3f] shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Menu ({savedDishes.length})</span>
            </button>
            <button
              onClick={() => {
                setEditingDishId(null);
                setActiveSubTab('builder');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                activeSubTab === 'builder'
                  ? 'bg-[#e25c1d] text-white shadow-sm'
                  : 'text-emerald-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{editingDishId ? 'Edit Dish' : 'Build Custom Dish'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MY SAVED MENU LIST */}
      {/* ========================================================================= */}
      {activeSubTab === 'my_list' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#b7102a]" />
                <span>Your Customized Dishes & Combos</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Pre-configured homestyle meals tailored to your taste and nutritional goals.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingDishId(null);
                setActiveSubTab('builder');
              }}
              className="inline-flex items-center gap-2 bg-[#b7102a] hover:bg-[#960d22] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-sm transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Custom Meal</span>
            </button>
          </div>

          {/* Grid of Saved Dishes */}
          {savedDishes.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/90 shadow-sm max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center">
                <ChefHat className="w-8 h-8" />
              </div>
              <h3 className="font-display text-lg font-black text-gray-900">
                No custom dishes saved yet
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Build your first personalized thali with custom rotis, spice level, and sides, or pick one of our signature chef presets below.
              </p>
              <button
                onClick={() => setActiveSubTab('builder')}
                className="bg-[#164e3f] text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-[#103b30] transition-colors"
              >
                Launch Dish Customizer Studio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDishes.map((dish) => (
                <div 
                  key={dish.id}
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col hover:border-gray-300 hover:shadow-md transition-all group"
                >
                  {/* Top Image Banner with Image Number Badge */}
                  <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                    <img 
                      src={dish.dish.image} 
                      alt={dish.dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Image Number & Dietary tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {dish.dish.imageNumber && (
                        <span className="bg-black/80 text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-white/20">
                          #{dish.dish.imageNumber}
                        </span>
                      )}
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        dish.dish.dietary === 'veg' 
                          ? 'bg-emerald-500 text-white' 
                          : dish.dish.dietary === 'egg'
                          ? 'bg-amber-500 text-white'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {dish.dish.dietary === 'veg' ? 'VEG' : dish.dish.dietary === 'egg' ? 'EGG' : 'NON-VEG'}
                      </span>
                    </div>

                    {/* Action buttons (Edit / Duplicate / Delete) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => handleEditDish(dish)}
                        className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Edit Custom Dish"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDuplicateDish(dish)}
                        className="w-7 h-7 rounded-lg bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove "${dish.name}" from My Menu?`)) {
                            onDeleteDish(dish.id);
                            showToast(`Removed "${dish.name}"`);
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Dish Title on Banner */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-display font-black text-base text-white leading-tight drop-shadow-sm">
                        {dish.name}
                      </h3>
                      <p className="text-[11px] text-gray-200 line-clamp-1 mt-0.5">
                        Base: {dish.dish.name}
                      </p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 flex-grow space-y-4 flex flex-col justify-between">
                    
                    {/* Custom Specs Pills */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {dish.roti ? (
                          <span className="bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Wheat className="w-3 h-3 text-amber-700" />
                            {dish.rotiCount}x {dish.roti.name}
                          </span>
                        ) : (
                          <span className="bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded-md">
                            Rice Bowl Only
                          </span>
                        )}

                        <span className={`font-bold px-2 py-0.5 rounded-md border ${
                          dish.spiceLevel === 'kolhapuri_fiery'
                            ? 'bg-red-50 text-red-900 border-red-200'
                            : dish.spiceLevel === 'spicy'
                            ? 'bg-orange-50 text-orange-900 border-orange-200'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        }`}>
                          {dish.spiceLevel === 'kolhapuri_fiery' ? '🔥 Fiery Hot' : dish.spiceLevel === 'spicy' ? '🌶️ Spicy Tadka' : dish.spiceLevel === 'medium' ? '🍲 Medium' : '🥗 Mild'}
                        </span>

                        <span className="bg-gray-100 text-gray-700 border border-gray-200 font-bold px-2 py-0.5 rounded-md">
                          {dish.oilPreference === 'desi_ghee' ? '🧈 Desi Ghee' : dish.oilPreference === 'cold_pressed' ? '🥜 Cold-Pressed' : '🌿 Low Oil'}
                        </span>
                      </div>

                      {/* Add-ons list */}
                      {dish.addOns && dish.addOns.length > 0 && (
                        <div className="text-[11px] text-gray-500 pt-1">
                          <span className="font-semibold text-gray-700">Add-ons: </span>
                          <span>{dish.addOns.join(', ')}</span>
                        </div>
                      )}

                      {dish.notes && (
                        <p className="text-[11px] text-gray-400 italic line-clamp-1 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                          "{dish.notes}"
                        </p>
                      )}
                    </div>

                    {/* Macros Grid */}
                    <div className="grid grid-cols-4 gap-1.5 bg-gray-50/80 p-2.5 rounded-2xl border border-gray-100 text-center">
                      <div>
                        <span className="block text-xs font-black text-gray-900">{dish.totalCalories}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase">KCAL</span>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-emerald-700">{dish.totalProtein}g</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase">PROT</span>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-amber-700">{dish.totalCarbs}g</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase">CARBS</span>
                      </div>
                      <div>
                        <span className="block text-xs font-black text-purple-700">{dish.totalFats}g</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase">FATS</span>
                      </div>
                    </div>

                    {/* Pricing & Order CTA */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <div>
                        {isSubscriberView ? (
                          <>
                            <span className="text-xs font-black text-amber-600 block">
                              10 Credits
                            </span>
                            <span className="text-[10px] text-gray-400">
                              3 Rotis Included Free
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-black text-[#b7102a] block">
                              ₹{dish.priceINR}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              Walk-in Rate
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => onOrderCustomDish(dish)}
                        className="bg-[#164e3f] hover:bg-[#103b30] text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs hover:shadow transition-all group-hover:scale-102"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Select to Order</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Preset Chef Combos to Add with 1 Click */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-lg font-black text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Signature Chef Presets from Weekly Menu</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Click "+ Save to My Menu" to bookmark and customize any of these popular nutritionist combos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {STARTER_CUSTOM_DISHES.map((preset) => (
                <div 
                  key={preset.id}
                  className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/90 flex flex-col justify-between hover:bg-white hover:border-gray-300 transition-all space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img 
                      src={preset.dish.image} 
                      alt={preset.name}
                      className="w-14 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-display font-black text-xs sm:text-sm text-gray-900 line-clamp-1">
                        {preset.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {preset.rotiCount}x {preset.roti?.name} • {preset.totalProtein}g Protein
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200/60">
                    <span className="text-xs font-bold text-emerald-800">
                      {preset.totalCalories} kcal • 10 pts
                    </span>
                    <button
                      onClick={() => {
                        onSaveDish({
                          ...preset,
                          id: `preset-${Date.now()}`
                        });
                        showToast(`✓ Added "${preset.name}" to My Menu!`);
                      }}
                      className="text-xs font-black text-[#164e3f] hover:text-emerald-800 bg-white hover:bg-emerald-50 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to My Menu</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DISH CUSTOMIZER STUDIO / BUILDER */}
      {/* ========================================================================= */}
      {activeSubTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
          
          {/* Left / Main Configuration Steps (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* STEP 1: Select Base Dish / Sabji */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#b7102a] text-white text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                      Select Main Dish or Sabzi
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Choose any homestyle curry, paneer gravy, protein dal, or special from our weekly menu.
                  </p>
                </div>

                {/* Dietary Filter & Search */}
                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
                    <button
                      onClick={() => setFilterDietary('all')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${filterDietary === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterDietary('veg')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${filterDietary === 'veg' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700'}`}
                    >
                      Veg
                    </button>
                    <button
                      onClick={() => setFilterDietary('egg')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${filterDietary === 'egg' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-700'}`}
                    >
                      Egg
                    </button>
                    <button
                      onClick={() => setFilterDietary('non-veg')}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${filterDietary === 'non-veg' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700'}`}
                    >
                      Non-Veg
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dishes (e.g. Palak Paneer, Soyabean Masala, Butter Chicken, Dum Aloo...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#b7102a]/30 focus:border-[#b7102a]"
                />
              </div>

              {/* Dish Selection Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {filteredCatalogDishes.map((dish) => {
                  const isSelected = builderDish.id === dish.id;

                  return (
                    <div
                      key={dish.id}
                      onClick={() => setBuilderDish(dish)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-rose-50/60 border-[#b7102a] ring-2 ring-[#b7102a]/20 shadow-xs'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <img 
                          src={dish.image} 
                          alt={dish.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        {dish.imageNumber && (
                          <span className="absolute bottom-0 left-0 bg-black/80 text-white text-[9px] font-black px-1.5 rounded-tr">
                            #{dish.imageNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs sm:text-sm text-gray-900 truncate">
                            {dish.name}
                          </span>
                          <span className={`w-2 h-2 rounded-full ${
                            dish.dietary === 'veg' ? 'bg-emerald-500' : dish.dietary === 'egg' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                          <span>{dish.calories} kcal</span>
                          <span>•</span>
                          <span className="font-semibold text-emerald-700">{dish.protein}g Prot</span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#b7102a] bg-[#b7102a] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: Choose Roti Type & Quantity */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                      Choose Your Fresh Stoneground Rotis
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    3 Rotis included with meal at 0 extra credits • 100% whole grain flours
                  </p>
                </div>

                {/* Roti Quantity Counter */}
                <div className="flex items-center gap-2 self-start sm:self-center bg-gray-50 p-1.5 rounded-full border border-gray-200">
                  <span className="text-xs font-semibold text-gray-600 pl-2">Quantity:</span>
                  <button
                    onClick={() => setBuilderRotiCount(Math.max(1, builderRotiCount - 1))}
                    disabled={builderRotiCount <= 1}
                    className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-display font-black text-sm text-gray-900">
                    {builderRotiCount}
                  </span>
                  <button
                    onClick={() => setBuilderRotiCount(Math.min(6, builderRotiCount + 1))}
                    disabled={builderRotiCount >= 6}
                    className="w-7 h-7 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Roti Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {availableRotiList.map((roti) => {
                  const isSelected = builderRoti?.id === roti.id;

                  return (
                    <div
                      key={roti.id}
                      onClick={() => setBuilderRoti(roti)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-50/60 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                        <img 
                          src={roti.image} 
                          alt={roti.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="font-extrabold text-xs text-gray-900 block truncate">
                          {roti.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {roti.caloriesPerRoti * builderRotiCount} kcal
                        </span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}

                {/* No Roti / Rice Only option */}
                <div
                  onClick={() => setBuilderRoti(undefined)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    !builderRoti
                      ? 'bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                    Rice Only
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="font-extrabold text-xs text-gray-900 block truncate">
                      No Roti (Rice Bowl)
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Pure Rice / Bowl Meal
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    !builderRoti ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'
                  }`}>
                    {!builderRoti && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Cooking Style, Spice Level & Oil Preference */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                    Spice Level & Cooking Medium
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Tailor heat levels and healthy cooking fats to your dietary preference.
                  </p>
                </div>
              </div>

              {/* Spice Level Radio Cards */}
              <div>
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-2">
                  Desi Spice Intensity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'mild', label: 'Mild & Gentle', desc: 'Jain/Kid friendly, minimal chilli', emoji: '🥗' },
                    { id: 'medium', label: 'Homestyle Medium', desc: 'Balanced roasted spices', emoji: '🍲' },
                    { id: 'spicy', label: 'Desi Spicy Tadka', desc: 'Authentic kick & green chillies', emoji: '🌶️' },
                    { id: 'kolhapuri_fiery', label: 'Kolhapuri Fiery', desc: 'Extra hot roasted masala', emoji: '🔥' },
                  ].map((spice) => {
                    const isSelected = builderSpiceLevel === spice.id;
                    return (
                      <div
                        key={spice.id}
                        onClick={() => setBuilderSpiceLevel(spice.id as any)}
                        className={`p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                          isSelected 
                            ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-base mb-1">{spice.emoji}</div>
                        <span className="font-black text-xs text-gray-900 block">{spice.label}</span>
                        <span className="text-[10px] text-gray-500 block leading-tight mt-0.5">{spice.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Oil / Ghee Preference */}
              <div>
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider block mb-2">
                  Cooking Oil / Ghee Choice
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'desi_ghee', label: 'Pure Desi Cow Ghee', desc: 'Aromatic & traditional (+45 kcal)', tag: 'Authentic Taste' },
                    { id: 'cold_pressed', label: 'Cold-Pressed Groundnut Oil', desc: 'Zero cholesterol, unrefined', tag: 'Heart Friendly' },
                    { id: 'low_oil', label: 'Low-Oil Fitness Prep', desc: 'Minimal oil, diet-friendly (-40 kcal)', tag: 'Diet Light' },
                  ].map((oil) => {
                    const isSelected = builderOilPref === oil.id;
                    return (
                      <div
                        key={oil.id}
                        onClick={() => setBuilderOilPref(oil.id as any)}
                        className={`p-3 rounded-2xl border cursor-pointer text-left transition-all ${
                          isSelected 
                            ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-600/20' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] bg-gray-100 text-gray-700 font-bold px-1.5 py-0.5 rounded">
                            {oil.tag}
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-full border ${isSelected ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'}`} />
                        </div>
                        <span className="font-black text-xs text-gray-900 block">{oil.label}</span>
                        <span className="text-[10px] text-gray-500 block leading-tight mt-0.5">{oil.desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 4: Sides, Dal Chawal & Add-ons */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                    Sides & Add-on Extras
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Complete your thali with daily dal chawal, raita, roasted papad, or Sunday sweets.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ON_OPTIONS.map((addon) => {
                  const isChecked = builderAddOns.includes(addon.name);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => {
                        if (isChecked) {
                          setBuilderAddOns(builderAddOns.filter(a => a !== addon.name));
                        } else {
                          setBuilderAddOns([...builderAddOns, addon.name]);
                        }
                      }}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        isChecked 
                          ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs text-gray-900 block">
                          {addon.name}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {addon.calories} kcal • {addon.protein}g Prot {isSubscriberView ? '• Included in combo' : `• +₹${addon.price}`}
                        </span>
                      </div>

                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 5: Name & Cooking Notes */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
                  5
                </span>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-black text-gray-900">
                    Name Your Custom Dish & Special Instructions
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Give this creation a personal nickname and special notes for our kitchen chef.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Custom Dish Name
                  </label>
                  <input 
                    type="text"
                    placeholder={`e.g. ${currentUser?.name ? currentUser.name.split(' ')[0] + "'s" : 'My'} Protein Thali / Comfort Bajra Bowl`}
                    value={builderCustomName}
                    onChange={(e) => setBuilderCustomName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Chef / Kitchen Instructions
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Please make rotis crisp, use less salt, garnish with extra fresh coriander and ginger juliennes."
                    value={builderNotes}
                    onChange={(e) => setBuilderNotes(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Sticky Summary Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="sticky top-24 space-y-6">
              
              {/* Macro & Live Summary Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-sm space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-[#b7102a]" />
                    <h3 className="font-display font-black text-base text-gray-900">
                      Live Nutrition Estimate
                    </h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Realtime
                  </span>
                </div>

                {/* 4 Macro Rings */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="flex flex-col items-center bg-red-50/60 p-2 rounded-2xl border border-red-100">
                    <span className="font-display font-black text-sm text-[#b7102a]">
                      {currentMacros.calories}
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
                      KCAL
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-emerald-50/60 p-2 rounded-2xl border border-emerald-100">
                    <span className="font-display font-black text-sm text-emerald-700">
                      {currentMacros.protein}g
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
                      PROT
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-amber-50/60 p-2 rounded-2xl border border-amber-100">
                    <span className="font-display font-black text-sm text-amber-700">
                      {currentMacros.carbs}g
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
                      CARBS
                    </span>
                  </div>

                  <div className="flex flex-col items-center bg-purple-50/60 p-2 rounded-2xl border border-purple-100">
                    <span className="font-display font-black text-sm text-purple-700">
                      {currentMacros.fats}g
                    </span>
                    <span className="text-[9px] font-black tracking-wider text-gray-500 uppercase">
                      FATS
                    </span>
                  </div>
                </div>

                {/* Visual Preview Box */}
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Base Sabji:</span>
                    <span className="font-bold text-gray-900">{builderDish.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rotis:</span>
                    <span className="font-bold text-amber-800">
                      {builderRoti ? `${builderRotiCount}x ${builderRoti.name}` : 'Rice Bowl'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Spice:</span>
                    <span className="font-bold text-indigo-800 capitalize">{builderSpiceLevel.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cooking Fat:</span>
                    <span className="font-bold text-emerald-800 capitalize">{builderOilPref.replace('_', ' ')}</span>
                  </div>
                  {builderAddOns.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Add-ons:</span>
                      <span className="font-bold text-gray-900 text-right truncate max-w-[140px]">{builderAddOns.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Price / Credit Breakdown */}
                <div className="pt-2 border-t border-gray-100">
                  {isSubscriberView ? (
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
                          Subscription Deduction
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Wallet Balance: {userCredits} pts
                        </span>
                      </div>
                      <span className="font-display text-2xl font-black text-amber-600">
                        10 Credits
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">
                          Walk-In Rate
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold">
                          Direct Payment
                        </span>
                      </div>
                      <span className="font-display text-2xl font-black text-[#b7102a]">
                        ₹{currentMacros.priceINR}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleSaveToMyMenu(false)}
                    className="w-full bg-white hover:bg-gray-50 text-[#164e3f] border-2 border-[#164e3f] py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:shadow-xs active:scale-98"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Save to My Menu</span>
                  </button>

                  <button
                    onClick={() => handleSaveToMyMenu(true)}
                    className="w-full bg-[#b7102a] hover:bg-[#960d22] text-white py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Save & Order Immediately</span>
                  </button>
                </div>

                <p className="text-center text-[11px] text-gray-400">
                  You can edit or duplicate this meal at any time in the "Saved Menu" tab.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
