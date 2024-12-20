const db = require('../config/db');

const Usuarios = {
    // Criar um novo usuário
    create: (usuario, callback) => {
        const query = 'INSERT INTO usuario (nome, senha) VALUES (?, ?)';
        db.query(query, [usuario.nome, usuario.senha], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Obter todos os usuários
    getAll: (callback) => {
        const query = 'SELECT * FROM usuario';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Obter um usuário pelo código
    getById: (cod, callback) => {
        const query = 'SELECT * FROM usuario WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Atualizar um usuário existente
    update: (cod, usuario, callback) => {
        const query = 'UPDATE usuario SET nome = ?, senha = ? WHERE cod = ?';
        db.query(query, [usuario.nome, usuario.senha, cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Deletar um usuário
    delete: (cod, callback) => {
        const query = 'DELETE FROM usuario WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Buscar usuários por nome (pesquisa)
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM usuario WHERE nome LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = Usuarios;
