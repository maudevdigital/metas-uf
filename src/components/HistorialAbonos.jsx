import { montoEnUF } from '../utils/ahorro';
import { formatearCLP, formatearFecha, formatearUF } from '../utils/formato';

export default function HistorialAbonos({ abonos, onEliminar }) {
  // Del más reciente al más antiguo; se copia el arreglo porque sort() modifica el original.
  const ordenados = [...abonos].sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <div className="tarjeta">
      <h2 className="h6 mb-3">Abonos ({abonos.length})</h2>

      {ordenados.length === 0 ? (
        <p className="texto-suave mb-0">Aún no hay abonos en esta meta.</p>
      ) : (
        <ul className="list-unstyled mb-0 lista-abonos">
          {ordenados.map((abono) => (
            <li key={abono.id} className="d-flex align-items-center gap-3 py-2">
              <div className="flex-grow-1">
                <div className="numero">{formatearCLP(abono.montoCLP)}</div>
                <small className="texto-suave">
                  {formatearFecha(abono.fecha)} · UF {formatearCLP(abono.valorUF, 2)}
                </small>
              </div>
              <span className="numero fw-bold text-nowrap">{formatearUF(montoEnUF(abono))}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                aria-label={`Eliminar abono del ${formatearFecha(abono.fecha)}`}
                onClick={() => onEliminar(abono.id)}
              >
                <i className="bi bi-trash" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
