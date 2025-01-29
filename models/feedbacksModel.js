// models/feedbacksModel.js
const db = require('../config/db');

const Feedback = {
    // Função para criar feedback
    create: (feedback, callback) => {
        const { cliente, foto, comentario, avaliacao } = feedback;
        const query = 'INSERT INTO feedbacks (clientes, foto, comentario, avaliacao) VALUES (?, ?, ?, ?)';
        db.query(query, [cliente, foto, comentario, avaliacao], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Função para buscar um feedback pelo ID
    findById: (cod, callback) => {
        const query = `
            SELECT feedbacks.*, clientes.nome AS cliente_nome 
            FROM feedbacks 
            JOIN clientes ON feedbacks.clientes = clientes.cod 
            WHERE feedbacks.cod = ?`;
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(new Error('Feedback não encontrado'));
            }
            callback(null, results[0]);
        });
    },

    // Função para pegar todos os feedbacks
    getAll: (callback) => {
        const query = `
            SELECT feedbacks.cod, feedbacks.clientes, feedbacks.foto, feedbacks.comentario, feedbacks.avaliacao, 
                   clientes.nome AS cliente_nome 
            FROM feedbacks 
            JOIN clientes ON feedbacks.clientes = clientes.cod`;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Função para atualizar o feedback
    update: (cod, feedback, callback) => {
        const { cliente, foto, comentario, avaliacao } = feedback;

        let query = `
            SELECT foto 
            FROM feedbacks 
            WHERE cod = ?`;

        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results.length === 0) {
                return callback(new Error('Feedback não encontrado'));
            }

            const currentFoto = foto || results[0].foto;

            query = `
                UPDATE feedbacks 
                SET clientes = ?, foto = ?, comentario = ?, avaliacao = ? 
                WHERE cod = ?`;

            const values = [cliente, currentFoto, comentario, avaliacao, cod];

            db.query(query, values, (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },

    // Função para deletar um feedback
    delete: (cod, callback) => {
        const query = 'DELETE FROM feedbacks WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Feedback;
