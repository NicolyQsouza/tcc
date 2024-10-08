const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class items_proce {
    static async create(items_proce) {
        const { procedimentos, produtos, quantidade } = items_proce;
        const result = await db.query(
            'INSERT INTO items_proce (procedimentos, produtos, quantidade) VALUES (?, ?, ?)',
            [procedimentos, produtos, quantidade]
        );
        return result.insertId;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM items_proce');
        return result;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM items_proce WHERE id = ?', [id]);
        return result[0];
    }

    static async update(id, items_proce) {
        const { procedimentos, produtos, quantidade } = items_proce;
        await db.query(
            'UPDATE items_proce SET procedimentos = ?, produtos = ?, quantidade = ? WHERE id = ?',
            [procedimentos, produtos, quantidade, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM items_proce WHERE id = ?', [id]);
    }
}

module.exports = items_proce;
