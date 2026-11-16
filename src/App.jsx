import { Link, Route, Routes } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage.jsx';
import HomePage from './pages/HomePage.jsx';

function NotFoundPage() {
  return (
    <main className="category-page">
      <p className="eyebrow">404 · PÁGINA NO ENCONTRADA</p>
      <h1>Esta página no está en el catálogo.</h1>
      <Link className="button button-dark" to="/">
        Volver a la librería
      </Link>
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="La Página, inicio">
        <span className="brand-mark">LP</span>
        <span>
          la página<span className="brand-dot">.</span>
          <small>LIBRERÍA INDEPENDIENTE</small>
        </span>
      </Link>

      <nav aria-label="Navegación principal">
        <Link to="/">Catálogo</Link>
        <a href="/#categorias">Categorías</a>
      </nav>

      <span className="header-note">LECTURAS CON INTENCIÓN</span>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="brand footer-brand" to="/">
        <span className="brand-mark">LP</span>
        <span>
          la página<span className="brand-dot">.</span>
        </span>
      </Link>
      <span>Historias para abrir con calma.</span>
      <span>© 2026 · PROYECTO FORMATIVO PFY2202</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:id" element={<CategoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SiteFooter />
    </div>
  );
}
