const db = require('../config/db');

const Clientes = {
    getAllCliente: (callback) => {
        const query = 'SELECT * FROM clientes';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getClienteByCod: (clienteCod, callback) => {
        const query = 'SELECT * FROM clientes WHERE cod = ?';
        db.query(query, [clienteCod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    createCliente: (clienteData, callback) => {
        const query = `
            INSERT INTO clientes (nome, genero, endereco, fone, email, data_de_nascimento, avaliacao)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [
            clienteData.nome,
            clienteData.genero || null,
            clienteData.endereco || null,
            clienteData.fone,
            clienteData.email,
            clienteData.data_de_nascimento || null,
            clienteData.avaliacao
        ], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.insertId);
        });
    },

    updateCliente: (clienteCod, clienteData, callback) => {
        const query = `
            UPDATE clientes
            SET nome = ?, genero = ?, endereco = ?, fone = ?, email = ?, data_de_nascimento = ?, avaliacao = ?
            WHERE cod = ?
        `;
        db.query(query, [
            clienteData.nome,
            clienteData.genero || null,
            clienteData.endereco || null,
            clienteData.fone,
            clienteData.email,
            clienteData.data_de_nascimento || null,
            clienteData.avaliacao,
            clienteCod
        ], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    },

    deleteCliente: (clienteCod, callback) => {
        const query = 'DELETE FROM clientes WHERE cod = ?';
        db.query(query, [clienteCod], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }
};

module.exports = Clientes;
