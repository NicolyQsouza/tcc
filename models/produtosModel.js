const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produtos (foto, restricao, valor, indicacao, marca, descricao, cod) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [produto.foto, produto.restricao, produto.valor, produto.indicacao, produto.marca, produto.descricao, produto.cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM produtos WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET foto = ?, restricao = ?, valor = ?, indicacao = ?, marca = ?, descricao = ? WHERE cod = ?';
        db.query(query, [produto.foto, produto.restricao, produto.valor, produto.indicacao, produto.marca, produto.descricao, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Produto;
