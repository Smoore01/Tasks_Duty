import { createContext, useContext, useState, useEffect } from 'react';

const NoteContext = createContext();

export function useNotes() {
    return useContext(NoteContext);
}

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('taskduty_notes');
        if (savedNotes) {
            return JSON.parse(savedNotes);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('taskduty_notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = (newNote) => {
        const note = {
            ...newNote,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        setNotes([note, ...notes]);
    };

    const updateNote = (id, updatedNote) => {
        setNotes(notes.map(n => n.id === id ? { ...n, ...updatedNote, updatedAt: new Date().toISOString() } : n));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const getNote = (id) => {
        return notes.find(n => n.id === id);
    };

    return (
        <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNote }}>
            {children}
        </NoteContext.Provider>
    );
}
