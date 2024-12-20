const db = require('../config/db');

const Feedback = {
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
            callback(null, results[0]);
        });
    },

    update: (cod, feedback, callback) => {
        const { cliente, foto, comentario, avaliacao } = feedback;
        const query = `
            UPDATE feedbacks 
            SET clientes = ?, foto = ?, comentario = ?, avaliacao = ? 
            WHERE cod = ?`;
        db.query(query, [cliente, foto, comentario, avaliacao, cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (cod, callback) => {
        const query = 'DELETE FROM feedbacks WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = `
            SELECT feedbacks.cod, feedbacks.clientes, feedbacks.foto, feedbacks.comentario, feedbacks.avaliacao, clientes.nome AS cliente_nome 
            FROM feedbacks 
            JOIN clientes ON feedbacks.clientes = clientes.cod`;
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Feedback;
