import React from 'react';
import CalendarDay from './CalendarDay';
import { getCalendarDays } from '../../utils/calendar';

const CalendarGrid = ({ currentDate, theme, singleDate, selectionRange, hoverDate, onDayClick, onDayHover }) => {
  const days = getCalendarDays(currentDate);
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="w-full flex flex-col gap-0.5 md:gap-1">
      {/* Weekday Header - Border and Text now dynamic */}
      <div 
        className="grid grid-cols-7 gap-0.5 md:gap-1 pb-1.5 md:pb-3 border-b-2"
        style={{ borderColor: `${theme.primaryHex}33` }} // 20% opacity border
      >
        {weekDays.map((day, idx) => (
          <div 
            key={idx} 
            className="text-[8px] md:text-[11px] font-extrabold text-center tracking-wider uppercase py-1 md:py-2 rounded-sm"
            style={{ 
              color: theme.primaryHex,
              backgroundColor: `${theme.primaryHex}10` // 6% opacity background tint
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* The Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-1">
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