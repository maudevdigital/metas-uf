import useUF from '../hooks/useUF';
import GraficoUF from './GraficoUF';
import { formatearCLP, formatearFecha, formatearVariacion } from '../utils/formato';

export default function PanelUF() {
  const { serie, hoy, cargando, error, reintentar } = useUF();

  if (cargando) {
    return (
      <div className="tarjeta mb-4 d-flex align-items-center gap-2 texto-suave">
        <span className="spinner-border spinner-border-sm" aria-hidden="true" />
        Consultando el valor de la UF…
      </div>
    );
  }

  // Si la API responde sin valores, hoy queda vacío: se trata igual que un error.
  if (error || !hoy) {
    return (
      <div className="tarjeta mb-4 d-flex flex-wrap align-items-center gap-3" role="alert">
        <span>
          <i className="bi bi-exclamation-triangle me-2 texto-alerta" aria-hidden="true" />
          {error ?? 'mindicador.cl no entregó valores de la UF.'}
        </span>
        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={reintentar}>
          Reintentar
        </button>
      </div>
    );
  }

  const primero = serie[0];
  const variacion = ((hoy.valor - primero.valor) / primero.valor) * 100;

  return (
    <div className="tarjeta mb-4">
      <div className="row g-3 align-items-center">
        <div className="col-12 col-md-4">
          <p className="texto-suave small mb-1">UF de hoy · {formatearFecha(hoy.fecha)}</p>
          <p className="numero fs-3 fw-bold mb-1">{formatearCLP(hoy.valor, 2)}</p>
          <p className="small mb-0">
            <span className="numero texto-info">{formatearVariacion(variacion)}</span>{' '}
            <span className="texto-suave">en {serie.length - 1} días</span>
          </p>
        </div>
        <div className="col-12 col-md-8">
          <GraficoUF serie={serie} />
          <div className="d-flex justify-content-between small texto-suave">
            <span>{formatearFecha(primero.fecha)}</span>
            <span>{formatearFecha(hoy.fecha)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
