import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section>
      <h1 className="h3 mb-1">Mis metas</h1>
      <p className="texto-suave mb-4">Tu ahorro en pesos, convertido a la UF del día en que lo hiciste.</p>

      <div className="tarjeta text-center py-5">
        <p className="mb-3">Aún no tienes metas de ahorro.</p>
        <Link to="/metas/nueva" className="btn btn-primary">
          Crear mi primera meta
        </Link>
      </div>
    </section>
  );
}
