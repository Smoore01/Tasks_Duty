import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';

export default function MyTasks() {
    
    const { tasks } = useTasks();

    return (
        <div className="max-w-4xl mx-auto py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">My Tasks</h1>
                <Link
                    to="/tasks/new"
                    className="flex items-center space-x-2 text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                    <Plus size={20} />
                    <span className="hidden sm:inline">Add New Task</span>
                    <span className="sm:hidden">New Task</span>
                </Link>
            </div>

            {/* Task List */}
            <div className="space-y-6 sm:space-y-8">
                {tasks.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl mb-4">No tasks found. Click "Add New Task" to get started.</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))
                )}
            </div>

            {/* Back to top */}
            {tasks.length > 0 && (
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
