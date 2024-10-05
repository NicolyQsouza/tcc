const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class ItemsProce {
    static async create(itemsProce) {
        const { procedimentos, produtos, quantidade } = itemsProce;
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

    static async update(id, itemsProce) {
        const { procedimentos, produtos, quantidade } = itemsProce;
        await db.query(
            'UPDATE items_proce SET procedimentos = ?, produtos = ?, quantidade = ? WHERE id = ?',
            [procedimentos, produtos, quantidade, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM items_proce WHERE id = ?', [id]);
    }
}

module.exports = ItemsProce;
