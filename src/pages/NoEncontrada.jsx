import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <section className="text-center py-5">
      <h1 className="h3 mb-2">Página no encontrada</h1>
      <p className="texto-suave mb-4">La dirección que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver a mis metas
      </Link>
    </section>
  );
}
