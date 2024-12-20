const db = require('../config/db');

const Feedback = {
    // Criar um novo feedback
    create: (feedback, callback) => {
        const { clientes, foto, comentario, avaliacao } = feedback;
        const query = 'INSERT INTO feedbacks (clientes, foto, comentario, avaliacao) VALUES (?, ?, ?, ?)';
        db.query(query, [clientes, foto, comentario, avaliacao], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o ID do novo feedback
        });
    },

    // Obter feedback por ID
    findById: (id, callback) => {
        const query = `
            SELECT feedbacks.*, clientes.nome AS cliente_nome 
            FROM feedbacks 
            JOIN clientes ON feedbacks.clientes = clientes.cod 
            WHERE feedbacks.cod = ?`;
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna o feedback ou null se não encontrado
        });
    },

    // Atualizar um feedback existente
    update: (cod, feedback, callback) => {
        const { clientes, foto, comentario, avaliacao } = feedback;
        const query = `
            UPDATE feedbacks 
            SET clientes = ?, foto = ?, comentario = ?, avaliacao = ? 
            WHERE cod = ?`;
        db.query(query, [clientes, foto, comentario, avaliacao, cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Deletar um feedback
    delete: (id, callback) => {
        const query = 'DELETE FROM feedbacks WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Obter todos os feedbacks, com filtro opcional por cliente
    getAll: (cliente, callback) => {
        let query = `
            SELECT feedbacks.cod, feedbacks.clientes, feedbacks.foto, feedbacks.comentario, feedbacks.avaliacao, clientes.nome AS cliente_nome 
            FROM feedbacks 
            JOIN clientes ON feedbacks.clientes = clientes.cod`;

        const params = [];
        if (cliente) {
            query += ' WHERE feedbacks.clientes = ?';
            params.push(cliente);
        }

        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Feedback;
