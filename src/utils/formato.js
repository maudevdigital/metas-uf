const formatoUF = new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const formatoFecha = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

// los montos en pesos van sin decimales; el valor de la uf se muestra con 2
export function formatearCLP(monto, decimales = 0) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: decimales,
        maximumFractionDigits:decimales,
    }).format(monto);
}

export function formatearUF(monto) {
    return `${formatoUF.format(monto)} UF`;
}

// recibe fecha interpretada en hora utc y chilena, donde mostraria el dia anterior.
export function formatearFecha(fecha) {
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return formatoFecha.format(new Date(anio, mes - 1, dia));
}


const formatoVariacion = new Intl.NumberFormat('es-CL', {
  signDisplay: 'always',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Variación porcentual con signo: +0,42 % o -0,10 %.
export function formatearVariacion(porcentaje) {
  return `${formatoVariacion.format(porcentaje)} %`;
}
