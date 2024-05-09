
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
    }
  };
  
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
      } else {
        throw new Error('Error al actualizar la publicación');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const deletePost = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {

      } else {
        throw new Error('Error al eliminar la publicación');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
