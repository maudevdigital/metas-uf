import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <header className="navbar navbar-expand-md barra-navegacion">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" onClick={cerrarMenu}>
          <img src="/logo.svg" alt="" width="28" height="28" />
          <span className="fw-bold">Metas UF</span>
        </Link>

        <button
          type="button"
          className="navbar-toggler"
          aria-controls="menu-principal"
          aria-expanded={menuAbierto}
          aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <nav id="menu-principal" className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto gap-md-2">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link" onClick={cerrarMenu}>
                Mis metas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/metas/nueva" className="btn btn-primary btn-sm mt-2 mt-md-0" onClick={cerrarMenu}>
                + Nueva meta
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
