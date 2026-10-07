import EstadoVacio from '../components/EstadoVacio';
import MetaCard from '../components/MetaCard';
import PanelUF from '../components/PanelUF';
import { totalAhorradoUF } from '../utils/ahorro';

export default function Inicio({ metas, abonos }) {
  return (
    <section>
      <h1 className="h3 mb-1">Mis metas</h1>
      <p className="texto-suave mb-4">Tu ahorro en pesos, convertido a la UF del día en que lo hiciste.</p>

      <PanelUF />

      {metas.length === 0 ? (
        <EstadoVacio
          mensaje="Aún no tienes metas de ahorro."
          textoAccion="Crear mi primera meta"
          destino="/metas/nueva"
        />
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
