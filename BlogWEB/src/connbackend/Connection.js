const mysql = require('mysql2/promise');
const { readFileSync } = require('fs');

// Configuración del pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost',
        user: 'root',
        password: '',
        database: 'Blog',
        port: 22801,
        waitForConnections: true,
        connectionLimit: 100,
        queueLimit: 0,
        ssl: {
            ca: readFileSync('src/connbackend/ca-certificate.crt')
        }
});

module.exports = pool;
