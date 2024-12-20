const db = require('../config/db');

const Usuarios = {
    // Criar um novo usuário
    create: (usuario, callback) => {
        const query = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?)';
        db.query(query, [usuario.nome, usuario.senha], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);  // Retorna o ID do novo usuário
        });
    },

    // Obter todos os usuários
    getAll: (callback) => {
        const query = 'SELECT * FROM usuarios';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna a lista de usuários
        });
    },

    // Obter um usuário pelo código (ID)
    getById: (cod, callback) => {
        const query = 'SELECT * FROM usuarios WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null);  // Se não encontrar o usuário, retorna null
            }
            callback(null, results[0]);  // Retorna o usuário encontrado
        });
    },

    // Atualizar um usuário
    update: (cod, usuario, callback) => {
        const query = 'UPDATE usuarios SET nome = ?, senha = ? WHERE cod = ?';
        db.query(query, [usuario.nome, usuario.senha, cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna o resultado da atualização
        });
    },

    // Deletar um usuário
    delete: (cod, callback) => {
        const query = 'DELETE FROM usuarios WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna o resultado da exclusão
        });
    }
};

module.exports = Usuarios;
