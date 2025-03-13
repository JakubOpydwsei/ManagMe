import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectAdd from './components/ProjectAdd';
import ProjectEdit from './components/ProjectEdit';

import StoryList from './components/StoryList';
import StoryAdd from './components/StoryAdd';
import StoryEdit from './components/StoryEdit';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/addProject" element={<ProjectAdd />} />
        <Route path="/editProject/:id" element={<ProjectEdit />} />

        <Route path="/stories" element={<StoryList />} />
        <Route path="/addStory" element={<StoryAdd />} />
        <Route path="/editStory/:id" element={<StoryEdit />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
