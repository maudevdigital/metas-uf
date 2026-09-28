import { useParams } from 'react-router-dom';

export default function DetalleMeta() {
  const { id } = useParams();

  return (
    <section>
      <h1 className="h3 mb-1">Meta #{id}</h1>
      <p className="texto-suave mb-4">Avance, abonos y proyección de esta meta.</p>
    </section>
  );
}
