import { useState, useCallback } from 'react';

export const useNotes = () => {
  // 1. Load initial notes from Local Storage when the app starts
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('calendar-daily-memos');
      return savedNotes ? JSON.parse(savedNotes) : {};
    } catch (error) {
      console.error("Error loading notes from local storage", error);
      return {};
    }
  });

  // 2. Save note to state AND Local Storage
  const saveNote = useCallback((dateKey, text) => {
    setNotes((prevNotes) => {
      // If the text is empty, you might want to delete the key to save space, 
      // but keeping it as an empty string is also fine.
      const updatedNotes = {
        ...prevNotes,
        [dateKey]: text
      };
      
      // Write the updated object to the browser's Local Storage
      localStorage.setItem('calendar-daily-memos', JSON.stringify(updatedNotes));
      
      return updatedNotes;
    });
  }, []);

  return { notes, saveNote };
};