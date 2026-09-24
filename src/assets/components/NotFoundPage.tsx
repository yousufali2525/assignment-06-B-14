import React from 'react';
import { ArrowLeft,Dumbbell,Home }from 'lucide-react';
interface NotFoundPageProps {
  onNavigateHome: () => void;
}
export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-[#121619] border border-[#22282d] p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#171d22] border border-[#27323b] flex items-center justify-center text-[#ccff00] mx-auto mb-6">
          <Dumbbell className="w-8 h-8 stroke-[2]" /></div>
<span className="text-xs font-bold uppercase tracking-widest text-[#ccff00] mb-2 block">404 ERROR // LOST SET</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-3">PAGE NOT FOUND</h1>
        <p className="text-sm text-neutral-400 mb-8 leading-relaxed">The workout or routine you are looking for does not exist in this library or has been moved.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#d8ff33] text-black font-display font-bold text-sm tracking-wider uppercase px-6 py-3 rounded-xl transition-all shadow-md">
            <Home className="w-4 h-4" />
            <span>Return to Workouts</span>
          </button>
          <button
            onClick={()=>window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#171c20] hover:bg-[#1e242a] text-neutral-300 font-semibold text-sm px-5 py-3 rounded-xl border border-[#2b353e] transition-colors">
            <ArrowLeft className="w-4 h-4"/>
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};
