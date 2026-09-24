import React from 'react';
import {useWorkout} from'../../context/WorkoutContext';
import logo from'../images/logo.png';
interface NavbarProps{
  currentPath: string;
  onNavigate: (path: string) => void;
}
export const Navbar: React.FC<NavbarProps> = ({currentPath,onNavigate,}) => {
const { plan, saved } = useWorkout();
const isWorkoutActive =currentPath === '/'||currentPath.startsWith('/workout');
const isMyPlanActive = currentPath==='/my-plan';
return (
    <header className="sticky top-0 z-40 w-full bg-[#0e1013]/95 backdrop-blur-md border-b border-[#1b2025]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none rounded-lg"aria-label="FitLog Home">
          <div className="w-7 h-7 flex items-center justify-center shrink-0">
            <img
              src={logo}
              alt="FitLog Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(204,255,0,0.6)]"/>
    </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-[#ccff00] transition-colors">FITLOG</span>
        </button>
        <nav className="flex items-center bg-[#13161a] p-1 rounded-full border border-[#1e242a]">
          <button
            onClick={() => onNavigate('/')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${isWorkoutActive? 'bg-[#1b221d] text-[#ccff00] shadow-sm': 'text-neutral-400 hover:text-white'}`}>Workouts
          </button>
          <button
            onClick={() => onNavigate('/my-plan')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${isMyPlanActive? 'bg-[#1b221d] text-[#ccff00] shadow-sm': 'text-neutral-400 hover:text-white'}`}>My Plan
          </button>
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate('/my-plan')}
            title="View Today's Plan"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer group">
            <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200">Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#ccff00] text-black font-bold text-[11px] flex items-center justify-center tabular-nums shadow-sm group-hover:scale-105 transition-transform">{plan.length}</span>
          </button>
          <button
            onClick={() => onNavigate('/my-plan?tab=saved')}
            title="View Saved Lifts"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer group">
            <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200">Saved</span>
            <span className="w-5 h-5 rounded-full border border-[#354049] text-neutral-300 font-semibold text-[11px] flex items-center justify-center tabular-nums group-hover:border-neutral-400 transition-colors">{saved.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
};