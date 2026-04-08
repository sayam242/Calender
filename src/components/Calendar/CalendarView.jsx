import React, { useState, useEffect, useRef } from 'react';
import { addMonths, subMonths, format, startOfToday, eachDayOfInterval } from 'date-fns';
import { getThemeForMonth } from '../../utils/constants';
import { checkIsBefore } from '../../utils/calendar';
import { useNotes } from '../../hooks/useNotes';
import { getSparkForDate } from '../../utils/sparks';

// Import your Presenter components
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const CalendarView = () => {
  const today = startOfToday(); 
  const [currentDate, setCurrentDate] = useState(today); 
  const [singleDate, setSingleDate] = useState(today);
  
  
  const theme = getThemeForMonth(currentDate.getMonth());
  const { notes, saveNote } = useNotes();
  
  const [selectionRange, setSelectionRange] = useState({ start: null, end: null });
  const [hoverDate, setHoverDate] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [text, setText] = useState('');
  const [thought,setThought] = useState("");
  
  const isInitialMount = useRef(true);

  const activeNoteDate = singleDate || selectionRange.start || null;
  const dateKey = activeNoteDate ? format(activeNoteDate, 'yyyy-MM-dd') : null;

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Load Data
  useEffect(() => {
    isInitialMount.current = true;
    if (dateKey) {
      setText(notes[dateKey] || '');
      const savedTasks = localStorage.getItem(`tasks-${dateKey}`);
      setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    } else {
      setText('');
      setTasks([]);
    }
  }, [dateKey, notes]);

  // Auto-Save Data
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (dateKey) {
      const saveTimer = setTimeout(() => {
        saveNote(dateKey, text);
      }, 800);
      return () => clearTimeout(saveTimer);
    }
  }, [text, dateKey, saveNote]);

  useEffect(() => {
    // Sets a fresh spark whenever the selected date changes
    if (activeNoteDate) {
      setThought(getSparkForDate(activeNoteDate));
    }
  }, [activeNoteDate]);

  // Task Handlers
  const addTaskHandler = (e) => {
    if (e.key === 'Enter' && newTask.trim()) {
      const taskId = Date.now();
      const newTaskObj = { id: taskId, text: newTask, done: false };
      
      if (selectionRange?.start && selectionRange?.end) {
        const datesInRange = eachDayOfInterval({ start: selectionRange.start, end: selectionRange.end });
        datesInRange.forEach(date => {
          const key = format(date, 'yyyy-MM-dd');
          const existingTasks = localStorage.getItem(`tasks-${key}`);
          let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
          tasksArray.push(newTaskObj);
          localStorage.setItem(`tasks-${key}`, JSON.stringify(tasksArray));
        });
        if (dateKey) setTasks(prev => [...prev, newTaskObj]);
      } else if (dateKey) {
        const updated = [...tasks, newTaskObj];
        setTasks(updated);
        localStorage.setItem(`tasks-${dateKey}`, JSON.stringify(updated));
      }
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated);
    if (dateKey) localStorage.setItem(`tasks-${dateKey}`, JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    if (dateKey) localStorage.setItem(`tasks-${dateKey}`, JSON.stringify(updated));
  };

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

  const calendarProps = {
    currentDate, theme, singleDate, selectionRange, hoverDate,
    onDayClick: handleDayClick,
    onDayHover: (day) => selectionRange.start && !selectionRange.end && setHoverDate(day),
    prevMonth, nextMonth
  };

const dashboardProps = {
    activeDate: activeNoteDate, 
    text, 
    setText, 
    tasks, 
    thought,
    toggleTask, 
    deleteTask, 
    newTask, 
    setNewTask, 
    addTask: addTaskHandler, 
    theme,
    // NEW: Add this line so the sidebar can control the calendar!
    onDateSelect: (newDate) => {
      setCurrentDate(newDate); // Shifts the whole calendar to that month
      handleDayClick(newDate, false); // Selects the specific day
    }
  };  

  return (
    /* THE FIX: 
      Changed to min-h-screen, items-center, justify-center, relative, and added padding.
      This ensures the jagged calendar body AND its floating shards stay perfectly centered 
      and don't clip off the edges of the monitor.
    */
    <div className="w-full min-h-screen flex items-center justify-center relative p-4 md:p-8">
      <DesktopView calendarProps={calendarProps} dashboardProps={dashboardProps}/>
      <MobileView calendarProps={calendarProps} dashboardProps={dashboardProps}/>
    </div>
  );
};

export default CalendarView;