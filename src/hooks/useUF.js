import { useEffect, useState } from 'react';
import { obtenerSerieUF } from '../services/mindicador';

export default function useUF() {
  const [serie, setSerie] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    // si el componente se desmonta antes de que llegue la respuesta, no se actualiza el estado.
    let cancelado = false;

    obtenerSerieUF()
      .then((datos) => {
        if (!cancelado) setSerie(datos);
      })
      .catch((err) => {
        if (!cancelado) setError(err.message);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [intento]);

  function reintentar() {
    setCargando(true);
    setError(null);
    setIntento(intento + 1);
  }

  const hoy = serie.length > 0 ? serie[serie.length - 1] : null;

  return { serie, hoy, cargando, error, reintentar };
}
