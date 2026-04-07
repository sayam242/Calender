import React from 'react';
import CalendarView from '../Calendar/CalendarView';

const CalendarScene = () => {
  return (
    <main className="relative min-h-screen w-full flex items-start justify-center overflow-hidden bg-slate-900">
      
      {/* --- BACKGROUND VIDEO: FLOWERS --- */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 contrast-125">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-small-flowers-in-the-wind-4286-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>

      {/* --- THE HANGER: TRIANGULAR STRING --- */}
      <div className="relative z-10 flex flex-col items-center mt-10">
        <svg width="600" height="80" viewBox="0 0 600 80" className="drop-shadow-2xl">
          <circle cx="300" cy="10" r="4" fill="#1e293b" />
          <path d="M300 10 L40 80 M300 10 L560 80" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 3" />
        </svg>

        <div className="-mt-1">
          <CalendarView />
        </div>
      </div>
      
    </main>
  );
};

export default CalendarScene;