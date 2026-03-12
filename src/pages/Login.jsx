import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await login(username, password);
        if (res.success) {
            navigate('/tasks');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Welcome Back</h2>

                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label className="absolute -top-3 left-3 bg-white px-1 text-gray-500 font-medium z-10 text-sm">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative"
                        />
                    </div>

                    <div className="relative">
                        <label className="absolute -top-3 left-3 bg-white px-1 text-gray-500 font-medium z-10 text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent z-0 relative"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 sm:py-4 rounded-xl shadow-md transition-colors mt-4"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
