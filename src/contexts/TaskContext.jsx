import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export function useTasks() {
    return useContext(TaskContext);
}

export function TaskProvider({ children }) {
    const { user } = useAuth();
    const [tasks, setTasks] = useState(() => {
        // Load tasks from local storage or use default tasks initially
        const savedTasks = localStorage.getItem('taskduty_tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        return [
            {
                id: '1',
                title: 'FinTech Website Update',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.',
                tags: ['Urgent'],
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                title: 'Agro Website Update',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.',
                tags: ['Important'],
                createdAt: new Date().toISOString(),
            }
        ];
    });

    // Save tasks to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('taskduty_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        const task = {
            ...newTask,
            id: Date.now().toString(),
            userId: user ? user.id : null,
            createdAt: new Date().toISOString(),
        };
        setTasks([task, ...tasks]); // Add to beginning
    };

    const updateTask = (id, updatedTask) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                if (user && t.userId === user.id) {
                    return { ...t, ...updatedTask };
                }
            }
            return t;
        }));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => {
            if (t.id === id) {
                return !(user && t.userId === user.id);
            }
            return true;
        }));
    };

    const getTask = (id) => {
        const task = tasks.find(t => t.id === id);
        if (task && user && task.userId === user.id) {
            return task;
        }
        return undefined;
    };

    const userTasks = user ? tasks.filter(t => t.userId === user.id) : [];

    return (
        <TaskContext.Provider value={{ tasks: userTasks, addTask, updateTask, deleteTask, getTask }}>
            {children}
        </TaskContext.Provider>
    );
}
