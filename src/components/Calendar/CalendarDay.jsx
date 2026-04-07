import React from 'react';
import { checkIsSameMonth, checkIsToday, formatDate, checkIsSameDay, checkIsWithinRange } from '../../utils/calendar';

const CalendarDay = ({ day, currentMonth, theme, singleDate, selectionRange, hoverDate, onClick, onHover }) => {
  const isCurrentMonth = checkIsSameMonth(day, currentMonth);
  const isToday = checkIsToday(day);

  const isSingle = checkIsSameDay(day, singleDate);
  const isStart = checkIsSameDay(day, selectionRange?.start);
  const isEnd = checkIsSameDay(day, selectionRange?.end);
  const isSelectedRange = selectionRange?.start && selectionRange?.end && checkIsWithinRange(day, selectionRange.start, selectionRange.end);
  const isHoverRange = selectionRange?.start && !selectionRange?.end && hoverDate && checkIsWithinRange(day, selectionRange.start, hoverDate);

  const isRangeHighlighted = isStart || isEnd || isSelectedRange || isHoverRange;
  
  // Highlight spans the background of the text area only
  const lightBgClass = theme?.hover ? theme.hover.replace('hover:', '') : 'bg-[#e9dcc0]';

  return (
    <div
      onClick={(e) => onClick(day, e.ctrlKey || e.metaKey)}
      onMouseEnter={() => onHover(day)}
      onContextMenu={(e) => { e.preventDefault(); onClick(day, true); }}
      // Borders and fixed min-height removed for a clean "floating" look
      className={`py-2 transition-all cursor-pointer flex flex-col items-center justify-center select-none rounded-md
        ${isRangeHighlighted ? lightBgClass : 'hover:bg-[#8b0000]/5'}
      `}
    >
      <span 
        className={`
          text-xs w-7 h-7 flex items-center justify-center rounded-full transition-all
          ${isToday && !isRangeHighlighted && !isSingle ? 'border border-[#3e2723] font-bold' : ''}
          ${(isSingle || isStart || isEnd) ? `${theme.primary} text-white font-bold shadow-sm scale-110` : ''}
          ${isRangeHighlighted && !isStart && !isEnd ? `${theme.text} font-bold` : 'text-[#3e2723]'}
          ${!isCurrentMonth && !isRangeHighlighted && !isSingle ? 'opacity-10' : ''}
        `}
      >
        {formatDate(day, 'd')}
      </span>
    </div>
  );
};

export default CalendarDay;