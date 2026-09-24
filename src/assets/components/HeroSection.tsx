import React from 'react';
import bannerImage from'../images/banner.png';
export const HeroSection:React.FC=()=> {
const handleScrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
e.preventDefault();
const element= document.getElementById('library');
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#14171b] border border-[#1e242a] p-8 sm:p-12 lg:p-14 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#ccff00] mb-4 block">WORKOUT LIBRARY</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-none mb-5">TRAIN WITH INTENT. LOG<span className="block mt-1">EVERY SET.</span></h1>
              <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed mb-8 font-normal">FitLog is a dark, no-nonsense gym companion: pick a lift,lock it into today&apos;s plan, and watch the week&apos;s workadd up.</p>
              <a href="#library"
                onClick={handleScrollToLibrary}
                className="inline-flex items-center justify-center bg-[#ccff00] hover:bg-[#d8ff33] text-black font-display text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg shadow-md transition-all duration-200 active:scale-95">BROWSE WORKOUTS</a>
            </div>         
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-square flex items-center justify-center">
                <img
                  src={bannerImage}
                  alt="FitLog Training Illustration"
                  className="w-full h-full object-contain max-h-[380px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};