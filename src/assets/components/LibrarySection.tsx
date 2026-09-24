import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Workout } from '../../types/workout';
import { WorkoutCard } from './WorkoutCard';
interface LibrarySectionProps {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  onSelectWorkout: (id: number) => void;
}
export const LibrarySection: React.FC<LibrarySectionProps> = ({workouts,loading,error,onSelectWorkout,}) => {
  
  return (
    <section id="library" className="py-10 sm:py-14 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">THE LIBRARY</h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">Twelve lifts covering every major muscle group.</p>
        </div>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#14171b] border border-[#1e242a] rounded-2xl h-80 flex flex-col p-4 justify-between">
                <div className="w-full aspect-4/3 bg-[#1c2227] rounded-xl" />
                <div className="space-y-2 mt-4">
                  <div className="w-16 h-4 bg-[#1c2227] rounded-full" />
                  <div className="w-3/4 h-5 bg-[#1c2227] rounded" />
                  <div className="w-1/2 h-3 bg-[#1c2227] rounded" /></div>
                <div className="pt-3 border-t border-[#1c2227] flex justify-between">
                  <div className="w-12 h-3 bg-[#1c2227] rounded" />
                  <div className="w-12 h-3 bg-[#1c2227] rounded" />
                  <div className="w-8 h-3 bg-[#1c2227] rounded" /></div>
              </div>
            ))}
          </div>
        )}
        {error && !loading && (
          <div className="p-8 rounded-2xl bg-[#171314] border border-red-900/40 text-center max-w-lg mx-auto my-8">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Failed to load workouts</h3>
            <p className="text-xs text-neutral-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ccff00] text-black font-bold text-xs uppercase hover:bg-[#d8ff33] transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        )}
        {!loading && !error && workouts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onSelect={onSelectWorkout}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
