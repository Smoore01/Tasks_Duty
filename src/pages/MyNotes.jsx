import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Book } from 'lucide-react';
import { useNotes } from '../contexts/NoteContext';
import NoteCard from '../components/NoteCard';

export default function MyNotes() {
    const { notes } = useNotes();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 flex items-center gap-2">
                    <Book className="w-8 h-8 text-purple-600" />
                    My Notes
                </h1>
                <Link
                    to="/notes/new"
                    className="flex items-center space-x-2 text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Add New Note</span>
                    <span className="sm:hidden">New Note</span>
                </Link>
            </div>

            <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search notes by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm placeholder-gray-400"
                />
            </div>

            <div className="space-y-6 sm:space-y-8">
                {filteredNotes.length === 0 ? (
                    <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <p className="text-xl mb-2">{searchQuery ? "No matching notes found." : "No notes found."}</p>
                        {!searchQuery && <p className="text-md">Click "Add New Note" to start writing.</p>}
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <NoteCard key={note.id} note={note} />
                    ))
                )}
            </div>

            {notes.length > 0 && (
                <div className="mt-12 text-center">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-purple-600 hover:text-purple-800 font-medium border-b border-purple-200 hover:border-purple-800 transition-all font-semibold underline-offset-4 decoration-2 underline"
                    >
                        Back To Top
                    </button>
                </div>
            )}
        </div>
    );
}
