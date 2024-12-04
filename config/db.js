const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Função assíncrona para testar a conexão com a base de dados
async function testConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log('Connected to the MySQL database.');
        connection.release(); // Libera a conexão de volta ao pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection();

module.exports = promisePool; // Exporta o pool de conexões
