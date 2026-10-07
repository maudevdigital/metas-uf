import { diasEntre, hoyISO } from './fechas';

// Cada abono guarda la UF del día en que se hizo, así su equivalencia no cambia con el tiempo.
export function montoEnUF(abono) {
  return abono.montoCLP / abono.valorUF;
}

export function totalAhorradoUF(abonos, metaId) {
  return abonos
    .filter((abono) => abono.metaId === metaId)
    .reduce((total, abono) => total + montoEnUF(abono), 0);
}

// cumplida: se juntó el objetivo. vencida: pasó la fecha sin cumplirla.
// atrasada: el avance va por debajo del tiempo transcurrido.
export function estadoMeta(meta, ahorradoUF, hoy = hoyISO()) {
  if (ahorradoUF >= meta.objetivoUF) return 'cumplida';
  if (meta.fechaObjetivo < hoy) return 'vencida';

  const avanceEsperado = diasEntre(meta.creadaEl, hoy) / diasEntre(meta.creadaEl, meta.fechaObjetivo);
  const avanceReal = ahorradoUF / meta.objetivoUF;

  return avanceReal < avanceEsperado ? 'atrasada' : 'al-dia';
}
