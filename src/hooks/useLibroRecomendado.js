import { useState } from 'react';

export function useLibroRecomendado() {
  const [cargandoApi, setCargandoApi] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [libroRecomendado, setLibroRecomendado] = useState(null);

  const buscarLibroPorCategoria = async (categoria) => {
    if (!categoria || !categoria.trim()) {
      setErrorApi('Ingresa una categoría válida para buscar recomendaciones.');
      return null;
    }

    setCargandoApi(true);
    setErrorApi(null);

    try {
      const query = encodeURIComponent(categoria.trim());
      const respuesta = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`);
      
      if (!respuesta.ok) {
        throw new Error(`Error en el servidor de Open Library (código: ${respuesta.status})`);
      }

      const datos = await respuesta.json();

      if (datos && datos.docs && datos.docs.length > 0) {
        const libros = datos.docs;
        const libroAleatorio = libros[Math.floor(Math.random() * libros.length)];
        
        const titulo = libroAleatorio.title || 'Libro especializado';
        const autor = libroAleatorio.author_name ? libroAleatorio.author_name[0] : 'Autor desconocido';
        const anio = libroAleatorio.first_publish_year ? ` (${libroAleatorio.first_publish_year})` : '';
        const textoRecomendacion = `📚 Lectura recomendada: "${titulo}" por ${autor}${anio}.`;

        const resultado = {
          titulo,
          autor,
          textoRecomendacion
        };

        setLibroRecomendado(resultado);
        return textoRecomendacion;
      } else {
        const fallback = `📚 Explora bibliografía recomendada sobre ${categoria.trim()} para profundizar.`;
        setLibroRecomendado({ titulo: categoria, autor: 'Varios', textoRecomendacion: fallback });
        return fallback;
      }
    } catch (error) {
      console.log('[OpenLibrary API] Error de conexión:', error);
      setErrorApi('No se pudo conectar con Open Library. Verifica tu conexión a internet.');
      return null;
    } finally {
      setCargandoApi(false);
    }
  };

  const limpiarLibro = () => {
    setLibroRecomendado(null);
    setErrorApi(null);
  };

  return {
    cargandoApi,
    errorApi,
    libroRecomendado,
    buscarLibroPorCategoria,
    limpiarLibro
  };
}
