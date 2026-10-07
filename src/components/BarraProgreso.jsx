export default function BarraProgreso({ porcentaje }) {
  // Una meta puede superarse (105 %), pero la barra no pasa del ancho total.
  const ancho = Math.min(porcentaje, 100);

  return (
    <div
      className="progress barra-progreso"
      role="progressbar"
      aria-label="Avance de la meta"
      aria-valuenow={Math.round(ancho)}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div className="progress-bar" style={{ width: `${ancho}%` }} />
    </div>
  );
}
