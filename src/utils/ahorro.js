// Cada abono guarda la UF del día en que se hizo, así su equivalencia no cambia con el tiempo.
export function montoEnUF(abono) {
  return abono.montoCLP / abono.valorUF;
}

export function totalAhorradoUF(abonos, metaId) {
  return abonos
    .filter((abono) => abono.metaId === metaId)
    .reduce((total, abono) => total + montoEnUF(abono), 0);
}
