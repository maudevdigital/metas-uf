import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import NuevaMeta from './pages/NuevaMeta';
import DetalleMeta from './pages/DetalleMeta';
import NoEncontrada from './pages/NoEncontrada';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/metas/nueva" element={<NuevaMeta />} />
          <Route path="/metas/:id" element={<DetalleMeta />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
