import { useState, useEffect } from 'react';

export const useNotes = () => {
  const [notes, setNotes] = useState({});

  // Load notes from local storage on initial mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar_notes');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Failed to parse notes from local storage", error);
      }
    }
  }, []);

  // Save a note for a specific date (dateKey format: 'YYYY-MM-DD')
  const saveNote = (dateKey, text) => {
    const updatedNotes = {
      ...notes,
      [dateKey]: text
    };
    setNotes(updatedNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(updatedNotes));
  };

  // Delete a note for a specific date
  const deleteNote = (dateKey) => {
    const updatedNotes = { ...notes };
    delete updatedNotes[dateKey];
    setNotes(updatedNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(updatedNotes));
  };

  return { notes, saveNote, deleteNote };
};