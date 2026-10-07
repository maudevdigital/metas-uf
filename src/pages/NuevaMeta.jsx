import { useNavigate } from 'react-router-dom';
import FormMeta from '../components/FormMeta';

export default function NuevaMeta({ onAgregarMeta }) {
  const navigate = useNavigate();

  function guardar(datos) {
    onAgregarMeta(datos);
    navigate('/');
  }

  return (
    <section className="contenido-angosto">
      <h1 className="h3 mb-1">Nueva meta</h1>
      <p className="texto-suave mb-4">Define cuántas UF quieres juntar y para cuándo.</p>
      <FormMeta textoBoton="Crear meta" onGuardar={guardar} />
    </section>
  );
}
