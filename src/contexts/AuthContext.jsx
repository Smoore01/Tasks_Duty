import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for an existing session on load
        const storedUser = localStorage.getItem('taskduty_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (username, password) => {
        try {
            // Simulate network request
            await new Promise(resolve => setTimeout(resolve, 500));

            const storedUsers = JSON.parse(localStorage.getItem('taskduty_users') || '[]');
            const user = storedUsers.find(u => u.username === username);

            if (user && user.password === password) {
                // Create an auth user object (excluding password)
                const { password: pwd, ...authUser } = user;
                setUser(authUser);
                localStorage.setItem('taskduty_user', JSON.stringify(authUser));
                return { success: true };
            } else {
                return { success: false, message: 'Invalid username or password' };
            }
        } catch (error) {
            return { success: false, message: 'An error occurred during login' };
        }
    };

    const register = async (email, username, password) => {
        try {
            // Simulate network request
            await new Promise(resolve => setTimeout(resolve, 500));

            const storedUsers = JSON.parse(localStorage.getItem('taskduty_users') || '[]');

            // Check if user already exists
            const existingUser = storedUsers.find(u => u.username === username || u.email === email);
            if (existingUser) {
                return { success: false, message: 'User with that email or username already exists' };
            }

            const newUser = {
                id: Date.now().toString(),
                email,
                username,
                password // Storing in plain text locally for this mock only
            };

            // Save to "database"
            storedUsers.push(newUser);
            localStorage.setItem('taskduty_users', JSON.stringify(storedUsers));

            // Automatically login
            const { password: pwd, ...authUser } = newUser;
            setUser(authUser);
            localStorage.setItem('taskduty_user', JSON.stringify(authUser));
            return { success: true };
        } catch (error) {
            return { success: false, message: 'An error occurred during registration' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('taskduty_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
