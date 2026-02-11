import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          📚 Minha Biblioteca
        </Link>
        
        <nav className="nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Início
          </Link>
          <Link to="/buscar" className={`nav-link ${isActive('/buscar')}`}>
            🔍 Buscar
          </Link>
          <Link to="/categorias/quero-ler" className={`nav-link ${isActive('/categorias/quero-ler')}`}>
            Quero Ler
          </Link>
          <Link to="/categorias/lendo" className={`nav-link ${isActive('/categorias/lendo')}`}>
            Lendo
          </Link>
          <Link to="/categorias/lidos" className={`nav-link ${isActive('/categorias/lidos')}`}>
            Já Li
          </Link>
          <Link to="/adicionar" className={`nav-link btn-add ${isActive('/adicionar')}`}>
            + Adicionar Livro
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
