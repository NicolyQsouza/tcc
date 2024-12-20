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

    // Obter um produto pelo código
    getById: (cod, callback) => {
        const query = 'SELECT * FROM produtos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]); // Retorna o produto ou undefined se não encontrado
        });
    },

    // Atualizar um produto existente
    update: (cod, produto, callback) => {
        const { nome, valor, marca, descricao, foto } = produto;
        const query = 'UPDATE produtos SET nome = ?, valor = ?, marca = ?, descricao = ?, foto = ? WHERE cod = ?';
        db.query(query, [nome, valor, marca, descricao, foto, cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na atualização
        });
    },

    // Deletar um produto
    delete: (cod, callback) => {
        const query = 'DELETE FROM produtos WHERE cod = ?';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Indica sucesso na exclusão
        });
    }
};

module.exports = Produtos;
