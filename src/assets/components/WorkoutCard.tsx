import React, { useState } from 'react';
import { Clock, Flame, Star, Dumbbell, Check } from 'lucide-react';
import { Workout } from '../../types/workout';
import { useWorkout } from '../../context/WorkoutContext';
interface WorkoutCardProps {
  workout: Workout;
  onSelect: (id: number) => void;
}
export const WorkoutCard: React.FC<WorkoutCardProps> = ({workout,onSelect,}) => {
const [imgError, setImgError] = useState(false);
const { isPlanned, isSaved } = useWorkout();
const inPlan = isPlanned(workout.id);
const inSaved = isSaved(workout.id);
  return (
    <div
      onClick={() => onSelect(workout.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key ==='Enter'||e.key ===' ') {
          e.preventDefault();
          onSelect(workout.id);
        }
      }}
      className="group flex flex-col bg-[#14171b] hover:bg-[#181c21] border border-[#1e242a] hover:border-[#2f3842] rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer text-left">
      <div className="relative aspect-4/3 w-full bg-[#181d22] overflow-hidden">
      {!imgError ? (
        <img
            src={workout.image || '/workout-card.jpg'}
            alt={workout.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (!e.currentTarget.src.endsWith('/workout-card.jpg')) {e.currentTarget.src = '/workout-card.jpg';
              } 
              else {
                setImgError(true);
              }
            }}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"/>
          ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#14171b] text-neutral-500 p-4">
            <Dumbbell className="w-12 h-12 text-[#ccff00]/40 mb-2" />
            <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">{workout.muscleGroups.join('·')}</span></div>)}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">{inPlan && (
            <span className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md"><Check className="w-3 h-3 stroke-[3]" />Plan</span>)}{inSaved && !inPlan && (
          <span className="bg-[#1b2228]/90 backdrop-blur-sm border border-[#3b4750] text-[#e0e7ec] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md">Saved</span>)}
        </div>
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">{workout.muscleGroups.map((group) => (
          <span key={group}className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ccff00] text-black">{group}</span>))}
          </div>
          <h3 className="font-display text-lg font-bold tracking-wide uppercase text-white group-hover:text-[#ccff00] transition-colors leading-snug mb-1 line-clamp-1">{workout.name}</h3>
          <p className="text-xs text-neutral-400 font-normal mb-4 line-clamp-1">{workout.equipment}</p>
        </div>
        <div className="pt-3 border-t border-[#1e242a] flex items-center gap-4 text-xs text-neutral-400">         
          <div className="flex items-center gap-1.5"title="Duration">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span className="tabular-nums">{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5"title="Calories">
            <Flame className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400" />
            <span className="tabular-nums">{workout.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1.5"title="Rating">
            <Star className="w-3.5 h-3.5 text-neutral-400" />
            <span className="tabular-nums">{workout.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};