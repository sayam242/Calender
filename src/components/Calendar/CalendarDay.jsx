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
  const lightBgClass = theme?.hover ? theme.hover.replace('hover:', '') : 'bg-transparent';

  return (
    <div
      onClick={(e) => onClick(day, e.ctrlKey || e.metaKey)}
      onMouseEnter={() => onHover(day)}
      onContextMenu={(e) => { e.preventDefault(); onClick(day, true); }}
      className={`
        h-9 md:h-12 p-0.5 md:p-2 transition-all cursor-pointer flex flex-col items-center justify-center select-none 
        border rounded-md relative group
        ${isRangeHighlighted ? `${lightBgClass}` : 'bg-white hover:bg-white/80'}
        ${!isCurrentMonth ? 'opacity-30 border-dashed' : 'border-solid'}
      `}
      style={{
        // Dynamic border color based on theme
        borderColor: isRangeHighlighted ? `${theme.primaryHex}66` : `${theme.primaryHex}15`,
        backgroundColor: !isCurrentMonth ? `${theme.primaryHex}05` : undefined
      }}
    >
      {/* Day Number */}
      <span 
        className={`
          text-[10px] md:text-sm font-bold w-5 h-5 md:w-6 md:h-8 flex items-center justify-center rounded-full transition-all
          ${(isSingle || isStart || isEnd) ? `${theme.primary} text-white font-black shadow-md scale-110` : ''}
          ${isRangeHighlighted && !isStart && !isEnd ? `${theme.text} font-bold` : 'text-[#3e2723]'}
          ${!isCurrentMonth && 'opacity-40'}
        `}
        style={{
          // Today's indicator styling
          border: isToday && !isRangeHighlighted && !isSingle ? `1.5px solid ${theme.primaryHex}` : undefined,
          backgroundColor: isToday && !isRangeHighlighted && !isSingle ? `${theme.primaryHex}15` : undefined
        }}
      >
        {formatDate(day, 'd')}
      </span>

      {/* Subtle indicator dot for days with notes */}
      {isCurrentMonth && (
        <div 
          className="absolute bottom-0.5 md:bottom-1 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all"
          style={{
            backgroundColor: isSingle || isStart || isEnd ? '#ffffff' : `${theme.primaryHex}40`,
            boxShadow: isSingle || isStart || isEnd ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
          }}
        />
      )}
    </div>
  );
};

export default CalendarDay;