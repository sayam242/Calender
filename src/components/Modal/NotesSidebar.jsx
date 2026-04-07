import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

const NotesSidebar = ({ activeDate, notes, saveNote }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const isInitialMount = useRef(true); // To prevent saving on the very first load
  const dateKey = activeDate ? format(activeDate, 'yyyy-MM-dd') : null;

  const LINE_HEIGHT = 28; 
  const INITIAL_LINES = 2;

  // 1. Load existing note when date changes
  useEffect(() => {
    isInitialMount.current = true; // Block the auto-save for the initial data load
    setText(dateKey && notes[dateKey] ? notes[dateKey] : '');
  }, [dateKey, notes]);

  // 2. AUTO-SAVE LOGIC (Debounced)
  useEffect(() => {
    // If it's just the initial load of the component or date switch, don't save yet
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Set a timer to save after 800ms of no typing
    const saveTimer = setTimeout(() => {
      if (dateKey) {
        saveNote(dateKey, text);
        console.log(`Auto-saved note for ${dateKey}`);
      }
    }, 800);

    // If the user types again before 800ms is up, clear the previous timer and start over
    return () => clearTimeout(saveTimer);
  }, [text, dateKey, saveNote]);

  // 3. Auto-resize (Grow/Shrink) Logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'; 
      const contentHeight = textareaRef.current.scrollHeight;
      const minHeight = LINE_HEIGHT * INITIAL_LINES;
      textareaRef.current.style.height = `${Math.max(contentHeight, minHeight)}px`;
    }
  }, [text, activeDate]);

  return (
    <div className="w-full h-full flex flex-col pt-1">
      <div className="flex justify-between items-baseline mb-1 px-0.5">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-black/80">
          Memos
        </h3>
        {activeDate && (
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-black/30 font-bold uppercase">
              {format(activeDate, 'MMM do')}
            </span>
          </div>
        )}
      </div>
      
      {activeDate ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note for today..."
            className="w-full resize-none bg-transparent text-sm text-black/80 focus:outline-none overflow-hidden placeholder:text-black/10"
            style={{
              lineHeight: `${LINE_HEIGHT}px`,
              backgroundImage: `linear-gradient(transparent, transparent ${LINE_HEIGHT - 1}px, #000000 ${LINE_HEIGHT - 1}px)`,
              backgroundSize: `100% ${LINE_HEIGHT}px`,
              paddingTop: '0px', 
              paddingBottom: '0px',
              minHeight: `${LINE_HEIGHT * INITIAL_LINES}px`
            }}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div 
            className="w-full opacity-10" 
            style={{
              height: `${LINE_HEIGHT * INITIAL_LINES}px`,
              backgroundImage: `linear-gradient(transparent, transparent ${LINE_HEIGHT - 1}px, #000000 ${LINE_HEIGHT - 1}px)`,
              backgroundSize: `100% ${LINE_HEIGHT}px`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default NotesSidebar;