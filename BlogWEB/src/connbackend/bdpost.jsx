const pool = require('./Connection'); // Importa tu conexión a la base de datos

// Función para crear una nueva publicación
async function createPost(title, content, userId) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    connection.release();
    return result.insertId; // Retorna el ID de la publicación creada
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    throw error;
  }
}

// Función para obtener todas las publicaciones
async function getAllPosts() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM posts');
    connection.release();
    return rows; // Retorna todas las publicaciones
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    throw error;
  }
}

// Función para obtener una publicación por su ID
async function getPostById(postId) {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM posts WHERE id = ?', [postId]);
    connection.release();
    if (rows.length > 0) {
      return rows[0]; // Retorna la publicación encontrada
    } else {
      return null; // Retorna null si no se encontró ninguna publicación con ese ID
    }
  } catch (error) {
    console.error('Error al obtener la publicación por ID:', error);
    throw error;
  }
}

// Función para actualizar una publicación existente
async function updatePost(postId, title, content) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, postId]
    );
    connection.release();
    return result.affectedRows > 0; // Retorna true si se actualizó correctamente, false de lo contrario
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    throw error;
  }
}

// Función para eliminar una publicación existente
async function deletePost(postId) {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('DELETE FROM posts WHERE id = ?', [postId]);
    connection.release();
    return result.affectedRows > 0; // Retorna true si se eliminó correctamente, false de lo contrario
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    throw error;
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
