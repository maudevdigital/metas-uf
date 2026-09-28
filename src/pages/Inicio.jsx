import { Link } from 'react-router-dom';
import MetaCard from '../components/MetaCard';
import { totalAhorradoUF } from '../utils/ahorro';

export default function Inicio({ metas, abonos }) {
  return (
    <section>
      <h1 className="h3 mb-1">Mis metas</h1>
      <p className="texto-suave mb-4">Tu ahorro en pesos, convertido a la UF del día en que lo hiciste.</p>

      {metas.length === 0 ? (
        <div className="tarjeta text-center py-5">
          <p className="mb-3">Aún no tienes metas de ahorro.</p>
          <Link to="/metas/nueva" className="btn btn-primary">
            Crear mi primera meta
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {metas.map((meta) => (
            <div key={meta.id} className="col-12 col-md-6 col-lg-4">
              <MetaCard meta={meta} ahorradoUF={totalAhorradoUF(abonos, meta.id)} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
