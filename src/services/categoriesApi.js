const requestCache = new Map();

async function requestJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload.message || `La solicitud respondió con error ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

function getCachedRequest(cacheKey, url, { force = false } = {}) {
  if (!force && requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }

  const request = requestJson(url).catch((error) => {
    // No guardamos fallos: el usuario debe poder reintentar la solicitud.
    requestCache.delete(cacheKey);
    throw error;
  });

  requestCache.set(cacheKey, request);
  return request;
}

export function getCategories(options) {
  const shouldSimulateFailure =
    new URLSearchParams(window.location.search).get('fail') === 'true';
  const query = shouldSimulateFailure ? '?fail=true' : '';

  return getCachedRequest('categories', `/api/categories${query}`, options);
}

export function getCategory(id, options) {
  const encodedId = encodeURIComponent(id);
  const url = `/api/categories/${encodedId}`;

  return getCachedRequest(`category:${id}`, url, options);
}
