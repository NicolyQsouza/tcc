const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

const Produtos = {
    // Criar um novo produto
    create: (produto, callback) => {
        const { nome, valor, marca, descricao, foto } = produto;
        const query = 'INSERT INTO produtos (nome, valor, marca, descricao, foto) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [nome, valor, marca, descricao, foto], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId); // Retorna o ID do novo produto
        });
    },

    // Obter todos os produtos
    getAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna os produtos encontrados
        });
    },

    // Obter um produto pelo id
    getById: (id, callback) => {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0] || null); // Retorna o produto ou null se não encontrado
        });
    },

    // Atualizar um produto existente
    update: (id, produto, callback) => {
        const { nome, valor, marca, descricao, foto } = produto;
        const query = 'UPDATE produtos SET nome = ?, valor = ?, marca = ?, descricao = ?, foto = ? WHERE id = ?';
        db.query(query, [nome, valor, marca, descricao, foto, id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na atualização
        });
    },

    // Deletar um produto
    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na exclusão
        });
    },

    // Buscar produtos por nome
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM produtos WHERE nome LIKE ?';
        db.query(query, [`%${name}%`], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna os produtos encontrados
        });
    }
};

module.exports = Produtos;
