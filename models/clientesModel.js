const db = require('../config/db');

const clientes = {
    // Criar um novo cliente
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
            clientes.feedbacks,   // Referencia ao código de feedback
            clientes.agenda       // Referencia ao código de agenda
        ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);  // Retorna o ID gerado para o cliente
        });
    },

    // Buscar cliente por ID (cod)
    findById: (id, callback) => {
        const query = 'SELECT * FROM clientes WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);  // Retorna o cliente encontrado
        });
    },

    // Atualizar um cliente
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
            clientes.feedbacks,   // Atualiza a referência do feedback
            clientes.agenda,      // Atualiza a referência da agenda
            id
        ], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna os resultados da atualização
        });
    },

    // Deletar um cliente
    delete: (id, callback) => {
        const query = 'DELETE FROM clientes WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna os resultados da exclusão
        });
    },

    // Obter todos os clientes
    getAll: (callback) => {
        const query = 'SELECT * FROM clientes';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna todos os clientes
        });
    },

    // Buscar clientes por nome
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM clientes WHERE nome LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);  // Retorna clientes encontrados pelo nome
        });
    },
};

module.exports = clientes;
