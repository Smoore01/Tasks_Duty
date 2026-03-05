import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CoverPage from './pages/CoverPage';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CoverPage />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="tasks/new" element={<NewTask />} />
            <Route path="tasks/:id/edit" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
