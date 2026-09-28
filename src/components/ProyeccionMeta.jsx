import { formatearCLP, formatearFecha, formatearUF } from '../utils/formato';

export default function ProyeccionMeta({ meta, proyeccion, valorUFHoy }) {
  const { faltanteUF, necesarioMensualUF, fechaEstimada } = proyeccion;

  if (faltanteUF === 0) {
    return (
      <div className="tarjeta">
        <h2 className="h6 mb-2">Proyección</h2>
        <p className="mb-0 texto-exito">
          <i className="bi bi-check-circle me-2" aria-hidden="true" />
          ¡Cumpliste la meta!
        </p>
      </div>
    );
  }

  const llegaTarde = fechaEstimada && fechaEstimada > meta.fechaObjetivo;

  return (
    <div className="tarjeta">
      <h2 className="h6 mb-3">Proyección</h2>

      {necesarioMensualUF === null ? (
        <p className="texto-error">La fecha objetivo ya pasó.</p>
      ) : (
        <p>
          Para llegar al {formatearFecha(meta.fechaObjetivo)} necesitas ahorrar{' '}
          <strong className="numero">{formatearUF(necesarioMensualUF)}</strong> al mes
          {valorUFHoy && (
            <span className="texto-suave">
              {' '}
              (≈ {formatearCLP(necesarioMensualUF * valorUFHoy)} a la UF de hoy)
            </span>
          )}
          .
        </p>
      )}

      {fechaEstimada ? (
        <p className={`mb-0 ${llegaTarde ? 'texto-alerta' : 'texto-exito'}`}>
          A tu ritmo actual llegarías el <strong>{formatearFecha(fechaEstimada)}</strong>
          {llegaTarde ? ', después de tu fecha objetivo.' : ', antes de tu fecha objetivo.'}
        </p>
      ) : (
        <p className="texto-suave mb-0">Con al menos un mes de abonos se puede estimar cuándo llegarás.</p>
      )}
    </div>
  );
}
