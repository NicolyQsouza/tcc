const db = require('../config/db'); // Importa o módulo de conexão com o banco de dados

const ItemsProce = {
    // Criar um novo item_proce
    create: (item, callback) => {
        const { produto_cod, procedimento_cod } = item;
        const query = 'INSERT INTO items_proce (produto_cod, procedimento_cod) VALUES (?, ?)';
        db.query(query, [produto_cod, procedimento_cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId); // Retorna o ID do novo item_proce
        });
    },
    getAll: (callback) => {
        const query = `
            SELECT ip.id, p.nome AS produto_nome, pr.nome AS procedimento_nome, p.valor AS produto_valor, pr.valor AS procedimento_valor
            FROM items_proce ip
            JOIN produtos p ON ip.produto_cod = p.cod
            JOIN procedimentos pr ON ip.procedimento_cod = pr.cod
        `;
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna os items_proce encontrados
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
        const query = `
            SELECT ip.id, p.nome AS produto_nome, pr.nome AS procedimento_nome, p.valor AS produto_valor, pr.valor AS procedimento_valor
            FROM items_proce ip
            JOIN produtos p ON ip.produto_cod = p.cod
            JOIN procedimentos pr ON ip.procedimento_cod = pr.cod
            WHERE ip.id = ?
        `;
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]); // Retorna o item_proce encontrado
        });
    },

    update: (id, itemProce, callback) => {
        const query = 'UPDATE items_proce SET procedimentos = ?, produtos = ?, quantidade = ? WHERE cod = ?';
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
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na exclusão
        });
    }
};

module.exports = ItemsProce;
