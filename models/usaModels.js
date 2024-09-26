const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Usa {
    static async create(usa) {
        const { procedimento, produto, quantidade } = usa;
        const result = await db.query(
            'INSERT INTO usa (procedimento, produto, quantidade) VALUES (?, ?, ?)',
            [procedimento, produto, quantidade]
        );
        return result.insertId;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM usa');
        return result;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM usa WHERE id = ?', [id]);
        return result[0];
    }

    static async update(id, usa) {
        const { procedimento, produto, quantidade } = usa;
        await db.query(
            'UPDATE usa SET procedimento = ?, produto = ?, quantidade = ? WHERE id = ?',
            [procedimento, produto, quantidade, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM usa WHERE id = ?', [id]);
    }
}

module.exports = Usa;
