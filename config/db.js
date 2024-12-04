const mysql = require('mysql2');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Criação do pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Função assíncrona para testar a conexão com o banco de dados
async function testConnection() {
    try {
        // Obtendo uma conexão do pool
        const connection = await promisePool.getConnection();
        
        // Verificando se a conexão foi bem-sucedida
        console.log('Conectado ao banco de dados MySQL.');
        
        // Liberando a conexão de volta para o pool
        connection.release();
    } catch (err) {
        // Em caso de erro, mostramos o erro no console
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

// Chama a função para testar a conexão
testConnection();

// Exporta o pool de conexões para uso em outros módulos
module.exports = promisePool;
