import { delay, http, HttpResponse } from 'msw';
import { fallbackCategories } from '../data/categories.js';

// Estas rutas simulan los endpoints REST que consume la aplicación.
export const handlers = [
  http.get('/api/categories', async ({ request }) => {
    await delay(650);

    const url = new URL(request.url);
    const shouldFail = url.searchParams.get('fail') === 'true';

    if (shouldFail) {
      return HttpResponse.json(
        { message: 'El servicio de categorías no está disponible.' },
        { status: 503 },
      );
    }

    return HttpResponse.json(fallbackCategories);
  }),

  http.get('/api/categories/:id', async ({ params }) => {
    await delay(500);

    const category = fallbackCategories.find((item) => item.id === params.id);

    if (!category) {
      return HttpResponse.json(
        { message: 'No encontramos esa categoría.' },
        { status: 404 },
      );
    }

    return HttpResponse.json(category);
  }),
];
