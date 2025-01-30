// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();  // Carrega as variáveis de ambiente do .env

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
    host: process.env.DB_HOST,        // Ex: localhost
    user: process.env.DB_USER,        // Ex: root
    password: process.env.DB_PASSWORD,  // Senha do banco de dados
    database: process.env.DB_NAME     // Nome do banco de dados
});

// Verifica se a conexão foi estabelecida corretamente
connection.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection; // Exporta a conexão para ser utilizada nos modelos
