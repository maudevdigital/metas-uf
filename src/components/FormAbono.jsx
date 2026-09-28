import { useEffect, useState } from 'react';
import { obtenerUFPorFecha } from '../services/mindicador';
import { hoyISO } from '../utils/fechas';
import { formatearCLP, formatearFecha, formatearUF } from '../utils/formato';

export default function FormAbono({ onAgregar }) {
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(hoyISO());
  const [errores, setErrores] = useState({});
  // Resultado de la última consulta a la API: para qué fecha fue, el valor y el error si lo hubo.
  const [uf, setUF] = useState({ fecha: null, valor: null, error: null });

  const fechaValida = fecha !== '' && fecha <= hoyISO();
  const consultando = fechaValida && uf.fecha !== fecha;
  const montoNumero = Number(monto);

  // Cada vez que cambia la fecha se pide la UF de ese día, para mostrar la conversión antes de guardar.
  useEffect(() => {
    if (!fechaValida) return;

    let cancelado = false;

    obtenerUFPorFecha(fecha)
      .then((valor) => {
        if (!cancelado) setUF({ fecha, valor, error: null });
      })
      .catch((err) => {
        if (!cancelado) setUF({ fecha, valor: null, error: err.message });
      });

    return () => {
      cancelado = true;
    };
  }, [fecha, fechaValida]);

  function validar() {
    const nuevos = {};

    if (!Number.isInteger(montoNumero) || montoNumero <= 0) {
      nuevos.monto = 'Ingresa un monto en pesos, sin decimales y mayor que 0.';
    } else if (montoNumero > 100000000) {
      nuevos.monto = 'El monto no puede superar los $100.000.000.';
    }

    if (!fecha) {
      nuevos.fecha = 'Elige la fecha del abono.';
    } else if (!fechaValida) {
      nuevos.fecha = 'La fecha no puede ser futura.';
    } else if (uf.fecha === fecha && uf.error) {
      nuevos.fecha = uf.error;
    }

    return nuevos;
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0 || consultando) return;

    onAgregar({ fecha, montoCLP: montoNumero, valorUF: uf.valor });
    setMonto('');
  }

  // Solo se muestra si el valor consultado corresponde a la fecha elegida ahora.
  const ufDeLaFecha = uf.fecha === fecha;
  const vistaPrevia = ufDeLaFecha && uf.valor && montoNumero > 0;

  return (
    <form className="tarjeta" onSubmit={enviar} noValidate>
      <h2 className="h6 mb-3">Registrar abono</h2>

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <label htmlFor="monto" className="form-label">
            Monto en pesos
          </label>
          <input
            id="monto"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            className={`form-control numero ${errores.monto ? 'is-invalid' : ''}`}
            placeholder="Ej: 500000"
            value={monto}
            onChange={(e) => {
              setMonto(e.target.value);
              setErrores({ ...errores, monto: undefined });
            }}
          />
          {errores.monto && <div className="invalid-feedback">{errores.monto}</div>}
        </div>

        <div className="col-12 col-sm-6">
          <label htmlFor="fecha" className="form-label">
            Fecha del abono
          </label>
          <input
            id="fecha"
            type="date"
            max={hoyISO()}
            className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
              setErrores({ ...errores, fecha: undefined });
            }}
          />
          {errores.fecha && <div className="invalid-feedback">{errores.fecha}</div>}
        </div>
      </div>

      <div className="vista-previa small my-3" aria-live="polite">
        {consultando && <span className="texto-suave">Consultando la UF del {formatearFecha(fecha)}…</span>}
        {ufDeLaFecha && uf.error && <span className="texto-error">{uf.error}</span>}
        {vistaPrevia && (
          <span>
            {formatearCLP(montoNumero)} ={' '}
            <strong className="numero">{formatearUF(montoNumero / uf.valor)}</strong>{' '}
            <span className="texto-suave">
              (UF del {formatearFecha(fecha)}: {formatearCLP(uf.valor, 2)})
            </span>
          </span>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={consultando}>
        Guardar abono
      </button>
    </form>
  );
}
