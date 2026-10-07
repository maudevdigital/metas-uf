import { montoEnUF } from './ahorro';
import { diasEntre, hoyISO, sumarDias } from './fechas';

const DIAS_POR_MES = 30.44;
const DIAS_MINIMOS_PARA_PROYECTAR = 30;

// Calcula cuánto falta, cuánto hay que ahorrar al mes y cuándo se llegaría al ritmo actual.
export function proyectarMeta(meta, abonosMeta, hoy = hoyISO()) {
  const ahorradoUF = abonosMeta.reduce((total, abono) => total + montoEnUF(abono), 0);
  const faltanteUF = Math.max(meta.objetivoUF - ahorradoUF, 0);
  const diasRestantes = diasEntre(hoy, meta.fechaObjetivo);

  const necesarioMensualUF = diasRestantes > 0 ? faltanteUF / (diasRestantes / DIAS_POR_MES) : null;

  // El ritmo se mide desde el primer abono hasta hoy; con menos de un mes de historia no es confiable.
  let fechaEstimada = null;
  if (abonosMeta.length > 0 && faltanteUF > 0) {
    const primerAbono = abonosMeta.reduce((menor, abono) => (abono.fecha < menor ? abono.fecha : menor), hoy);
    const diasAhorrando = diasEntre(primerAbono, hoy);

    if (diasAhorrando >= DIAS_MINIMOS_PARA_PROYECTAR) {
      const ritmoDiarioUF = ahorradoUF / diasAhorrando;
      fechaEstimada = sumarDias(hoy, Math.ceil(faltanteUF / ritmoDiarioUF));
    }
  }

  return { ahorradoUF, faltanteUF, necesarioMensualUF, fechaEstimada };
}
