import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CoverPage from './pages/CoverPage';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<CoverPage />} />
              <Route path="tasks" element={<MyTasks />} />
              <Route path="tasks/new" element={<NewTask />} />
              <Route path="tasks/:id/edit" element={<EditTask />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
