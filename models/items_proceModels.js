const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class ItemsProce {
    // Criar um novo item de procedimento
    static async create(itemProce) {
        const { procedimentos, produtos, quantidade } = itemProce;
        try {
            const result = await db.query(
                'INSERT INTO items_proce (procedimentos, produtos, quantidade) VALUES (?, ?, ?)',
                [procedimentos, produtos, quantidade]
            );
            return result.insertId; // Retorna o ID do novo item de procedimento
        } catch (err) {
            throw new Error('Erro ao criar item de procedimento: ' + err.message);
        }
    }

    // Obter todos os itens de procedimento
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM items_proce');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter itens de procedimento: ' + err.message);
        }
    }

    // Obter um item de procedimento pelo ID (chave primária)
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM items_proce WHERE cod = ?', [cod]);
            return result[0]; // Retorna o item de procedimento ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter item de procedimento por ID: ' + err.message);
        }
    }

    // Atualizar um item de procedimento
    static async update(cod, itemProce) {
        const { procedimentos, produtos, quantidade } = itemProce;
        try {
            await db.query(
                'UPDATE items_proce SET procedimentos = ?, produtos = ?, quantidade = ? WHERE cod = ?',
                [procedimentos, produtos, quantidade, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar item de procedimento: ' + err.message);
        }
    }

    // Deletar um item de procedimento
    static async delete(cod) {
        try {
            await db.query('DELETE FROM items_proce WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar item de procedimento: ' + err.message);
        }
    }
}

module.exports = ItemsProce;
