import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingState from '../components/LoadingState.jsx';
import { fallbackCategories } from '../data/categories.js';
import { getCategories } from '../services/categoriesApi.js';

const categorySymbols = ['✳', '◉', '⌕', '✧', '♡'];

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">UN BUEN LIBRO CAMBIA EL DÍA</p>
        <h1>
          Encuentra tu
          <br />
          <em>próxima historia.</em>
        </h1>
        <p className="hero-description">
          Una selección para perderse, aprender y volver con nuevas ideas.
        </p>
        <a className="button button-light" href="#categorias">
          Explorar categorías <span aria-hidden="true">↓</span>
        </a>
      </div>

      <div className="hero-art" aria-label="Ilustración de libros apilados">
        <div className="sun" />
        <div className="book-stack" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <span className="art-caption">LECTURAS PARA TODOS</span>
      </div>

      <div className="hero-index" aria-hidden="true">
        01 <span /> 05
      </div>
    </section>
  );
}

function CategoryCard({ category, index }) {
  return (
    <Link
      className={`category-card ${category.color}`}
      to={`/categoria/${category.id}`}
    >
      <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
      <span className="card-symbol" aria-hidden="true">
        {categorySymbols[index % categorySymbols.length]}
      </span>
      <span className="card-title">{category.name}</span>
      <span className="card-description">{category.description}</span>
      <span className="card-arrow" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}

function CategoriesSection({ categories, loading, error, onRetry, usingFallback }) {
  return (
    <section className="categories-section" id="categorias">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ELIGE POR DÓNDE EMPEZAR</p>
          <h2>Explora la librería</h2>
        </div>
        <span className="section-count">
          {String(categories.length).padStart(2, '0')} CATEGORÍAS
        </span>
      </div>

      {loading && <LoadingState label="Buscando categorías…" />}

      {!loading && error && (
        <div className="inline-error">
          <p role="alert">
            {error}{' '}
            {usingFallback && 'Mostramos una selección guardada mientras vuelve el servicio.'}
          </p>
          <button className="text-button" onClick={onRetry}>
            Reintentar conexión
          </button>
        </div>
      )}

      {!loading && categories.length > 0 && (
        <div className="category-grid">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  async function loadCategories(force = false) {
    if (force && new URLSearchParams(window.location.search).has('fail')) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    setLoading(true);
    setError('');
    setUsingFallback(false);

    try {
      const options = force ? { force: true } : undefined;
      const result = await getCategories(options);
      setCategories(result);
    } catch (requestError) {
      setError(requestError.message);
      setCategories(fallbackCategories);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <HeroSection />
      <CategoriesSection
        categories={categories}
        loading={loading}
        error={error}
        usingFallback={usingFallback}
        onRetry={() => loadCategories(true)}
      />
    </>
  );
}
