const db = require('../config/db');  // Configuração do banco de dados com pg

const Clientes = {
    // Criar um novo cliente
    create: (cliente, callback) => {
        const { nome, genero, endereco, fone, email, data_de_nascimento } = cliente;
        const query = 'INSERT INTO clientes (nome, genero, endereco, fone, email, data_de_nascimento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod';
        db.query(query, [nome, genero, endereco, fone, email, data_de_nascimento], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows[0].cod); // Retorna o ID do novo cliente
        });
    },

    // Obter todos os clientes
    getAll: (callback) => {
        const query = 'SELECT * FROM clientes';
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows); // Retorna as linhas resultantes da consulta
        });
    },

    // Obter um cliente pelo código
    getById: (cod, callback) => {
        const query = 'SELECT * FROM clientes WHERE cod = $1';
        db.query(query, [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows[0]); // Retorna o cliente ou undefined se não encontrado
        });
    },

    // Atualizar um cliente existente
    update: (cod, cliente, callback) => {
        const { nome, genero, endereco, fone, email, data_de_nascimento } = cliente;
        const query = 'UPDATE clientes SET nome = $1, genero = $2, endereco = $3, fone = $4, email = $5, data_de_nascimento = $6 WHERE cod = $7';
        db.query(query, [nome, genero, endereco, fone, email, data_de_nascimento, cod], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null); // Indica sucesso na atualização
        });
    },

    // Deletar um cliente
    delete: (cod, callback) => {
        const query = 'DELETE FROM clientes WHERE cod = $1';
        db.query(query, [cod], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null); // Indica sucesso na exclusão
        });
    },

    // Buscar clientes pelo nome
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM clientes WHERE nome ILIKE $1';
        db.query(query, [`%${name}%`], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.rows); // Retorna os clientes encontrados
        });
    }
};

module.exports = Clientes;
