const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

// Configuración del pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    port: 3306, // Puerto predeterminado de MySQL
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
    ssl: {
        ca: readFileSync('./connbackend/ca-certificate.crt') // Ruta al certificado
    }
});

module.exports = pool;
