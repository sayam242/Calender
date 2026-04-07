// src/components/Header/CalendarHeader.jsx
import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentDate, nextMonth, prevMonth, theme }) => {
  return (
    <header className="relative w-full p-6 flex flex-col md:flex-row items-baseline gap-4">
      {/* Title / Year from image_2.png */}
      <div className="flex-1">
        <h2 className="text-lg md:text-xl font-medium tracking-tight text-slate-600">
          {format(currentDate, 'yyyy')}
        </h2>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-slate-800">
          {format(currentDate, 'MMMM')}
        </h1>
      </div>
      
      {/* Glassmorphism Navigation from Maharaja is retained, they look good. */}
      <div className="flex gap-2.5 self-center">
        <button 
          onClick={prevMonth} 
          className="p-3 rounded-full hover:bg-slate-200 backdrop-blur-md text-slate-600 transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextMonth} 
          className="p-3 rounded-full hover:bg-slate-200 backdrop-blur-md text-slate-600 transition-all active:scale-95"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
    </header>
  );
};

export default CalendarHeader;