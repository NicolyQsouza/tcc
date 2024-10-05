const db = require('../config/db');

const Cliente = {
    create: (cliente, callback) => {
        const query = 'INSERT INTO clientes (foto, genero, endereco, cod, nome, fone, email, data_de_nascimento, feedback, agenda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            cliente.foto, 
            cliente.genero, 
            cliente.endereco, 
            cliente.cod, 
            cliente.nome, 
            cliente.fone, 
            cliente.email, 
            cliente.data_de_nascimento,
            cliente.feedback,   // Novo campo
            cliente.agenda      // Novo campo
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

    update: (id, cliente, callback) => {
        const query = 'UPDATE clientes SET foto = ?, genero = ?, endereco = ?, nome = ?, fone = ?, email = ?, data_de_nascimento = ?, feedback = ?, agenda = ? WHERE cod = ?';
        db.query(query, [
            cliente.foto, 
            cliente.genero, 
            cliente.endereco, 
            cliente.nome, 
            cliente.fone, 
            cliente.email, 
            cliente.data_de_nascimento, 
            cliente.feedback,   // Novo campo
            cliente.agenda,     // Novo campo
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

module.exports = Cliente;
