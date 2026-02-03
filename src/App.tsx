import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SideProjects from './pages/SideProjects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/side-projects" element={<SideProjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
