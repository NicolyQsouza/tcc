const db = require('../config/db');

const procedimentos = {
    create: (procedimentos, callback) => {
        const query = 'INSERT INTO procedimentos (duracao, restricao, descricao, cod, nome, valor, agenda, items_proce) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [procedimentos.duracao, procedimentos.restricao, procedimentos.descricao, procedimentos.cod, procedimentos.nome, procedimentos.valor, procedimentos.agenda, procedimentos.items_proce], (err, results) => {
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

    update: (id, procedimentos, callback) => {
        const query = 'UPDATE procedimentos SET duracao = ?, restricao = ?, descricao = ?, nome = ?, valor = ?, agenda = ?, items_proce = ? WHERE cod = ?';
        db.query(query, [procedimentos.duracao, procedimentos.restricao, procedimentos.descricao, procedimentos.nome, procedimentos.valor, procedimentos.agenda, procedimentos.items_proce, id], (err, results) => {
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

module.exports = Procedimentos;
