// Función para obtener todas las publicaciones
const getAllPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        return data.posts;
      } else {
        throw new Error('Error al obtener las publicaciones');
      }
    } catch (error) {
      console.error(error);
      // Manejo de errores
    }
  };
  
  // Función para actualizar una publicación
  const updatePost = async (postId, newData) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (response.ok) {
        // La publicación se actualizó correctamente
      } else {
        throw new Error('Error al actualizar la publicación');
      }
    } catch (error) {
      console.error(error);
      // Manejo de errores
    }
  };
  
  // Función para eliminar una publicación
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // La publicación se eliminó correctamente
      } else {
        throw new Error('Error al eliminar la publicación');
      }
    } catch (error) {
      console.error(error);
      // Manejo de errores
    }
  };
  
