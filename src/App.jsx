import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import NuevaMeta from './pages/NuevaMeta';
import DetalleMeta from './pages/DetalleMeta';
import NoEncontrada from './pages/NoEncontrada';
import useMetas from './hooks/useMetas';

export default function App() {
  // El estado vive aquí para que todas las páginas vean los mismos datos.
  const { metas, abonos, agregarMeta, agregarAbono, eliminarAbono, eliminarMeta } = useMetas();

  return (
    <div className="app">
      <Navbar />
      <main className="container py-4 flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio metas={metas} abonos={abonos} />} />
          <Route path="/metas/nueva" element={<NuevaMeta onAgregarMeta={agregarMeta} />} />
          <Route
            path="/metas/:id"
            element={
              <DetalleMeta
                metas={metas}
                abonos={abonos}
                onAgregarAbono={agregarAbono}
                onEliminarAbono={eliminarAbono}
                onEliminarMeta={eliminarMeta}
              />
            }
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
