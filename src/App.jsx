import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CoverPage from './pages/CoverPage';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import MyNotes from './pages/MyNotes';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import Login from './pages/Login';
import Register from './pages/Register';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';
import { NoteProvider } from './contexts/NoteContext';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NoteProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<CoverPage />} />
                <Route path="tasks" element={<MyTasks />} />
                <Route path="tasks/new" element={<NewTask />} />
                <Route path="tasks/:id/edit" element={<EditTask />} />
                <Route path="notes" element={<MyNotes />} />
                <Route path="notes/new" element={<NewNote />} />
                <Route path="notes/:id/edit" element={<EditNote />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </NoteProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
