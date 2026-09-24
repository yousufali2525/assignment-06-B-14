import React from 'react';
import { CheckCircle2,AlertTriangle,Info, X } from 'lucide-react';
import { useWorkout } from '../../context/WorkoutContext'
export const Toast: React.FC= () => {
  const { activeToast, hideToast }= useWorkout();
  if (!activeToast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-3 bg-[#14181b]/95 border border-[#2b3338] text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md max-w-md animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="shrink-0">{activeToast.type === 'success' && (
          <div className="w-7 h-7 rounded-full bg-[#ccff00]/15 flex items-center justify-center text-[#ccff00]">
            <CheckCircle2 className="w-4 h-4" /></div>
        )}
        {activeToast.type === 'warning' && (
          <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-4 h-4" /></div>
        )}
        {activeToast.type === 'info' && (
        <div className="w-7 h-7 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400">
            <Info className="w-4 h-4" /></div>)}
      </div>
      <p className="text-xs sm:text-sm font-medium text-neutral-100 flex-1 leading-snug">{activeToast.message}</p>
      <button
        onClick={hideToast}
        aria-label="Close notification"
        className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4" />
      </button>
    </div>
  );
};