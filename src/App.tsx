import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import SideProjects from './pages/SideProjects';
import BuilderLanding from './pages/builder/BuilderLanding';
import MainProjectBuilder from './pages/builder/MainProjectBuilder';
import SideProjectBuilder from './pages/builder/SideProjectBuilder';
import StackBuilder from './pages/builder/StackBuilder';
import Resume from './pages/Resume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/side-projects" element={<SideProjects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/md-builder" element={<BuilderLanding />} />
        <Route path="/md-builder/main-project" element={<MainProjectBuilder />} />
        <Route path="/md-builder/side-project" element={<SideProjectBuilder />} />
        <Route path="/md-builder/stack" element={<StackBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
