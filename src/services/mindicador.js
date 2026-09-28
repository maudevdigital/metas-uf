// Comunicacion con la api

const URL_BASE = "https://mindicador.cl/api";
const TIEMPO_MAXIMO_MS = 10000;

// La api pide las fechas como DD-MM-AAAA; los <input type="date"> entregan AAA-MM-DD.

function aFormatoApi(fecha) {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}-${mes}-${anio}`;
}

async function consultar(ruta) {
  let respuesta;

  try {
    respuesta = await fetch(`${URL_BASE}${ruta}`, {
      signal: AbortSignal.timeout(TIEMPO_MAXIMO_MS),
    });
  } catch {
    throw new Error("No hay conexión con mindicador.cl.");
  }

  if (!respuesta.ok) {
    throw new Error("mindicador.cl no pudo entregar el valor de la UF.");
  }

  const datos = await respuesta.json();

  // AAAA-MM-DD recortada y valor en pesos.
  return datos.serie.map((punto) => ({
    fecha: punto.fecha.slice(0, 10),
    valor: punto.valor,
  }));
}

// uf d elos ultimos 31 dias, de la mas antigua a la mas reciente
export async function obtenerSerieUF() {
  const serie = await consultar("/uf");
  return serie.reverse();
}

// valor de la uf en una fecha con formato AAAA-MM-DD
export async function obtenerUFPorFecha(fecha) {
  const serie = await consultar(`/uf/${aFormatoApi(fecha)}`);

  if (serie.length === 0) {
    throw new Error("No hay valor de la UF para esa fecha.");
  }
  return serie[0].valor;
}
