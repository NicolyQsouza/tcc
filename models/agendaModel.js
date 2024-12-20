const db = require('../config/db');  // Conexão com o banco de dados

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
        let query="SELECT agenda.cod AS agenda_cod, clientes.nome AS cliente_nome, procedimentos.nome AS procedimento_nome, agenda.profissional, agenda.forma_pag, agenda.data, agenda.hora FROM agenda JOIN clientes ON agenda.clientes = clientes.cod JOIN procedimentos ON agenda.procedimentos = procedimentos.cod;";
        db.query(query, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna todos os registros da agenda
        });
    }

    // Obter um registro de agenda por código (cod)
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

    // Obter procedimentos (todos os procedimentos)
    static getProcedures(callback) {
        db.query('SELECT * FROM procedimentos', (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); // Retorna todos os procedimentos
        });
    }

    // Obter um procedimento pelo ID
    static getProcedureById(cod, callback) {
        const query = 'SELECT * FROM procedimentos WHERE cod = ?';
        db.query(query, [cod], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0] || null); // Retorna o procedimento ou null se não encontrado
        });
    }
}

module.exports = Agenda;
