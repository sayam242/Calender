import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, Circle, X, Calendar as CalendarIcon } from 'lucide-react';
import CalendarGrid from './CalendarGrid';

const MobileView = ({ calendarProps, dashboardProps }) => {
  const { currentDate, theme, prevMonth, nextMonth, ...gridProps } = calendarProps;
  
  const { 
    activeDate, text, setText, tasks, toggleTask, deleteTask, 
    newTask, setNewTask, addTask, thought, onDateSelect 
  } = dashboardProps;

  const handleDateChange = (e) => {
    if (e.target.value && onDateSelect) {
      const [year, month, day] = e.target.value.split('-');
      const newDate = new Date(year, month - 1, day);
      onDateSelect(newDate);
    }
  };

  return (
    /* Outer container safely handles 100dvh and prevents page scroll */
    <div className="flex lg:hidden flex-col items-center justify-center w-full h-[100dvh] relative bg-slate-900/5 overflow-hidden p-2">
      
      

      {/* MAIN WRAPPER: Limits width on tablets/landscape, acts as anchor for absolute positioning.
        This keeps the shard and paper locked together perfectly.
      */}
      <div className="w-full max-w-[420px] relative flex flex-col h-full z-10 py-1">

              {/* --- WALL HANGING HARDWARE --- */}
      <div className="flex flex-col items-center w-full mb-[-12px] z-30 pointer-events-none">
        {/* The Wall Hook */}
        <div className="w-2 h-2 rounded-full border-2 border-slate-400 bg-slate-800 shadow-lg relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-slate-900 rounded-full"></div>
        </div>
        
        {/* The Hanging Cord/Hanger */}
        <div className="w-6 h-3 border-t-2 border-l-2 border-r-2 border-slate-400 rounded-t-full mb-[-4px]"></div>

        {/* Spiral Binding Wire */}
        <div className="flex gap-0.5 px-2 py-1 bg-slate-800 rounded-full shadow-md z-40 border border-slate-700">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-0.5 h-2 bg-gradient-to-b from-slate-600 via-slate-400 to-slate-700 rounded-full border border-slate-900/20"></div>
          ))}
        </div>
      </div>
      {/* --- END WALL HANGING HARDWARE --- */}

        {/* ===== 1. MAIN PAPER BODY (Zig-Zag removed to fix padding) ===== */}
        <div 
          className="w-full h-full flex flex-col relative z-10 shadow-2xl"
          style={{ 
            backgroundColor: '#f8fafc',
            borderTop: `5px solid ${theme.primaryHex}`,
            borderBottom: `5px solid ${theme.primaryHex}`
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
              background: `radial-gradient(circle at top left, ${theme.primaryHex}50, transparent 60%)` 
            }}
          ></div>

          {/* Content Wrapper 
            pt-[110px] pushes the content down safely below the overlapping shard
          */}
          <div className="relative z-10 w-full h-full flex flex-col px-3 pb-3 pt-[110px] gap-2 min-h-0">

            {/* ===== 2. DAILY SPARK ===== */}
            <div 
              className="w-full p-2.5 rounded-lg border shadow-sm flex-shrink-0"
              style={{ 
                backgroundColor: `${theme.primaryHex}08`,
                borderColor: `${theme.primaryHex}20`
              }}
            >
              <div className="flex items-center gap-2 mb-1.5" style={{ color: theme.primaryHex }}>
                <Sparkles size={14} className="flex-shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest">Daily Spark</span>
              </div>
              <p className="text-[11px] italic text-slate-700 font-medium leading-tight truncate">"{thought}"</p>
            </div>

            {/* ===== 3. JUMP TO DATE & TASKS ===== */}
            <div className="flex flex-row gap-2 flex-shrink max-h-[60px]">
              {/* Jump to Date */}
                <label className="text-[10px] p-5 font-black uppercase tracking-widest text-slate-500 mb-1 block">
                    Jump to Date
                </label>
              <div 
                className="w-1/2 flex flex-col p-2.5 rounded-lg border shadow-sm overflow-hidden"
                
              >
                
                <div 
                    className="flex items-center gap-2 p-2 rounded-lg border transition-colors focus-within:bg-white"
                    style={{ 
                    backgroundColor: `${theme.primaryHex}08`, 
                    borderColor: `${theme.primaryHex}30` 
                    }}
                >
                    <CalendarIcon size={16} style={{ color: theme.primaryHex }} />
                    <input
                    type="date"
                    value={activeDate ? format(activeDate, 'yyyy-MM-dd') : ''}
                    onChange={handleDateChange}
                    className="w-full bg-transparent text-[13px] font-semibold text-slate-700 focus:outline-none cursor-pointer"
                    style={{ color: theme.primaryHex }}
                    />
                </div>
              </div>
                

            </div>
              {/* Tasks Section */}
              <div 
                className="w-full flex flex-col p-2.5 rounded-lg border shadow-sm overflow-hidden min-h-0"
                style={{ 
                  backgroundColor: `${theme.primaryHex}08`,
                  borderColor: `${theme.primaryHex}20`
                }}
              >
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1.5 block flex-shrink-0">
                  Tasks
                </label>
                <div className="flex-1 min-h-0 overflow-y-auto custom-mobile-scroll pr-1 mb-1 max-h-[40px]">
                  {tasks.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic">No tasks</p>
                  ) : (
                    tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-1 group p-2 rounded hover:bg-slate-100 transition-colors">
                        <div 
                          onClick={() => toggleTask(task.id)} 
                          className="flex items-center gap-1.5 cursor-pointer flex-1 min-w-0"
                        >
                          {task.done ? (
                            <CheckCircle2 size={12} className="flex-shrink-0" style={{ color: theme.primaryHex }} />
                          ) : (
                            <Circle size={12} className="text-slate-500 group-hover:text-slate-400 flex-shrink-0" />
                          )}
                          <span className={`text-[10px] truncate ${task.done ? 'line-through text-slate-400' : 'text-slate-700 group-hover:text-slate-900       '}`}>
                            {task.text}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-500 hover:text-red-500"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div 
                  className="w-full flex items-center gap-2 border-t pt-1.5 flex-shrink-0 mt-0.5"
                  style={{ borderTopColor: `${theme.primaryHex}33` }}
                >
                  <input 
                    type="text" 
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={addTask}
                    placeholder="+ Add a task..."
                    className="flex-1 min-w-0 text-[10px] text-black font-semibold focus:outline-none placeholder:text-slate-500 bg-transparent transition-colors"
                  />
                  
                  {/* New Mobile Add Button */}
                  <button
                    onClick={() => addTask({ key: 'Enter' })} // Mimics the Enter keypress!
                    className="px-2.5 py-1 text-[9px] tracking-wider font-bold text-white rounded shadow-sm transition-all active:scale-95"
                    style={{ backgroundColor: theme.primaryHex }}
                  >
                    ADD
                  </button>
                </div>
              </div>

            {/* ===== 4. CALENDAR GRID ===== */}
            <div className="w-full flex-shrink-0">
              <CalendarGrid currentDate={currentDate} theme={theme} {...gridProps} />
            </div>

            {/* ===== 5. NOTES SECTION ===== */}
            <div 
              className="w-full flex flex-col flex-1 min-h-[90px] p-3 rounded-lg border shadow-sm overflow-hidden mb-2"
              style={{ 
                backgroundColor: `#ffffff`,
                borderColor: `${theme.primaryHex}30`
              }}
            >
              <div className="flex justify-between items-baseline mb-2 flex-shrink-0">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.primaryHex}20` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.primaryHex }}></div>
                  </div>
                  Daily Memos
                </h3>
                <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                  {activeDate ? format(activeDate, 'MMMM do') : ''}
                </span>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full flex-1 min-h-0 resize-none bg-transparent text-[11px] text-slate-800 focus:outline-none placeholder:text-slate-500 font-medium custom-mobile-scroll"
                style={{
                  lineHeight: `22px`,
                  backgroundImage: `linear-gradient(transparent, transparent 21px, ${theme.primaryHex}30 21px)`,
                  backgroundSize: `100% 22px`,
                  backgroundAttachment: 'local'
                }}
              />
            </div>

          </div>
        </div>

        {/* ===== EXTREME TOP-LEFT SHARD (ABSOLUTE) ===== */}
        {/* Shard Glow */}
        <div 
          className="absolute z-20 top-[80px] left-[-6px] w-[180px] h-[60px] blur-2xl opacity-40 transition-colors duration-1000 pointer-events-none"
          style={{ backgroundColor: theme.primaryHex }}
        ></div>

        {/* Typographic Glass Shard */}
        <div 
          className="absolute z-20 top-[35px] left-[0px] w-[min(260px,70vw)] h-[100px] p-3 bg-slate-50/90 backdrop-blur-md shadow-2xl flex flex-col justify-end"
          style={{ 
            clipPath: 'polygon(0 0, 100% 0%, 82% 100%, 0% 90%)',
            borderLeft: `5px solid ${theme.primaryHex}`
          }}
        >
          {/* MM Watermark */}
          <div className="absolute top-1 left-2 flex items-center justify-center pointer-events-none select-none z-0">
            <span className="text-[4.5rem] font-serif font-black opacity-[0.05] tracking-tighter" style={{ color: theme.primaryHex }}>
              {format(currentDate, 'MM')}
            </span>
          </div>

          <div className="text-slate-800 z-10 relative mb-1">
            <p className="text-[9px] font-serif font-bold tracking-[0.2em] mb-[-2px] opacity-40">
              {format(currentDate, 'yyyy')}
            </p>
            <h2 className="text-3xl font-serif font-black uppercase tracking-tighter leading-none">
              {format(currentDate, 'MMMM')}
            </h2>
            <p className="text-[8px] font-bold tracking-[0.2em] uppercase mt-1" style={{ color: theme.primaryHex }}>
              {theme.festival || 'Season'}
            </p>
          </div>
        </div>

        {/* Navigation Buttons - Top Right (Absolute) */}
        <div className="absolute top-[5%] right-[5%] flex gap-1 z-40">
          <button 
            onClick={prevMonth} 
            className="w-7 h-7 bg-slate-50 hover:bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center transition-all"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}
          >
            <ChevronLeft size={14} />
          </button>
          <button 
            onClick={nextMonth} 
            className="w-7 h-7 bg-slate-50 hover:bg-white text-slate-800 shadow-lg border border-slate-200 flex items-center justify-center transition-all"
            style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}
          >
            <ChevronRight size={14} />
          </button>
        </div>

      </div>

      {/* CUSTOM CSS */}
      <style>{`
        /* Adapted Sawtooth mask for Mobile */
        .zig-zag-edges-mobile {
          mask: 
            conic-gradient(from -45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 10px 10px repeat-y,
            conic-gradient(from 135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 10px 10px repeat-y,
            linear-gradient(#000 0 0) center / calc(100% - 20px) 100% no-repeat;
          -webkit-mask: 
            conic-gradient(from -45deg at left, #0000, #000 1deg 89deg, #0000 90deg) left / 10px 10px repeat-y,
            conic-gradient(from 135deg at right, #0000, #000 1deg 89deg, #0000 90deg) right / 10px 10px repeat-y,
            linear-gradient(#000 0 0) center / calc(100% - 20px) 100% no-repeat;
        }

        .custom-mobile-scroll::-webkit-scrollbar { width: 4px; }
        .custom-mobile-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-mobile-scroll::-webkit-scrollbar-thumb {
          background: ${theme.primaryHex};
          border-radius: 10px;
          opacity: 0.4;
        }
        .custom-mobile-scroll::-webkit-scrollbar-thumb:hover { opacity: 0.7; }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer; opacity: 0.6; transition: 0.2s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { 
          opacity: 1;
        }
        
      `}</style>
    </div>
  );
};

export default MobileView;