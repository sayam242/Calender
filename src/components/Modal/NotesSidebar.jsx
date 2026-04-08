import React, { useState } from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Circle, Sparkles, X, Calendar as CalendarIcon } from 'lucide-react';

const NotesSidebar = ({ 
  activeDate, 
  tasks, 
  toggleTask, 
  deleteTask, 
  newTask, 
  setNewTask, 
  addTask,
  theme,
  onDateSelect ,
  thought
}) => {
  const handleDateChange = (e) => {
    if (e.target.value && onDateSelect) {
      const [year, month, day] = e.target.value.split('-');
      const newDate = new Date(year, month - 1, day);
      onDateSelect(newDate);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pb-2 min-h-0">
      
      {/* 1. DATE SELECTOR */}
      <div className="flex-shrink-0">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block">
          Jump to Date
        </label>
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

      {/* 2. Daily Spark */}
      <div 
        className="p-4 rounded-lg border shadow-sm flex-shrink-0"
        style={{ 
          backgroundColor: `${theme.primaryHex}08`,
          borderColor: `${theme.primaryHex}20`
        }}
      >
        <div className="flex items-center gap-2 mb-2" style={{ color: theme.primaryHex }}>
          <Sparkles size={16} className="flex-shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest">Daily Spark</span>
        </div>
        <p className="text-[12px] italic text-slate-700 font-medium leading-relaxed">"{thought}"</p>
      </div>

      {/* 3. Tasks Section - Now takes up remaining space */}
      <div className="flex-1 flex flex-col min-h-0">
        <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-1 flex-shrink-0">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${theme.primaryHex}20` }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primaryHex }}></div>
          </div>
          Tasks
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 custom-memo-scroll mt-2">
          {tasks.length === 0 ? (
            <p className="text-[11px] text-slate-500 italic px-2">No tasks yet</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="flex items-center gap-2.5 group p-2 rounded hover:bg-slate-100 transition-colors">
                <div onClick={() => toggleTask(task.id)} className="flex items-center gap-2.5 cursor-pointer flex-1">
                  {task.done ? (
                    <CheckCircle2 size={16} className="flex-shrink-0" color={theme.primaryHex} />
                  ) : (
                    <Circle size={16} className="text-slate-500 group-hover:text-slate-400 flex-shrink-0" />
                  )}
                  <span className={`text-[12px] ${task.done ? 'line-through text-slate-400' : 'text-slate-700 group-hover:text-slate-900'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-slate-500 hover:text-red-500 ml-auto"
                  title="Delete task"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={addTask}
          placeholder="+ Add a task..."
          className="w-full flex-shrink-0 text-[12px] text-black font-semibold border-b py-2.5 px-2 rounded-t focus:outline-none placeholder:text-slate-500 mt-0.5 transition-colors bg-transparent"
          style={{ 
            borderBottomColor: `${theme.primaryHex}33`
          }}
        />
      </div>
      
      {/* DYNAMIC SCROLLBAR CSS */}
      <style>{`
        .custom-memo-scroll::-webkit-scrollbar { width: 5px; }
        .custom-memo-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-memo-scroll::-webkit-scrollbar-thumb {
          background: ${theme.primaryHex};
          border-radius: 10px;
          opacity: 0.4;
        }
        .custom-memo-scroll::-webkit-scrollbar-thumb:hover { opacity: 0.7; }
        input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer; opacity: 0.6; transition: 0.2s;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
      `}</style>
    </div>
  );
};

export default NotesSidebar;