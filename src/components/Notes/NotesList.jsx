// src/components/Notes/NotesList.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

const NotesList = ({ notes, deleteNote, activeDate, theme }) => {
  const [newNote, setNewNote] = useState('');

  // Handle Note Save/Add - The logic would call saveNote(dateKey, text)
  // But to perfectly match the UI from image_2.png, it seems to be just a list.
  // This is a simplified list. We'll use useNotes to manage it.

  // We are creating a new structure for notes.
  // Instead of an object per date, let's use a flat list for standard month-level notes
  // to perfectly match the left sidebar of image_2.png.
  const [savedNotesList, setSavedNotesList] = useState([]);

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setSavedNotesList([...savedNotesList, newNote]);
      setNewNote('');
    }
  };

  const handleRemoveNote = (idx) => {
    setSavedNotesList(savedNotesList.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Clean Notes Title */}
      <h3 className="text-sm font-semibold text-slate-700 mb-6">Notes</h3>
      
      {/* Simple List with static divider lines */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 text-sm text-slate-600">
        {[...Array(8)].map((_, i) => {
          const savedNote = savedNotesList[i];
          return (
            <div key={i} className="flex justify-between items-start border-b border-slate-100 pb-1.5 min-h-[30px] w-full">
              <p className={`flex-1 ${!savedNote ? 'text-slate-300' : ''}`}>
                {savedNote || `_______________________________________________`}
              </p>
              {savedNote && (
                <button onClick={() => handleRemoveNote(i)} className="text-slate-400 hover:text-red-500 ml-2">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Simplified Note input and save button */}
      <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-slate-100">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a new note here..."
            className="w-full p-2.5 rounded-lg bg-white border border-slate-200 text-sm focus:outline-none"
          />
          <button
            onClick={handleAddNote}
            // Use the blue theme color from image_2.png as default
            className={`w-full py-2.5 rounded-xl font-bold text-white transition-all active:scale-95 shadow-md ${theme.primary}`}
          >
            Add Note to List
          </button>
      </div>

    </div>
  );
};

export default NotesList;