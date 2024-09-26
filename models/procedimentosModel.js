const db = require('../config/db');

const Procedimento = {
    create: (procedimento, callback) => {
        const query = 'INSERT INTO procedimentos (duracao, restricao, descricao, cod, nome, valor) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [procedimento.duracao, procedimento.restricao, procedimento.descricao, procedimento.cod, procedimento.nome, procedimento.valor], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM procedimentos WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM procedimentos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, procedimento, callback) => {
        const query = 'UPDATE procedimentos SET duracao = ?, restricao = ?, descricao = ?, nome = ?, valor = ? WHERE cod = ?';
        db.query(query, [procedimento.duracao, procedimento.restricao, procedimento.descricao, procedimento.nome, procedimento.valor, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM procedimentos WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Procedimento;
