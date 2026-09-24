import React from'react';
import logo from'../images/logo.png';
export const Footer:React.FC = () => {
  return (
    <footer className="w-full bg-[#08090a] border-t border-[#191f24] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#14191d] border border-[#232b31] flex items-center justify-center p-1">
            <img
              src={logo}
              alt="FitLog Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(204,255,0,0.5)]"/>
          </div> 
          <span className="font-display text-xl font-bold tracking-wider text-white">FITLOG</span>
    </div>
        <div className="text-xs sm:text-sm text-neutral-400 text-center sm:text-right">© 2026 FitLog — Workout Library. Train hard, log honest.</div>
      </div>
    </footer>
  );
};