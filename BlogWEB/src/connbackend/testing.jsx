const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./Connection');  // Asumiendo que tu archivo se llama Connection.js y está en la carpeta backend
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'tu_secreto_aqui'; // Utiliza una variable de entorno para tu secreto

const app = express();
app.use(cors());  // Permite solicitudes CORS de tu frontend
app.use(express.json());  // Para parsear JSON en el cuerpo de las solicitudes


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);  // No token present

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);  // Token invalid or expired
        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);

    // Verificar si el correo pertenece al dominio uvg.edu.gt
    const domainRegex = /@uvg\.edu\.gt$/i;
    if (!domainRegex.test(email)) {
        return res.status(401).json({ success: false, message: "Invalid email domain. Only @uvg.edu.gt is allowed." });
    }

    // Continuar con la lógica de inicio de sesión si el correo es válido
    try {
        const connection = await pool.getConnection();
        try {
            const [results] = await connection.query(
                'SELECT id FROM user WHERE email = ? AND password = ?',
                [email, password]
            );
            console.log(results);  // Ver qué está devolviendo la base de datos
            if (results.length > 0) {
                const user = results[0];
                const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
                res.json({ success: true, message: "Login successful", token });
            } else {
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



// app.get('/sessions', authenticateToken, async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const query = 'SELECT * FROM students_Session WHERE id_student = ?';
//       const [results] = await pool.query(query, [userId]);
//       if (results.length > 0) {
//         res.json(results);
//       } else {
//         // Cambia aquí para enviar una respuesta 200 con un mensaje y un array vacío
//         res.json({ success: true, message: "No sessions found", sessions: [] });
//       }
//     } catch (error) {
//       console.error('Database error:', error);
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   });
  



// Endpoint para obtener sesiones por periodo del día
app.get('/sessions', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const periodo = req.query.periodo; // El periodo puede ser "manana", "tarde", o "noche"
        let query, params;

        console.log("El periodo elegido es: " + periodo);

        if (periodo) {
            const { tiempoInicio, tiempoFin } = getPeriodoTimes(periodo); // Obtiene los tiempos basados en el periodo
            query = `
                SELECT sp.* 
                FROM students_Session ss
                JOIN sessionPlanned sp ON ss.id_session = sp.id
                WHERE ss.id_student = ? AND (
                    (sp.start_hour BETWEEN ? AND ?) OR
                    (sp.end_hour BETWEEN ? AND ?)
                )`;
            params = [userId, tiempoInicio, tiempoFin, tiempoInicio, tiempoFin];
            
        } else {
            query = `
                SELECT sp.* 
                FROM students_Session ss
                JOIN sessionPlanned sp ON ss.id_session = sp.id
                WHERE ss.id_student = ?`;
            params = [userId];
        }

        const [results] = await pool.query(query, params);
        console.log(results);
        if (results.length > 0) {
            res.json({ success: true, sessions: results });
        } else {
            res.json({ success: true, message: "No sessions found", sessions: [] });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Esta función ahora simplemente devuelve los tiempos de inicio y fin para el periodo dado
function getPeriodoTimes(periodo) {
    let tiempoInicio, tiempoFin;
    switch (periodo) {
        case 'manana':
            tiempoInicio = '06:00:00';
            tiempoFin = '11:59:59';
            break;
        case 'tarde':
            tiempoInicio = '12:00:00';
            tiempoFin = '17:59:59';
            break;
        case 'noche':
            tiempoInicio = '18:00:00';
            tiempoFin = '23:59:59';  // Ajuste aquí si necesitas considerar horas después de medianoche
            break;
        default:
            throw new Error('Periodo no válido. Debe ser "manana", "tarde" o "noche".');
    }
    return { tiempoInicio, tiempoFin };
};

  

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});