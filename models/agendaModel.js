const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Agenda {
    // Criar um novo registro de agenda
    static create(agenda, callback) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        db.query(
            'INSERT INTO agenda (clientes, procedimentos, profissional, forma_pag, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
            [clientes, procedimentos, profissional, forma_pag, data, hora],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null, result.insertId); // Retorna o ID (cod) do novo registro
            }
        );
    }

    // Obter todos os registros de agenda
    static getAll(callback) {
        db.query('SELECT * FROM agenda', (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna todos os registros da agenda
        });
    }

    // Obter um registro de agenda por ID
    static getById(cod, callback) {
        db.query('SELECT * FROM agenda WHERE cod = ?', [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result[0]); // Retorna o registro específico ou undefined se não existir
        });
    }

    // Atualizar um registro de agenda
    static update(cod, agenda, callback) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        db.query(
            'UPDATE agenda SET clientes = ?, procedimentos = ?, profissional = ?, forma_pag = ?, data = ?, hora = ? WHERE cod = ?',
            [clientes, procedimentos, profissional, forma_pag, data, hora, cod],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                callback(null, result.affectedRows > 0); // Retorna true se a atualização foi bem-sucedida
            }
        );
    }

    // Deletar um registro de agenda
    static delete(cod, callback) {
        db.query('DELETE FROM agenda WHERE cod = ?', [cod], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result.affectedRows > 0); // Retorna true se a exclusão foi bem-sucedida
        });
    }
}

module.exports = Agenda;
