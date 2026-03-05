import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

export default function NewTask() {
    const navigate = useNavigate();
    const { addTask } = useTasks();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState(''); // Default to empty

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !tag) return;

        addTask({
            title,
            description,
            tags: [tag]
        });

        navigate('/tasks');
    };

    return (
        <div className="max-w-4xl mx-auto py-8 lg:py-12">
            {/* Header */}
            <div className="flex items-center mb-10 sm:mb-16">
                <button
                    onClick={() => navigate('/tasks')}
                    className="mr-4 text-gray-800 hover:text-purple-600 transition-colors"
                >
                    <ChevronLeft size={32} strokeWidth={2.5} />
                </button>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">New Task</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl">
                {/* Title Input */}
                <div className="relative">
                    <label className="absolute -top-3 left-3 bg-[#F9FAFB] px-1 text-gray-500 font-medium z-10">
                        Task Title
                    </label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="E.g Project Defense, Assignment ..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-4 sm:py-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative shadow-sm"
                    />
                </div>

                {/* Description Textarea */}
                <div className="relative">
                    <label className="absolute -top-3 left-3 bg-[#F9FAFB] px-1 text-gray-500 font-medium z-10">
                        Description
                    </label>
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Briefly describe your task..."
                        rows={6}
                        className="w-full border border-gray-300 rounded-lg px-4 py-4 sm:py-5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative shadow-sm resize-none"
                    />
                </div>

                {/* Tags Select (Custom styling to match design exactly) */}
                <div className="relative">
                    <label className="absolute -top-3 left-3 bg-[#F9FAFB] px-1 text-gray-500 font-medium z-10">
                        Tags
                    </label>
                    <div
                        className="w-full border border-gray-300 rounded-lg px-4 py-4 sm:py-5 text-gray-800 bg-transparent relative shadow-sm flex items-center justify-between cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="flex space-x-3">
                            {tag ? (
                                <span className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium">{tag}</span>
                            ) : (
                                <span className="text-gray-400">Select a tag</span>
                            )}
                        </div>
                        <ChevronDown size={24} className="text-gray-500" strokeWidth={2} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 overflow-hidden">
                            <div
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                                onClick={() => { setTag('Urgent'); setIsDropdownOpen(false); }}
                            >
                                <span className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium">Urgent</span>
                            </div>
                            <div
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-800 font-medium"
                                onClick={() => { setTag('Important'); setIsDropdownOpen(false); }}
                            >
                                <span className="px-3 py-1 bg-gray-600 text-white rounded text-sm font-medium">Important</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                    <button
                        type="submit"
                        className="w-full bg-[#9333EA] hover:bg-purple-700 text-white font-medium text-xl py-4 rounded-xl shadow-md transition-colors"
                    >
                        Done
                    </button>
                </div>
            </form>

            {/* Back to top hidden link at bottom */}
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
