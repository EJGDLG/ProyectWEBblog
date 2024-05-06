import bcrypt from 'bcryptjs';

// Función modificada para crear un nuevo usuario con contraseña hasheada
async function crearUsuario(username, email, plainPassword) {
    const pool = await crearPoolConexion();
    const conexion = await pool.getConnection();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);  // Hashea la contraseña
    try {
        const [result] = await conexion.execute(`INSERT INTO user (username, email, password) VALUES (?, ?, ?)`, [username, email, hashedPassword]);
        console.log(result);
    } catch (error) {
        console.error('Error al crear usuario:', error);
    } finally {
        conexion.release();
    }
}

// Función modificada para buscar un usuario por email y verificar la contraseña
async function buscarUsuarioPorEmail(email, plainPassword) {
    const pool = await crearPoolConexion();
    const conexion = await pool.getConnection();
    try {
        const [usuarios] = await conexion.execute(`SELECT * FROM user WHERE email = ?`, [email]);
        if (usuarios.length > 0) {
            const user = usuarios[0];
            const isMatch = await bcrypt.compare(plainPassword, user.password);  // Verifica la contraseña
            if (isMatch) {
                console.log("Login successful", user);
            } else {
                console.log("Password incorrect");
            }
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error al buscar usuario:', error);
    } finally {
        conexion.release();
    }
}


// Función para obtener sesiones por periodo del día
const getSesionesPorPeriodo = async (userId, periodo) => {
  // Definir los rangos de tiempo
  let tiempoInicio, tiempoFin;
  switch (periodo) {
    case 'manana':
      tiempoInicio = '06:00:00';
      tiempoFin = '12:00:00';
      break;
    case 'tarde':
      tiempoInicio = '12:01:00';
      tiempoFin = '18:00:00';
      break;
    case 'noche':
      tiempoInicio = '18:01:00';
      tiempoFin = '05:59:59';
      break;
    default:
      throw new Error('Periodo no válido. Debe ser manana, tarde o noche.');
  }

  // Asumimos que las sesiones tienen una columna 'hora_inicio' y una 'hora_fin'
  const query = `
    SELECT * FROM students_Session
    WHERE id_student = ?
      AND ((hora_inicio BETWEEN ? AND ?) OR (hora_fin BETWEEN ? AND ?))
  `;

  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(query, [userId, tiempoInicio, tiempoFin, tiempoInicio, tiempoFin]);
    return results;
  } finally {
    connection.release();
  }
};