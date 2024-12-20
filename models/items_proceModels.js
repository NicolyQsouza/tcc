const db = require('../config/db');

const ItemsProce = {
    getAll: (callback) => {
        const query = 'SELECT * FROM items_proce';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getProcedimentos: (callback) => {
        const query = 'SELECT * FROM procedimentos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getProdutos: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    create: (itemProce, callback) => {
        const query = 'INSERT INTO items_proce (procedimentos, produtos, quantidade) VALUES (?, ?, ?)';
        const { procedimentos, produtos, quantidade } = itemProce;
        db.query(query, [procedimentos, produtos, quantidade], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    getById: (id, callback) => {
        const query = 'SELECT * FROM items_proce WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, itemProce, callback) => {
        const query = 'UPDATE items_proce SET procedimentos = ?, produtos = ?, quantidade = ? WHERE id = ?';
        const { procedimentos, produtos, quantidade } = itemProce;
        db.query(query, [procedimentos, produtos, quantidade, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM items_proce WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = ItemsProce;
