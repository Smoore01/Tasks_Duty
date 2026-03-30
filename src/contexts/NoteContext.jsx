import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NoteContext = createContext();

export function useNotes() {
    return useContext(NoteContext);
}

export function NoteProvider({ children }) {
    const { user } = useAuth();
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
            userId: user ? user.id : null,
            createdAt: new Date().toISOString(),
        };
        setNotes([note, ...notes]);
    };

    const updateNote = (id, updatedNote) => {
        setNotes(notes.map(n => {
            if (n.id === id) {
                if (user && n.userId === user.id) {
                    return { ...n, ...updatedNote, updatedAt: new Date().toISOString() };
                }
            }
            return n;
        }));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => {
            if (n.id === id) {
                return !(user && n.userId === user.id);
            }
            return true;
        }));
    };

    const getNote = (id) => {
        const note = notes.find(n => n.id === id);
        if (note && user && note.userId === user.id) {
            return note;
        }
        return undefined;
    };

    const userNotes = user ? notes.filter(n => n.userId === user.id) : [];

    return (
        <NoteContext.Provider value={{ notes: userNotes, addNote, updateNote, deleteNote, getNote }}>
            {children}
        </NoteContext.Provider>
    );
}
