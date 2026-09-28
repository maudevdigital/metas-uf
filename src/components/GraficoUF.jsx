const ANCHO = 300;
const ALTO = 80;
const MARGEN = 6;

// Gráfico de línea en SVG propio: cada valor se transforma en un punto (x, y) dentro del recuadro.
export default function GraficoUF({ serie }) {
  const valores = serie.map((punto) => punto.valor);
  const minimo = Math.min(...valores);
  const maximo = Math.max(...valores);
  const rango = maximo - minimo || 1;

  const puntos = serie
    .map((punto, i) => {
      const x = (i / (serie.length - 1)) * ANCHO;
      const y = ALTO - MARGEN - ((punto.valor - minimo) / rango) * (ALTO - 2 * MARGEN);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg
      className="grafico-uf"
      viewBox={`0 0 ${ANCHO} ${ALTO}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Valor de la UF en los últimos ${serie.length} días`}
    >
      <polygon className="grafico-uf-area" points={`0,${ALTO} ${puntos} ${ANCHO},${ALTO}`} />
      <polyline className="grafico-uf-linea" points={puntos} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
