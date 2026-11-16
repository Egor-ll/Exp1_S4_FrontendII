// Datos de respaldo para que el catálogo siga disponible si la API mock falla.
// La API REST de MSW usa este mismo arreglo.
export const fallbackCategories = [
  {
    id: 'ficcion',
    name: 'Ficción',
    description: 'Historias que abren otros mundos.',
    color: 'coral',
    books: [
      { title: 'La casa de los nombres', coverPosition: '0% 0%' },
      { title: 'El mapa de las nubes', coverPosition: '50% 0%' },
      { title: 'Días de papel', coverPosition: '100% 0%' },
    ],
  },
  {
    id: 'ciencia-ficcion',
    name: 'Ciencia ficción',
    description: 'Futuros posibles y viajes extraordinarios.',
    color: 'blue',
    books: [
      { title: 'Órbita distante', coverPosition: '0% 25%' },
      { title: 'El último jardín', coverPosition: '50% 25%' },
      { title: 'Mareas de Marte', coverPosition: '100% 25%' },
    ],
  },
  {
    id: 'misterio',
    name: 'Misterio',
    description: 'Pistas, secretos y giros inesperados.',
    color: 'green',
    books: [
      { title: 'La llave de sal', coverPosition: '0% 50%' },
      { title: 'Habitación 13', coverPosition: '50% 50%' },
      { title: 'El caso del faro', coverPosition: '100% 50%' },
    ],
  },
  {
    id: 'fantasia',
    name: 'Fantasía',
    description: 'Magia, criaturas y reinos por descubrir.',
    color: 'violet',
    books: [
      { title: 'El bosque encantado', coverPosition: '0% 75%' },
      { title: 'Corona de ceniza', coverPosition: '50% 75%' },
      { title: 'La ciudad sumergida', coverPosition: '100% 75%' },
    ],
  },
  {
    id: 'romance',
    name: 'Romance',
    description: 'Encuentros, emociones y nuevos comienzos.',
    color: 'pink',
    books: [
      { title: 'Cartas para abril', coverPosition: '0% 100%' },
      { title: 'Un verano contigo', coverPosition: '50% 100%' },
      { title: 'Antes del café', coverPosition: '100% 100%' },
    ],
  },
];
