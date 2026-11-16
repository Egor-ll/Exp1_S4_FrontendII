# La Página — Librería (PFY2202)

Aplicación formativa para explorar categorías de una tienda de libros. Está hecha con React, JavaScript, HTML y CSS; usa React Router para la navegación y Mock Service Worker (MSW) 2 para simular una API REST local.

## Requisitos

- Node.js LTS instalado (incluye npm).
- Visual Studio Code o IntelliJ IDEA.

## Preparar el proyecto

Abre la carpeta del proyecto en el editor y, en su terminal integrada, ejecuta:

```powershell
npm install
npx msw init public/ --save
npm run dev
```

Abre en el navegador la dirección local que Vite muestra en la terminal, normalmente `http://localhost:5173`. MSW intercepta las peticiones en el navegador; no necesitas instalar ni iniciar un servidor backend aparte.

## Navegación y API

- `/` consulta `GET /api/categories` y presenta las categorías.
- `/categoria/:id` consulta `GET /api/categories/:id` y muestra lecturas recomendadas.
- Cada libro tiene una ilustración local en `public/book-covers.png`; el catálogo muestra una ilustración distinta para cada título.
- El service worker `public/mockServiceWorker.js` intercepta las peticiones durante el desarrollo; se genera con el comando `npx msw init public/ --save`.
- La portada y el detalle tienen su propio indicador de carga y tratamiento de errores.
- Si falla la consulta de categorías, la portada explica el problema y muestra una selección local de respaldo. El botón permite reintentar.
- La capa de servicio conserva promesas/respuestas en caché durante la sesión y descarta entradas fallidas. Así se evitan consultas repetidas al volver a una vista.
- El mock simula latencia para que sea posible observar los estados de carga.

## Organización del código

- `src/data/categories.js`: categorías, libros e ilustraciones.
- `src/mocks/handlers.js`: respuestas REST simuladas con MSW.
- `src/services/categoriesApi.js`: peticiones HTTP, errores y caché.
- `src/pages/`: páginas de inicio y detalle de categoría.
- `src/components/`: estados de carga y error reutilizables.
- `src/styles.css`: estilos del sitio y diseño adaptable a pantallas pequeñas.

## Comprobación manual

1. Ejecuta `npm run dev`, abre la portada y observa el indicador mientras se carga el catálogo.
2. Selecciona una categoría y verifica la ruta `/categoria/ficcion` (o el identificador elegido), su indicador y la lista de lecturas.
3. Abre una ruta inexistente como `/categoria/no-existe`: debe aparecer un mensaje 404 y una acción para volver a intentar.
4. Para ver la alternativa cuando falla el listado, abre `/` y agrega `?fail=true` a la dirección, por ejemplo `http://localhost:5173/?fail=true`. Debe mostrarse el aviso y el catálogo guardado localmente. Pulsa **Reintentar conexión** para repetir la solicitud.
5. Usa los enlaces de navegación y vuelve a la portada; las solicitudes exitosas se reutilizan desde la caché.

## Publicar en GitHub

La pauta solicita que el repositorio se llame `hospital-nombre-apellido-siglaCurso`. Reemplaza cada segmento con los datos indicados por tu docente y usa la sigla del curso `PFY2202` (por ejemplo, `hospital-ana-perez-PFY2202`). Crea un repositorio vacío con ese nombre en GitHub. Luego, desde la terminal de esta carpeta:

```powershell
git init
git add .
git commit -m "Crear tienda de libros para PFY2202"
git branch -M main
git remote add origin https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
git push -u origin main
```

Sustituye `USUARIO` y `NOMBRE-DEL-REPOSITORIO` por los valores reales. Comparte la URL del repositorio con tu docente. No incluyas `node_modules` ni `dist`; están excluidos por `.gitignore`.

## Tecnologías

React · Vite · JavaScript · HTML · CSS · React Router DOM · MSW 2 · Fetch API
