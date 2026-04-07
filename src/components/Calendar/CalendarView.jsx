import React, { useState } from 'react';
import { addMonths, subMonths, format, startOfToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import NotesSidebar from '../Modal/NotesSidebar'; 
import ScrollFrame from '../Layout/ScrollFrame';
import { getThemeForMonth } from '../../utils/constants';
import { checkIsBefore } from '../../utils/calendar';
import { useNotes } from '../../hooks/useNotes';
import bhrtImage from '../../assets/bhrt.jpg';

const CalendarView = () => {
  // --- DEFAULT SELECTION LOGIC ---
  // startOfToday() ensures we don't have weird timestamp issues
  const today = startOfToday(); 
  
  // Initialize the calendar view to the current month/year
  const [currentDate, setCurrentDate] = useState(today); 
  
  // Initialize the selected date to Today
  const [singleDate, setSingleDate] = useState(today);
  
  const theme = getThemeForMonth(currentDate.getMonth());
  const { notes, saveNote } = useNotes();
  
  const [selectionRange, setSelectionRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);

  const activeNoteDate = singleDate || selectionRange.start || null;
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleDayClick = (day, isRangeModifier) => {
    const isActivelySelectingRange = selectionRange.start && !selectionRange.end;
    
    if (!isRangeModifier && !isActivelySelectingRange) {
      setSingleDate(day);
      setSelectionRange({ start: null, end: null }); 
      return;
    }

    setSingleDate(null); 
    if (!selectionRange.start || (selectionRange.start && selectionRange.end)) {
      setSelectionRange({ start: day, end: null });
    } else {
      if (checkIsBefore(day, selectionRange.start)) {
        setSelectionRange({ start: day, end: null });
      } else {
        setSelectionRange({ ...selectionRange, end: day });
      }
    }
  };

  return (
    <div className="w-[600px] flex flex-col">
      <ScrollFrame>
        
        {/* UPPER PART: FIXED IMAGE */}
        <div className="relative w-full h-[280px] overflow-hidden">
          <img src={bhrtImage} alt="Theme" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4e4bc] to-transparent"></div>
          
          <div className="absolute bottom-4 left-8 right-8 flex justify-between items-end">
            <div className="text-[#3e2723]">
              <h2 className="text-5xl font-serif font-black uppercase tracking-tighter leading-none">
                {format(currentDate, 'MMMM')}
              </h2>
              <p className="text-[12px] font-bold text-[#8b0000] tracking-[0.8em]">{format(currentDate, 'yyyy')}</p>
            </div>
            <div className="flex gap-2 mb-1">
              <button onClick={prevMonth} className="text-[#3e2723] hover:scale-125 transition-transform">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextMonth} className="text-[#3e2723] hover:scale-125 transition-transform">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* LOWER PART: GRID & AUTO-SAVING NOTES */}
        <div className="w-full h-[340px] flex flex-row items-start px-8 pt-4 pb-8">
          
          <div className="w-[50%] pr-8 border-r border-[#8b0000]/10 h-full flex flex-col justify-center">
            <CalendarGrid 
              currentDate={currentDate} 
              theme={theme} 
              singleDate={singleDate}
              selectionRange={selectionRange}
              hoverDate={hoverDate}
              onDayClick={handleDayClick} 
              onDayHover={(day) => selectionRange.start && !selectionRange.end && setHoverDate(day)}
            />
          </div>

          <div className="w-[50%] pl-8 h-full">
            <NotesSidebar 
              activeDate={activeNoteDate} 
              notes={notes}
              saveNote={saveNote}
            />
          </div>

        </div>

      </ScrollFrame>
    </div>
  );
};

export default CalendarView;