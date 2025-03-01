import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectAdd from './components/ProjectAdd';
import ProjectEdit from './components/ProjectEdit';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/add" element={<ProjectAdd />} />
        <Route path="/edit/:id" element={<ProjectEdit />} />
      </Routes>
    </Router>

    </>
  )
}

export default App
