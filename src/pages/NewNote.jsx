import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useNotes } from '../contexts/NoteContext';

export default function NewNote() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { addNote } = useNotes();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        addNote({ title, content });
        navigate('/notes');
    };

    return (
        <div className="max-w-4xl mx-auto py-8 lg:py-12">
            <div className="flex items-center mb-10 sm:mb-16">
                <button
                    onClick={() => navigate('/notes')}
                    className="flex items-center text-gray-800 hover:text-black transition-colors"
                >
                    <ChevronLeft size={28} className="mr-1" />
                    <span className="text-xl sm:text-2xl font-bold">New Note</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl">
                <div className="relative">
                    <label className="absolute -top-3 left-3 bg-[#F9FAFB] px-1 text-gray-500 font-medium z-10">
                        Note Title
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="E.g., Meeting with John"
                        className="w-full border border-gray-300 rounded-lg px-4 py-4 sm:py-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative"
                    />
                </div>

                <div className="relative">
                    <label className="absolute -top-3 left-3 bg-[#F9FAFB] px-1 text-gray-500 font-medium z-10">
                        Content
                    </label>
                    <textarea
                        required
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note down here..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative resize-none"
                    />
                </div>

                <div className="pt-4 flex justify-center">
                    <button
                        type="submit"
                        className="w-full sm:w-[500px] bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 sm:py-4 rounded-xl shadow-[0_4px_14px_0_rgba(147,51,234,0.39)] hover:shadow-[0_6px_20px_rgba(147,51,234,0.23)] transition-all"
                    >
                        Save Note
                    </button>
                </div>
            </form>

            <div className="mt-12 text-center">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-purple-600 hover:text-purple-800 font-medium pb-1 transition-all underline-offset-4 decoration-2 underline md:mr-30"
                >
                    Back To Top
                </button>
            </div>
        </div>
    );
}
