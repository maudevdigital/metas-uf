import { Link } from "react-router-dom";
import BarraProgreso from "./BarraProgreso";
import EtiquetaEstado from "./EtiquetaEstado";
import { estadoMeta } from "../utils/ahorro";
import { formatearFecha, formatearUF } from "../utils/formato";

export default function MetaCard({ meta, ahorradoUF }) {
  const porcentaje = (ahorradoUF / meta.objetivoUF) * 100;

  return (
    <Link
      to={`/metas/${meta.id}`}
      className="tarjeta tarjeta-meta d-block h-100"
    >
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="icono-meta" aria-hidden="true">
          <i className={`bi bi-${meta.icono}`} />
        </span>

        <div>
          <h2 className="h6 mb-0">{meta.nombre}</h2>
          <small className="texto-suave">
            Para el {formatearFecha(meta.fechaObjetivo)}
          </small>
        </div>
        <div className="ms-auto">
          <EtiquetaEstado estado={estadoMeta(meta, ahorradoUF)} />
        </div>
      </div>

      <BarraProgreso porcentaje={porcentaje} />

      <div className="d-flex justify-content-between mt-2 small">
        <span className="numero">
          {formatearUF(ahorradoUF)}{" "}
          <span className="texto-suave">de {formatearUF(meta.objetivoUF)}</span>
        </span>
        <span className="numero fw-bold">{Math.floor(porcentaje)} %</span>
      </div>
    </Link>
  );
}
