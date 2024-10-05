const db = require('../config/db');

const produtos = {
    create: (produtos, callback) => {
        const query = 'INSERT INTO produtos (foto, restricao, valor, indicacao, marca, descricao, cod, items_proce) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [produtos.foto, produtos.restricao, produtos.valor, produtos.indicacao, produtos.marca, produtos.descricao, produtos.cod, produtos.items_proce], (err, results) => {
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

    update: (id, produtos, callback) => {
        const query = 'UPDATE produtos SET foto = ?, restricao = ?, valor = ?, indicacao = ?, marca = ?, descricao = ?, items_proce = ? WHERE cod = ?';
        db.query(query, [produtos.foto, produtos.restricao, produtos.valor, produtos.indicacao, produtos.marca, produtos.descricao, produtos.items_proce, id], (err, results) => {
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

module.exports = produtos;
