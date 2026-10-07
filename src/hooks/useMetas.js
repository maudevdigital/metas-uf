import { useEffect, useState } from 'react';
import metasIniciales from '../data/metas.json';
import abonosIniciales from '../data/abonos.json';
import { hoyISO } from '../utils/fechas';

const CLAVE_METAS = 'metas-uf:metas';
const CLAVE_ABONOS = 'metas-uf:abonos';

// Si no hay nada guardado (primera visita) o está dañado, se parte con los datos del JSON.
function leerGuardado(clave, valorInicial) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorInicial;
  } catch {
    return valorInicial;
  }
}

export default function useMetas() {
  const [metas, setMetas] = useState(() => leerGuardado(CLAVE_METAS, metasIniciales));
  const [abonos, setAbonos] = useState(() => leerGuardado(CLAVE_ABONOS, abonosIniciales));

  // Cada vez que cambian, se guardan en el navegador para que sobrevivan a una recarga.
  useEffect(() => {
    localStorage.setItem(CLAVE_METAS, JSON.stringify(metas));
  }, [metas]);

  useEffect(() => {
    localStorage.setItem(CLAVE_ABONOS, JSON.stringify(abonos));
  }, [abonos]);

  // Recibe { nombre, icono, objetivoUF, fechaObjetivo } y devuelve el id de la meta creada.
  function agregarMeta(datos) {
    const nueva = { ...datos, id: crypto.randomUUID(), creadaEl: hoyISO() };
    setMetas((actuales) => [...actuales, nueva]);
    return nueva.id;
  }

  // Recibe { metaId, fecha, montoCLP, valorUF }.
  function agregarAbono(datos) {
    const nuevo = { ...datos, id: crypto.randomUUID() };
    setAbonos((actuales) => [...actuales, nuevo]);
  }

  function eliminarAbono(id) {
    setAbonos((actuales) => actuales.filter((abono) => abono.id !== id));
  }

  // Al eliminar una meta también se eliminan sus abonos, para no dejar datos huérfanos.
  function eliminarMeta(id) {
    setMetas((actuales) => actuales.filter((meta) => meta.id !== id));
    setAbonos((actuales) => actuales.filter((abono) => abono.metaId !== id));
  }

  return { metas, abonos, agregarMeta, agregarAbono, eliminarAbono, eliminarMeta };
}
