import { Link } from 'react-router-dom';

// Mensaje para cuando una lista no tiene elementos, con una acción opcional para empezar.
export default function EstadoVacio({ mensaje, textoAccion, destino }) {
  return (
    <div className="tarjeta text-center py-5">
      <p className="texto-suave mb-3">{mensaje}</p>
      {textoAccion && (
        <Link to={destino} className="btn btn-primary">
          {textoAccion}
        </Link>
      )}
    </div>
  );
}
