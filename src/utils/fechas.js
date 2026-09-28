// Fecha de hoy como AAAA-MM-DD en la hora del computador.
// toISOString() usa hora UTC: después de las 21:00 en Chile ya entregaría el día siguiente.
export function hoyISO() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}
