const db = require('../config/db');

class Agenda {
    static create(agenda, callback) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        db.query(
            'INSERT INTO agenda (clientes, procedimentos, profissional, forma_pag, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
            [clientes, procedimentos, profissional, forma_pag, data, hora],
            (err, result) => {
                if (err) return callback(err);
                callback(null, { id: result.insertId });
            }
        );
    }

    static getAll(callback) {
        const query = `
            SELECT agenda.cod AS agenda_cod, 
                   clientes.nome AS cliente_nome, 
                   procedimentos.nome AS procedimento_nome, 
                   agenda.profissional, 
                   agenda.forma_pag, 
                   agenda.data, 
                   agenda.hora
            FROM agenda
            JOIN clientes ON agenda.clientes = clientes.cod
            JOIN procedimentos ON agenda.procedimentos = procedimentos.cod;
        `;
        db.query(query, callback);
    }

    static getById(cod, callback) {
        db.query('SELECT * FROM agenda WHERE cod = ?', [cod], (err, result) => {
            if (err) return callback(err);
            if (result.length === 0) return callback(new Error('Agenda não encontrada')); // Caso não encontre a agenda
            // Carregar detalhes adicionais de cliente e procedimento
            db.query('SELECT nome FROM clientes WHERE cod = ?', [result[0].clientes], (err, clientes) => {
                if (err) return callback(err);
                result[0].clientes = clientes[0];

                db.query('SELECT nome FROM procedimentos WHERE cod = ?', [result[0].procedimentos], (err, procedimentos) => {
                    if (err) return callback(err);
                    result[0].procedimentos = procedimentos[0];
                    callback(null, result[0]);
                });
            });
        });
    }

    static update(cod, agenda, callback) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        const query = `
            UPDATE agenda 
            SET clientes = ?, procedimentos = ?, profissional = ?, forma_pag = ?, data = ?, hora = ?
            WHERE cod = ?
        `;
        db.query(query, [clientes, procedimentos, profissional, forma_pag, data, hora, cod], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar agenda:', err);
                return callback(err); // Retorna erro, se houver
            }
            if (result.affectedRows > 0) {
                callback(null, true); // Atualização bem-sucedida
            } else {
                callback(null, false); // Nenhuma linha afetada
            }
        });
    }

    static delete(cod, callback) {
        db.query('DELETE FROM agenda WHERE cod = ?', [cod], (err, result) => {
            if (err) return callback(err);
            callback(null, result.affectedRows > 0); // Retorna true ou false dependendo se foi deletado
        });
    }

    static getProcedures(callback) {
        db.query('SELECT * FROM procedimentos', callback);
    }
}

module.exports = Agenda;
