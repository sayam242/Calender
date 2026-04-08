import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import NotesSidebar from '../Modal/NotesSidebar'; 

const DesktopView = ({ calendarProps, dashboardProps }) => {
  const { currentDate, theme, prevMonth, nextMonth, ...gridProps } = calendarProps;
  
  // Destructure text properties for the new inline Memos section
  const { activeDate, text, setText, thought } = dashboardProps;

  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full relative">
      
      {/* 1. MAIN GEOMETRIC BODY 
          FIX: Height is now variable (85vh with a min of 620px) to perfectly fit laptop screens 
      */}
      <div 
        className="w-[min(650px,90vw)] h-[85vh] min-h-[620px] xl:h-[min(820px,85vh)] flex flex-col relative transition-all duration-500 z-10 shadow-2xl zig-zag-edges"
        style={{ 
          backgroundColor: '#f8fafc',
          borderTop: `6px solid ${theme.primaryHex}`,
          borderBottom: `6px solid ${theme.primaryHex}`
        }}
      >
        {/* SVG Pattern Layer */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.30]"
          style={{ 
            backgroundImage: "url('/background.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply'
          }}
        ></div>

        {/* Theme Aurora Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ 
            background: `radial-gradient(circle at 70% 20%, ${theme.primaryHex}50, transparent 500%)` 
          }}
        ></div>

        {/* --- RESTRUCTURED CONTENT AREA --- */}
        <div className="w-full flex-1 flex flex-col px-[6%] pb-[4%] min-h-0 relative z-10">
          
          {/* Top Row: Calendar (Left) & Sidebar (Right) */}
          <div className="w-full flex-1 flex flex-row items-stretch gap-[5%] min-h-0">
            
            {/* Calendar Column 
                FIX: Scaled down top padding for laptops, original padding for xl monitors 
            */}
            <div className="w-[55%] flex flex-col min-h-0 pt-[140px] xl:pt-[200px] transition-all">
              <div className="flex-1 min-h-0">
                <CalendarGrid currentDate={currentDate} theme={theme} {...gridProps} />
              </div>
            </div>

            {/* Vertical Divider */}
            <div 
              className="w-[1px] flex-shrink-0 mt-[80px] xl:mt-[120px] mb-2 transition-all" 
              style={{ background: `linear-gradient(to bottom, transparent, ${theme.primaryHex}40, transparent)` }}
            ></div>

            {/* Notes Sidebar Column (Tasks & Jump to Date) */}
            <div className="w-[45%] flex flex-col min-h-0 pt-[80px] xl:pt-[120px] transition-all">
              <NotesSidebar {...dashboardProps} />
            </div>
          </div>

          {/* Bottom Row: Full-Width Memos Section 
              FIX: Scaled down height for laptops 
          */}
          <div 
            className="w-full flex-shrink-0 flex flex-col h-[120px] xl:h-[150px] mt-4 pt-4 border-t relative z-10 transition-all"
            style={{ borderTopColor: `${theme.primaryHex}30` }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.primaryHex}20` }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryHex }}></div>
                </div>
                Daily Memos
              </h3>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {activeDate ? format(activeDate, 'MMMM do, yyyy') : ''}
              </span>
            </div>
            
            <div 
              className="flex-1 overflow-y-auto custom-memo-scroll border rounded-lg p-3 bg-white/60 focus-within:bg-white transition-colors shadow-inner"
              style={{ borderColor: `${theme.primaryHex}30` }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your thoughts for the day..."
                className="w-full h-full resize-none bg-transparent text-[13px] text-slate-800 focus:outline-none placeholder:text-slate-500 font-[500] leading-relaxed block"
                style={{
                  lineHeight: `24px`,
                  backgroundImage: `linear-gradient(transparent, transparent 23px, ${theme.primaryHex}30 23px)`,
                  backgroundSize: `100% 24px`,
                  backgroundAttachment: 'local'
                }}
              />
            </div>
          </div>
          {/* --- END RESTRUCTURED CONTENT --- */}

        </div>
      </div>

      {/* 2. EXTREME TOP-LEFT SHARD 
          FIX: Made Shard width and height scale with viewport to prevent overlapping 
      */}
      <div 
        className="absolute z-20 top-[4%] left-[2%] w-[260px] xl:w-[300px] h-[130px] xl:h-[160px] blur-2xl opacity-30 transition-all duration-1000"
        style={{ 
          backgroundColor: theme.primaryHex,
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 85%)'
        }}
      ></div>

      <div 
        className="absolute z-30 top-[2%] left-[0%] w-[min(300px,45vw)] xl:w-[min(340px,45vw)] h-[130px] xl:h-[160px] p-4 xl:p-6 bg-slate-50/90 backdrop-blur-md shadow-2xl flex flex-col justify-end transition-transform duration-500 hover:scale-[1.03]"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0%, 75% 100%, 0% 85%)',
          borderLeft: `8px solid ${theme.primaryHex}`
        }}
      >
        <div className="absolute top-2 left-4 flex items-center justify-center pointer-events-none select-none z-0">
          <span 
            className="text-[5.5rem] xl:text-[7rem] font-serif font-black opacity-[0.04] tracking-tighter transition-all"
            style={{ color: theme.primaryHex }}
          >
            {format(currentDate, 'MM')}
          </span>
        </div>

        <div className="text-slate-800 z-10 relative mb-2 xl:mb-4 transition-all">
          <p className="text-[12px] xl:text-[14px] font-serif font-bold tracking-[0.3em] mb-[-4px] opacity-40">
            {format(currentDate, 'yyyy')}
          </p>
          <h2 className="text-4xl xl:text-5xl font-serif font-black uppercase tracking-tighter leading-none transition-all">
            {format(currentDate, 'MMMM')}
          </h2>
          <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.2em] uppercase mt-1 xl:mt-2 transition-all" style={{ color: theme.primaryHex }}>
            {theme.festival || 'Season'}
          </p>
        </div>
      </div>

      {/* 3. NAVIGATION BUTTONS */}
      <div className="absolute top-[8%] right-[8%] flex gap-2 z-30 group">
        <button onClick={prevMonth} className="w-10 h-10 rounded-none bg-slate-50 hover:bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center transition-all hover:-translate-x-1" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextMonth} className="w-10 h-10 rounded-none bg-slate-50 hover:bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center transition-all hover:translate-x-1" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 4. CUSTOM CSS FOR ZIG-ZAG EDGES */}
      <style>{`
        .zig-zag-edges {
          mask: 
            conic-gradient(from -45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 15px 15px repeat-y,
            conic-gradient(from 135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 15px 15px repeat-y,
            linear-gradient(#000 0 0) center / calc(100% - 30px) 100% no-repeat;
          -webkit-mask: 
            conic-gradient(from -45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 15px 15px repeat-y,
            conic-gradient(from 135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 15px 15px repeat-y,
            linear-gradient(#000 0 0) center / calc(100% - 30px) 100% no-repeat;
        }
        
      `}</style>

    </div>
  );
};

export default DesktopView;