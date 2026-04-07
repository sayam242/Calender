import React from 'react';
import CalendarDay from './CalendarDay';
import { getCalendarDays } from '../../utils/calendar';

const CalendarGrid = ({ currentDate, theme, singleDate, selectionRange, hoverDate, onDayClick, onDayHover }) => {
  const days = getCalendarDays(currentDate);
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-full flex flex-col">
      {/* Ultra-compact Weekday Header */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day, idx) => (
          <div key={idx} className="text-[10px] font-black text-[#8b0000]/40 text-center tracking-tighter">
            {day}
          </div>
        ))}
      </div>

      {/* The "Floating" Date Grid */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => (
          <CalendarDay
            key={idx}
            day={day}
            currentMonth={currentDate}
            theme={theme}
            singleDate={singleDate}
            selectionRange={selectionRange}
            hoverDate={hoverDate}
            onClick={onDayClick}
            onHover={onDayHover}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;