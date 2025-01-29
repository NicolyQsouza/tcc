const db = require('../config/db');

const Procedimentos = {
    // Criar um novo procedimento
    create: (procedimento, callback) => {
        const { nome, descricao, valor } = procedimento;
        const query = 'INSERT INTO procedimentos (nome, descricao, valor) VALUES (?, ?, ?)';
        db.query(query, [nome, descricao, valor], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId); // Retorna o ID do novo procedimento
        });
    },

    // Obter todos os procedimentos
    getAll: (callback) => {
        const query = 'SELECT * FROM procedimentos';
        db.query(query, (err, result) => {
            if (err) {
                console.error('Erro ao buscar procedimentos:', err);
                return callback(err);
            }
            if (!result || result.length === 0) {
                console.log('Nenhum procedimento encontrado.');
                return callback(null, []); // Retorna um array vazio se não houver resultados
            }
            callback(null, result); // Retorna os procedimentos encontrados
        });
    },

    // Obter um procedimento pelo código
    getById: (cod, callback) => {
        const query = 'SELECT * FROM procedimentos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]); // Retorna o procedimento ou undefined se não encontrado
        });
    },

    // Atualizar um procedimento existente
    update: (cod, procedimento, callback) => {
        const { nome, descricao, valor } = procedimento;
        const query = 'UPDATE procedimentos SET nome = ?, descricao = ?, valor = ? WHERE cod = ?';
        db.query(query, [nome, descricao, valor, cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na atualização
        });
    },

    // Deletar um procedimento
    delete: (cod, callback) => {
        const query = 'DELETE FROM procedimentos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na exclusão
        });
    }
};

module.exports = Procedimentos;
