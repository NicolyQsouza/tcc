const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class ItemsProce {
    static async create(itemsProce) {
        const { procedimento, produto, quantidade } = itemsProce;
        const result = await db.query(
            'INSERT INTO items_proce (procedimento, produto, quantidade) VALUES (?, ?, ?)',
            [procedimento, produto, quantidade]
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
        const { procedimento, produto, quantidade } = itemsProce;
        await db.query(
            'UPDATE items_proce SET procedimento = ?, produto = ?, quantidade = ? WHERE id = ?',
            [procedimento, produto, quantidade, id]
        );
    }

    static async delete(id) {
        await db.query('DELETE FROM items_proce WHERE id = ?', [id]);
    }
}

module.exports = ItemsProce;
