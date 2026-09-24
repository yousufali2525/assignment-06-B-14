import React, { useState,useEffect,useMemo } from 'react';
import {Clock,Flame,Star,X,ChevronDown,Check,}from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext';
import { SortField } from '../../types/workout';
interface MyPlanPageProps {
  initialTab?: 'plan' | 'saved';
  onNavigateHome: () => void;
  onSelectWorkout: (id: number) => void;
}
export const MyPlanPage: React.FC<MyPlanPageProps> = ({initialTab = 'plan',onNavigateHome,onSelectWorkout,}) => {
const {plan,saved,loading,planMetrics,removeFromPlan,togglePlanDone,removeFromSaved,} = useWorkout();
const [activeTab, setActiveTab] = useState<'plan' | 'saved'>(initialTab);
const [sortBy, setSortBy] = useState<SortField>('duration');
const [sortOrder] = useState<'asc'|'desc'>('desc');
  useEffect(() => {setActiveTab(initialTab);}, [initialTab]);
const items = activeTab === 'plan' ? plan : saved;
const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
let valA = 0;
let valB = 0;
if (sortBy==='duration') {valA = a.duration;valB = b.duration;} 
else if (sortBy === 'calories') {valA = a.caloriesBurned;valB = b.caloriesBurned;} 
else if (sortBy === 'rating') {valA = a.rating;valB = b.rating;}
      return sortOrder === 'asc' ? valA - valB : valB - valA;});}, [items, sortBy, sortOrder]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 text-left">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-1.5">MY PLAN</h1>
        <p className="text-xs sm:text-sm text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>
      <div className="bg-[#14171b] border border-[#1e242a] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <span className="text-xs text-neutral-400 font-normal block mb-1">Exercises</span>
            <span className="font-display text-4xl sm:text-5xl font-bold text-[#ccff00] tabular-nums">{planMetrics.exercises}</span>
          </div>     
          <div>
            <span className="text-xs text-neutral-400 font-normal block mb-1">Minutes</span>
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tabular-nums">{planMetrics.minutes}</span>
          </div>
          <div>
            <span className="text-xs text-neutral-400 font-normal block mb-1">Calories</span>
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tabular-nums">{planMetrics.calories}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">    
        <div className="flex items-center bg-[#13161a] p-1 rounded-xl border border-[#1e242a] w-fit">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeTab === 'plan'? 'bg-[#1e242b] text-white shadow-sm': 'text-neutral-400 hover:text-white'}`}>Today’s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${activeTab === 'saved'? 'bg-[#1e242b] text-white shadow-sm': 'text-neutral-400 hover:text-white'}`}>Saved</button>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-neutral-400 font-normal">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="appearance-none bg-[#13161a] text-white text-xs font-medium pl-3 pr-8 py-1.5 rounded-lg border border-[#20262d] focus:outline-none focus:border-[#ccff00] cursor-pointer">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
      {loading && (
        <div className="py-20 text-center text-neutral-400">
          <div className="w-8 h-8 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-semibold text-sm">Loading workouts…</p>
        </div>
      )}
      {!loading && sortedItems.length === 0 && (
        <div className="py-20 px-4 text-center rounded-2xl border border-dashed border-[#232a32] bg-[#101316]/50 max-w-2xl mx-auto my-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wider text-white mb-1.5">NOTHING HERE YET</h2>
          <p className="text-xs text-neutral-400 mb-6 max-w-sm mx-auto">Browse the library and add a lift to get today moving.</p>
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#d8ff33] text-black font-display font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-all shadow-md active:scale-95">Go to workouts</button>
        </div>
      )}
      {!loading && sortedItems.length > 0 && (
        <div className="space-y-3">{sortedItems.map((item) => {
const isPlanTab = activeTab === 'plan';
const isCompleted = isPlanTab && 'completed' in item && Boolean(item.completed);
     return (
        <div
          key={item.id}
          className={`bg-[#14171b] border rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 ${isCompleted? 'border-emerald-900/50 bg-[#0f1412]': 'border-[#1e242a] hover:border-[#2b333b]'}`}>             
          <div className="flex items-center gap-4 flex-1 min-w-0">                 
            <div
                onClick={() => onSelectWorkout(item.id)}
              className="relative w-18 h-18 rounded-xl overflow-hidden bg-[#181d22] shrink-0 border border-[#232b31] cursor-pointer group">
              <img
                src={item.image || '/workout-card.jpg'}
                alt={item.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
      if (!e.currentTarget.src.endsWith('/workout-card.jpg')) {e.currentTarget.src = '/workout-card.jpg';}                  
    }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"/>
                  </div>                
                  <div className="flex-1 min-w-0">
                    <h3
                      onClick={() => onSelectWorkout(item.id)}
                      className={`font-display text-base sm:text-lg font-bold uppercase tracking-wide cursor-pointer transition-colors truncate ${isCompleted? 'text-neutral-400 line-through': 'text-white hover:text-[#ccff00]'}`}>{item.name}</h3>
                    <p className="text-xs text-neutral-400 font-normal mb-2 truncate">{item.equipment}</p>
                    <div className="flex items-center gap-3.5 text-xs text-neutral-400">
                      <div className="flex items-center gap-1.5" title="Duration">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="tabular-nums">{item.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Calories Burned">
                        <Flame className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400" />
                        <span className="tabular-nums">{item.caloriesBurned} kcal</span>
                      </div>
                      <div className="flex items-center gap-1.5" title="Rating">
                        <Star className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="tabular-nums">{item.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#1c2227] justify-end">
                  <button
                    onClick={() => onSelectWorkout(item.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#14171b] hover:bg-[#1c2126] text-white border border-[#2b353e] hover:border-neutral-400 transition-colors">View Details</button>
                  {isPlanTab && (
                    <button
                      onClick={() => togglePlanDone(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${isCompleted? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40': 'bg-[#ccff00] hover:bg-[#d8ff33] text-black font-semibold shadow-sm'}`}>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isCompleted ? 'Done' : 'Mark as Done'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (isPlanTab) {
                        removeFromPlan(item.id);
                      } else {
                        removeFromSaved(item.id);
                      }
                    }}
                    title="Remove"
                    aria-label={`Remove ${item.name}`}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
