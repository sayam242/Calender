import React from 'react';
import CalendarView from '../Calendar/CalendarView';

const CalendarScene = () => {
  return (
    <main className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
      
      {/* --- BACKGROUND VIDEO: AMBIENT EFFECT --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse-slow-delay"></div>
        </div>

        {/* 2. Tactical Grid Overlay (Blueprint Feel) */}
        <div 
          className="absolute inset-0 opacity-[0.09]"
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }}
        ></div>

        {/* 3. The "Scanning" Line (Very Subtle) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent absolute top-0 left-0 animate-scanline"></div>
        </div>
        
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.6)_100%)]"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* The Calendar wrapper. 
            We apply the 'animate-float' class defined in your index.css 
        */}
        <div className="transform transition-all duration-500 hover:scale-[1.01] animate-float">
          <CalendarView />
        </div>
      </div>
      
      {/* --- GLOBAL CSS OVERRIDES --- */}
      <style>{`
        /* Force hide any scrollbars on the body to ensure the 'Gallery' feel */
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #0f172a;
        }

        /* Responsive adjustments for the floating animation */
        @media (max-width: 768px) {
          .animate-float {
            animation: mobileFloat 4s ease-in-out infinite;
          }
        }

        @keyframes mobileFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </main>
  );
};

export default CalendarScene;