// Fecha de hoy como AAAA-MM-DD en la hora del computador.
// toISOString() usa hora UTC: después de las 21:00 en Chile ya entregaría el día siguiente.
export function hoyISO() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Días entre dos fechas AAAA-MM-DD. Se calcula en UTC para que el cambio de horario no reste una hora.
export function diasEntre(desde, hasta) {
  const [a1, m1, d1] = desde.split('-').map(Number);
  const [a2, m2, d2] = hasta.split('-').map(Number);
  return (Date.UTC(a2, m2 - 1, d2) - Date.UTC(a1, m1 - 1, d1)) / 86400000;
}

// Suma días a una fecha AAAA-MM-DD y devuelve otra fecha AAAA-MM-DD.
export function sumarDias(fecha, dias) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const resultado = new Date(Date.UTC(anio, mes - 1, dia + dias));
  return resultado.toISOString().slice(0, 10);
}
