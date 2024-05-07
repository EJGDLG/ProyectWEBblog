const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./Connection');  // Asumiendo que tu archivo se llama Connection.js y está en la carpeta connbackend
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto dinámico o 3000 si no está definido

app.use(cors());  // Permite solicitudes CORS de tu frontend
app.use(bodyParser.json());  // Para parsear JSON en el cuerpo de las solicitudes

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login with email: ${email} and password: ${password}`);

    // Verificar si el correo pertenece al dominio uvg.edu.gt
    const domainRegex = /@uvg.edu.gt$/i; // Cambiado a uvg.edu.gt
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
                const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '2h' });
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
