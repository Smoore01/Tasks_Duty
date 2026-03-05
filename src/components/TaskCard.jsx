import { Link, useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';

export default function TaskCard({ task }) {
    const { deleteTask } = useTasks();
    const navigate = useNavigate();

    const isUrgent = task.tags?.includes('Urgent');

    return (
        <div className="w-full bg-white border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] rounded-xl mb-6 flex flex-col pt-4">
           
            <div className="flex justify-between items-center px-4 sm:px-6 mb-2">
                <span className={`text-sm font-semibold ${isUrgent ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isUrgent ? 'Urgent' : 'Important'}
                </span>

                <div className="flex space-x-2 sm:space-x-3">
                    <button
                        onClick={() => navigate(`/tasks/${task.id}/edit`)}
                        className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                        <Pencil size={16} />
                        <span>Edit</span>
                    </button>

                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                deleteTask(task.id);
                            }
                        }}
                        className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 border border-purple-200 text-purple-600 hover:bg-purple-50 text-sm font-medium rounded-lg transition-colors"
                    >
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            {/* Title */}
            <div className="px-4 sm:px-6 mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">{task.title}</h3>
            </div>

            {/* Description */}
            <div className="px-4 sm:px-6 pb-6">
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                    {task.description}
                </p>
            </div>
        </div>
    );
}
