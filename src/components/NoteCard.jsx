import { Link } from 'react-router-dom';
import { useNotes } from '../contexts/NoteContext';

export default function NoteCard({ note }) {
    const { deleteNote } = useNotes();

    return (
        <div className="w-full bg-white border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] rounded-xl mb-6 flex flex-col pt-4">
            <div className="px-4 sm:px-6 mb-2">
                <h3 className="text-xl font-bold text-gray-800 break-words">{note.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(note.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="px-4 sm:px-6 mt-2 mb-6">
                <p className="text-gray-600 text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                    {note.content}
                </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto border-t border-gray-100 px-4 sm:px-6 py-3 flex justify-end space-x-6 items-center bg-[#F9FAFB] rounded-b-xl">
                <Link
                    to={`/notes/${note.id}/edit`}
                    className="text-gray-500 font-semibold text-sm hover:text-purple-600 transition-colors"
                >
                    Edit
                </Link>
                <button
                    onClick={() => {
                        if (window.confirm('Are you sure you want to delete this note?')) {
                            deleteNote(note.id);
                        }
                    }}
                    className="text-red-500 font-semibold text-sm hover:text-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
