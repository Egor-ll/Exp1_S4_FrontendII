import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { getCategory } from '../services/categoriesApi.js';

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCategory(force = false) {
    setLoading(true);
    setError('');

    try {
      const options = force ? { force: true } : undefined;
      const result = await getCategory(id, options);
      setCategory(result);
    } catch (requestError) {
      setError(requestError.message);
      setCategory(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
  }, [id]);

  return (
    <main className="category-page">
      <Link className="back-link" to="/">
        ← Volver a categorías
      </Link>

      {loading && <LoadingState label="Cargando esta categoría…" />}

      {!loading && error && (
        <ErrorState
          message={error}
          onRetry={() => loadCategory(true)}
          fallbackMessage="Puedes volver a la portada y elegir otra categoría."
        />
      )}

      {!loading && !error && category && (
        <>
          <p className="eyebrow">SELECCIÓN DE LA LIBRERÍA</p>
          <h1>{category.name}</h1>
          <p className="category-intro">{category.description}</p>

          <section className="book-list" aria-labelledby="book-list-title">
            <div className="book-list-heading">
              <h2 id="book-list-title">Lecturas recomendadas</h2>
              <span>{category.books.length} libros</span>
            </div>

            <div className="book-grid">
              {category.books.map((book, index) => (
                <article className="book-card" key={book.title}>
                  <div
                    className="book-cover"
                    role="img"
                    aria-label={`Ilustración para ${book.title}`}
                    style={{ '--cover-position': book.coverPosition }}
                  />
                  <div className="book-info">
                    <span className="book-index">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{book.title}</h3>
                    <p>Una lectura elegida por nuestro equipo</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
