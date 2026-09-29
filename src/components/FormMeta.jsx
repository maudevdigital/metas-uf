import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUF from '../hooks/useUF';
import { hoyISO } from '../utils/fechas';
import { formatearCLP } from '../utils/formato';
import '../styles/formulario.css';

// Nombres de Bootstrap Icons con una etiqueta para lectores de pantalla.
const ICONOS = [
  { id: 'bullseye', etiqueta: 'Objetivo' },
  { id: 'house-door', etiqueta: 'Vivienda' },
  { id: 'car-front', etiqueta: 'Auto' },
  { id: 'airplane', etiqueta: 'Viaje' },
  { id: 'mortarboard', etiqueta: 'Estudios' },
  { id: 'laptop', etiqueta: 'Tecnología' },
  { id: 'life-preserver', etiqueta: 'Emergencias' },
  { id: 'piggy-bank', etiqueta: 'Ahorro' },
];

const VALORES_VACIOS = { nombre: '', icono: ICONOS[0].id, objetivoUF: '', fechaObjetivo: '' };

function validar(valores) {
  const errores = {};
  const nombre = valores.nombre.trim();
  const objetivo = Number(valores.objetivoUF);

  if (nombre.length < 3) {
    errores.nombre = 'Escribe un nombre de al menos 3 letras.';
  } else if (nombre.length > 40) {
    errores.nombre = 'El nombre no puede pasar de 40 caracteres.';
  }

  if (valores.objetivoUF === '' || !(objetivo > 0)) {
    errores.objetivoUF = 'Ingresa cuántas UF quieres juntar (mayor que 0).';
  } else if (objetivo > 10000) {
    errores.objetivoUF = 'El objetivo no puede superar las 10.000 UF.';
  }

  if (!valores.fechaObjetivo) {
    errores.fechaObjetivo = 'Elige una fecha objetivo.';
  } else if (valores.fechaObjetivo <= hoyISO()) {
    errores.fechaObjetivo = 'La fecha objetivo debe ser posterior a hoy.';
  }

  return errores;
}

export default function FormMeta({ valoresIniciales = VALORES_VACIOS, textoBoton, onGuardar }) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const { hoy } = useUF();
  const navigate = useNavigate();
  const objetivo = Number(valores.objetivoUF);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });
    setErrores({ ...errores, [name]: undefined });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validar(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({
      nombre: valores.nombre.trim(),
      icono: valores.icono,
      objetivoUF: objetivo,
      fechaObjetivo: valores.fechaObjetivo,
    });
  }

  return (
    <form className="tarjeta" onSubmit={enviar} noValidate>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre de la meta
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          placeholder="Ej: Pie del departamento"
          value={valores.nombre}
          onChange={cambiar}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <fieldset className="mb-3">
        <legend className="form-label fs-6">Ícono</legend>
        <div className="d-flex flex-wrap gap-2">
          {ICONOS.map((icono) => (
            <label
              key={icono.id}
              className={`selector-icono ${valores.icono === icono.id ? 'activo' : ''}`}
              title={icono.etiqueta}
            >
              <input
                type="radio"
                name="icono"
                value={icono.id}
                checked={valores.icono === icono.id}
                onChange={cambiar}
                className="visually-hidden"
                aria-label={icono.etiqueta}
              />
              <i className={`bi bi-${icono.id}`} aria-hidden="true" />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6">
          <label htmlFor="objetivoUF" className="form-label">
            Objetivo en UF
          </label>
          <input
            id="objetivoUF"
            name="objetivoUF"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            className={`form-control numero ${errores.objetivoUF ? 'is-invalid' : ''}`}
            placeholder="Ej: 200"
            value={valores.objetivoUF}
            onChange={cambiar}
          />
          {errores.objetivoUF && <div className="invalid-feedback">{errores.objetivoUF}</div>}
          {hoy && objetivo > 0 && !errores.objetivoUF && (
            <div className="form-text">≈ {formatearCLP(objetivo * hoy.valor)} a la UF de hoy</div>
          )}
        </div>

        <div className="col-12 col-sm-6">
          <label htmlFor="fechaObjetivo" className="form-label">
            Fecha objetivo
          </label>
          <input
            id="fechaObjetivo"
            name="fechaObjetivo"
            type="date"
            min={hoyISO()}
            className={`form-control ${errores.fechaObjetivo ? 'is-invalid' : ''}`}
            value={valores.fechaObjetivo}
            onChange={cambiar}
          />
          {errores.fechaObjetivo && <div className="invalid-feedback">{errores.fechaObjetivo}</div>}
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {textoBoton}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}