const db = require('../config/db');

const Produtos = {
    create: (produto, callback) => {
        const { nome, valor, marca, descricao, foto } = produto;
        const fotoPath = foto ? `/uploads/${foto}` : null; // Caminho relativo

        const query = 'INSERT INTO produtos (nome, valor, marca, descricao, foto) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [nome, valor, marca, descricao, fotoPath], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    getById: (cod, callback) => {
        const query = 'SELECT * FROM produtos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0] || null);
        });
    },

    update: (cod, produto, callback) => {
        const { nome, valor, marca, descricao, foto } = produto;
        const fotoPath = foto ? `/uploads/${foto}` : null; // Caminho relativo
        
        const query = 'UPDATE produtos SET nome = ?, valor = ?, marca = ?, descricao = ?, foto = ? WHERE cod = ?';
        db.query(query, [nome, valor, marca, descricao, fotoPath, cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    delete: (cod, callback) => {
        const query = 'DELETE FROM produtos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Produtos;
