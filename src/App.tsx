import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectAdd from './components/ProjectAdd';
import ProjectEdit from './components/ProjectEdit';

import StoryList from './components/StoryList';
import StoryAdd from './components/StoryAdd';
import StoryEdit from './components/StoryEdit';

import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import TaskEdit from './components/TaskEdit';

function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* Projects */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project/add" element={<ProjectAdd />} />
        <Route path="/project/edit/:projectId" element={<ProjectEdit />} />

        {/* Stories */}
        <Route path="/stories" element={<StoryList />} />
        <Route path="/story/add" element={<StoryAdd />} />
        <Route path="/story/edit/:storyId" element={<StoryEdit />} />

        {/* Tasks */}
        <Route path="/story/:storyId/tasks" element={<TaskList />} />
        <Route path="/story/:storyId/task/add" element={<TaskAdd />} />
        <Route path="/story/:storyId/task/edit/:taskId" element={<TaskEdit />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
