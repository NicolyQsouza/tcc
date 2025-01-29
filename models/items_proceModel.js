const db = require('../config/db');

const ItemsProce = {
    create: (item, callback) => {
        const { produto_cod, procedimento_cod, quantidade } = item;
        const query = 'INSERT INTO items_proce (produtos, procedimentos, quantidade) VALUES (?, ?, ?)';
        db.query(query, [produto_cod, procedimento_cod, quantidade], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    },

    getAll: (callback) => {
        const query = `
            SELECT ip.cod, p.nome AS produto_nome, pr.nome AS procedimento_nome, 
                   p.valor AS produto_valor, pr.valor AS procedimento_valor, ip.quantidade
            FROM items_proce ip
            JOIN produtos p ON ip.produtos = p.cod
            JOIN procedimentos pr ON ip.procedimentos = pr.cod;
        `;
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    getById: (cod, callback) => {
        const query = `
            SELECT ip.cod, p.nome AS produto_nome, pr.nome AS procedimento_nome, 
                   p.valor AS produto_valor, pr.valor AS procedimento_valor, ip.quantidade
            FROM items_proce ip
            JOIN produtos p ON ip.produtos = p.cod
            JOIN procedimentos pr ON ip.procedimentos = pr.cod
            WHERE ip.cod = ?;
        `;
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]);
        });
    },

    update: (cod, itemProce, callback) => {
        const { produto_cod, procedimento_cod, quantidade } = itemProce;
        const query = 'UPDATE items_proce SET produtos = ?, procedimentos = ?, quantidade = ? WHERE cod = ?';
        db.query(query, [produto_cod, procedimento_cod, quantidade, cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (cod, callback) => {
        const query = 'DELETE FROM items_proce WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = ItemsProce;
