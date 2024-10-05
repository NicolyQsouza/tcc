const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Agenda {
    static async create(agenda) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        const result = await db.query(
            'INSERT INTO agenda (clientes, procedimentos, profissional, forma_pag, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
            [clientes, procedimentos, profissional, forma_pag, data, hora]
        );
        return result.insertId;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM agenda');
        return result;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM agenda WHERE id = ?', [id]);
        return result[0];
    }

    static async update(id, agenda) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        await db.query(
            'UPDATE agenda SET clientes = ?, procedimentos = ?, profissional = ?, forma_pag = ?, data = ?, hora = ? WHERE id = ?',
            [clientes, procedimentos, profissional, forma_pag, data, hora, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM agenda WHERE id = ?', [id]);
    }
}

module.exports = Agenda;
