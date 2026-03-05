import { Link } from 'react-router-dom';
import logo from '../img/Group 2.png';
import avatar from '../img/Group 6.png';

export default function Header() {
    return (
        <header className="border-b border-gray-200 bg-white w-full">
            <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
             
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="TaskDuty Logo" className="h-8 w-auto object-contain" />
                </Link>

                <div className="flex items-center space-x-6">
                    <nav className="hidden sm:flex space-x-6">
                        <Link to="/tasks/new" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                            New Task
                        </Link>
                        <Link to="/tasks" className="text-gray-600 font-medium hover:text-purple-600 transition-colors">
                            All Tasks
                        </Link>
                    </nav>

                  
                    <div className="relative">
                        <img
                            src={avatar}
                            alt="User profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                        />
                       
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-purple-500 ring-2 ring-white"></span>
                    </div>
                </div>
            </div>
        </header>
    );
}
