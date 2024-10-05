const db = require('../config/db');

const clientes = {
    create: (clientes, callback) => {
        const query = 'INSERT INTO clientes (foto, genero, endereco, cod, nome, fone, email, data_de_nascimento, feedbacks, agenda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            clientes.foto, 
            clientes.genero, 
            clientes.endereco, 
            clientes.cod, 
            clientes.nome, 
            clientes.fone, 
            clientes.email, 
            clientes.data_de_nascimento,
            clientes.feedbacks,   // Novo campo
            clientes.agenda      // Novo campo
        ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM clientes WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, clientes, callback) => {
        const query = 'UPDATE clientes SET foto = ?, genero = ?, endereco = ?, nome = ?, fone = ?, email = ?, data_de_nascimento = ?, feedbacks = ?, agenda = ? WHERE cod = ?';
        db.query(query, [
            clientes.foto, 
            clientes.genero, 
            clientes.endereco, 
            clientes.nome, 
            clientes.fone, 
            clientes.email, 
            clientes.data_de_nascimento, 
            clientes.feedbacks,   // Novo campo
            clientes.agenda,     // Novo campo
            id
        ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM clientes WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM clientes';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    searchByName: (name, callback) => {
        const query = 'SELECT * FROM clientes WHERE nome LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = clientes;
