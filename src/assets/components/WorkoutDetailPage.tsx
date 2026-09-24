import React, { useEffect, useState } from 'react';
import {CalendarCheck,Bookmark,ArrowLeft,Check,Dumbbell,} from 'lucide-react';
import { Workout } from '../../types/workout';
import { useWorkout } from '../../context/WorkoutContext';
interface WorkoutDetailPageProps {
  workoutId: number;
  onBack: () => void;
  onNavigateToPlan: () => void;
}
export const WorkoutDetailPage: React.FC<WorkoutDetailPageProps> = ({workoutId,onBack,}) => {
const { getWorkoutById, addToPlan, addToSaved, isPlanned, isSaved } =useWorkout();
const [workout, setWorkout] = useState<Workout | null>(null);
const [loading, setLoading] = useState(true);
const [imgError, setImgError] = useState(false);
  useEffect(() => {
    let isMounted = true;
async function loadWorkout() {
      setLoading(true);
const data = await getWorkoutById(workoutId);
      if (isMounted) {
        setWorkout(data||null);
        setLoading(false);
      }
    }
    loadWorkout();
    return () => {isMounted = false;
    };
  }, 
  [workoutId,getWorkoutById]);
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-10 h-10 border-2 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-400 font-semibold text-sm">Loading workout details…</p>
      </div>
    );
  }
  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display text-2xl font-bold uppercase text-white mb-2">Workout Not Found</h2>
        <p className="text-sm text-neutral-400 mb-6">We couldn&apos;t locate this exercise in the FitLog database.</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-display font-bold text-sm uppercase px-5 py-2.5 rounded-xl hover:bg-[#d8ff33] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workouts</span>
        </button>
      </div>
    );
  }
const inPlan = isPlanned(workout.id);
const inSaved = isSaved(workout.id);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-[#ccff00] transition-colors mb-6 group">
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to Workouts</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-[#1e242a] bg-[#14171b] shadow-2xl relative aspect-square flex items-center justify-center p-2">
            <img
              src={workout.image||'/workout-card.jpg'}
              alt={workout.name}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover rounded-2xl ${imgError ? 'hidden' : 'block'}`}
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('/workout-card.jpg')){e.currentTarget.src ='/workout-card.jpg';
                } 
                else {
                  setImgError(true);
                }
              }}/>
            {imgError && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Dumbbell className="w-16 h-16 text-[#ccff00]/40 mb-3" />
                <span className="font-display text-xl font-bold uppercase text-white">{workout.name}</span>
                <span className="text-xs text-neutral-400 mt-1">{workout.equipment}</span></div> )}
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-2.5">{workout.name}</h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-4">{workout.description}</p>
            <div className="flex flex-wrap items-center gap-2">{workout.muscleGroups.map((group) => (
                <span key={group}className="px-3 py-0.5 rounded-full bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider">{group}</span>))}
            </div>
          </div>
          <div className="bg-[#14171b] border border-[#1e242a] rounded-2xl overflow-hidden divide-y divide-[#1e242a]">
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">EQUIPMENT</span>
              <span className="text-xs font-medium text-white text-right">{workout.equipment}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">DIFFICULTY</span>
              <span className="text-xs font-medium text-white text-right">{workout.difficulty}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">SETS</span>
              <span className="text-xs font-medium text-white text-right tabular-nums">{workout.sets}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">REPS</span>
              <span className="text-xs font-medium text-white text-right tabular-nums">{workout.reps}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">DURATION</span>
              <span className="text-xs font-medium text-white text-right tabular-nums">{workout.duration} min</span>
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">CALORIES</span>
              <span className="text-xs font-medium text-white text-right tabular-nums">{workout.caloriesBurned} kcal</span></div>
            <div className="flex items-center justify-between px-5 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">RATING</span>
              <span className="text-xs font-medium text-white text-right tabular-nums">{workout.rating.toFixed(1)}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">INSTRUCTIONS</h3>
            <ol className="space-y-2">{workout.instructions.map((step, idx) => (
                <li key={idx}className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <span className="font-semibold text-neutral-400 shrink-0">{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className={`flex-1 flex items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-wider py-3 px-5 rounded-lg transition-all duration-200 shadow-md ${inPlan? 'bg-[#1b2226] text-[#ccff00] border border-[#ccff00]/40': 'bg-[#ccff00] hover:bg-[#d8ff33] text-black'}`}>{inPlan ? (<><Check className="w-4 h-4 stroke-[2.5]" />
              <span>Added to Today&apos;s Plan</span></>) : (<>
                  <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to today&apos;s plan</span></>)}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className={`flex-1 sm:flex-initial sm:min-w-[160px] flex items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-wider py-3 px-5 rounded-lg border transition-all duration-200 ${inSaved? 'bg-[#161d22] text-[#ccff00] border-[#384854]': 'bg-[#14171b] hover:bg-[#1a1e24] text-neutral-200 border-[#262f36] hover:border-neutral-500'}`}>
              <Bookmark className={`w-4 h-4 ${inSaved?'fill-[#ccff00]':''}`}/>
              <span>{inSaved?'Saved':'Save for later'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};