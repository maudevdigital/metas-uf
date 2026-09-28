import { Link, useNavigate, useParams } from 'react-router-dom';
import BarraProgreso from '../components/BarraProgreso';
import FormAbono from '../components/FormAbono';
import HistorialAbonos from '../components/HistorialAbonos';
import ProyeccionMeta from '../components/ProyeccionMeta';
import useUF from '../hooks/useUF';
import { proyectarMeta } from '../utils/proyeccion';
import { formatearCLP, formatearFecha, formatearUF } from '../utils/formato';

export default function DetalleMeta({ metas, abonos, onAgregarAbono, onEliminarAbono, onEliminarMeta }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hoy } = useUF();

  const meta = metas.find((m) => m.id === id);

  if (!meta) {
    return (
      <section className="text-center py-5">
        <h1 className="h3 mb-2">Meta no encontrada</h1>
        <p className="texto-suave mb-4">Puede que la hayas eliminado.</p>
        <Link to="/" className="btn btn-primary">
          Volver a mis metas
        </Link>
      </section>
    );
  }

  const abonosMeta = abonos.filter((abono) => abono.metaId === meta.id);
  const proyeccion = proyectarMeta(meta, abonosMeta);
  const porcentaje = (proyeccion.ahorradoUF / meta.objetivoUF) * 100;

  function eliminarMeta() {
    if (window.confirm(`¿Eliminar la meta "${meta.nombre}" y todos sus abonos?`)) {
      onEliminarMeta(meta.id);
      navigate('/');
    }
  }

  return (
    <section>
      <Link to="/" className="d-inline-block mb-3 texto-suave text-decoration-none">
        <i className="bi bi-arrow-left me-1" aria-hidden="true" />
        Mis metas
      </Link>

      <div className="d-flex align-items-center gap-3 mb-4">
        <span className="icono-meta" aria-hidden="true">
          <i className={`bi bi-${meta.icono}`} />
        </span>
        <div className="flex-grow-1">
          <h1 className="h3 mb-0">{meta.nombre}</h1>
          <p className="texto-suave mb-0">Para el {formatearFecha(meta.fechaObjetivo)}</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm text-nowrap"
          aria-label="Eliminar meta"
          onClick={eliminarMeta}
        >
          <i className="bi bi-trash" aria-hidden="true" />
          <span className="d-none d-sm-inline ms-1">Eliminar</span>
        </button>
      </div>

      <div className="tarjeta mb-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-2">
          <p className="mb-0">
            <span className="numero fs-4 fw-bold">{formatearUF(proyeccion.ahorradoUF)}</span>{' '}
            <span className="texto-suave">de {formatearUF(meta.objetivoUF)}</span>
          </p>
          <span className="numero fw-bold">{Math.floor(porcentaje)} %</span>
        </div>
        <BarraProgreso porcentaje={porcentaje} />
        {proyeccion.faltanteUF > 0 && (
          <p className="small texto-suave mt-2 mb-0">
            Te faltan <span className="numero">{formatearUF(proyeccion.faltanteUF)}</span>
            {hoy && <> ≈ {formatearCLP(proyeccion.faltanteUF * hoy.valor)} a la UF de hoy</>}
          </p>
        )}
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-6 d-flex flex-column gap-3">
          <FormAbono onAgregar={(datos) => onAgregarAbono({ ...datos, metaId: meta.id })} />
          <ProyeccionMeta meta={meta} proyeccion={proyeccion} valorUFHoy={hoy?.valor} />
        </div>
        <div className="col-12 col-lg-6">
          <HistorialAbonos abonos={abonosMeta} onEliminar={onEliminarAbono} />
        </div>
      </div>
    </section>
  );
}
