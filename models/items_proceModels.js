const db = require('../config/db');

class ItemsProceModel {
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM items_proce');
            return result.rows;
        } catch (err) {
            throw new Error('Erro ao obter items_proce: ' + err.message);
        }
    }

    static async getProcedimentos() {
        try {
            const result = await db.query('SELECT * FROM procedimentos');
            return result.rows;
        } catch (err) {
            throw new Error('Erro ao obter procedimentos: ' + err.message);
        }
    }

    static async getProdutos() {
        try {
            const result = await db.query('SELECT * FROM produtos');
            return result.rows;
        } catch (err) {
            throw new Error('Erro ao obter produtos: ' + err.message);
        }
    }

    static async create(itemProce) {
        const { procedimentos, produtos, quantidade } = itemProce;
        try {
            const result = await db.query('INSERT INTO items_proce (procedimentos, produtos, quantidade) VALUES ($1, $2, $3) RETURNING id', [procedimentos, produtos, quantidade]);
            return result.rows[0].id;
        } catch (err) {
            throw new Error('Erro ao criar item_proce: ' + err.message);
        }
    }

    static async getById(id) {
        try {
            const result = await db.query('SELECT * FROM items_proce WHERE id = $1', [id]);
            return result.rows[0];
        } catch (err) {
            throw new Error('Erro ao obter item_proce por ID: ' + err.message);
        }
    }

    static async update(id, itemProce) {
        const { procedimentos, produtos, quantidade } = itemProce;
        try {
            await db.query('UPDATE items_proce SET procedimentos = $1, produtos = $2, quantidade = $3 WHERE id = $4', [procedimentos, produtos, quantidade, id]);
        } catch (err) {
            throw new Error('Erro ao atualizar item_proce: ' + err.message);
        }
    }

    static async delete(id) {
        try {
            await db.query('DELETE FROM items_proce WHERE id = $1', [id]);
        } catch (err) {
            throw new Error('Erro ao deletar item_proce: ' + err.message);
        }
    }
}

module.exports = ItemsProceModel;
