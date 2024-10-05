const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class feedbacks {
    static async create(feedbacks) {
        const { foto, comentario, avaliacao, clientes } = feedbacks;
        const result = await db.query(
            'INSERT INTO feedbacks (foto, comentario, avaliacao, clientes) VALUES (?, ?, ?, ?)',
            [foto, comentario, avaliacao, clientes]
        );
        return result.insertId;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM feedbacks');
        return result;
    }

    static async getById(cod) {
        const result = await db.query('SELECT * FROM feedbacks WHERE cod = ?', [cod]);
        return result[0];
    }

    static async update(cod, feedbacks) {
        const { foto, comentario, avaliacao, clientes } = feedbacks;
        await db.query(
            'UPDATE feedbacks SET foto = ?, comentario = ?, avaliacao = ?, clientes = ? WHERE cod = ?',
            [foto, comentario, avaliacao, clientes, cod]
        );
    }

    static async delete(cod) {
        await db.query('DELETE FROM feedbacks WHERE cod = ?', [cod]);
    }
}

module.exports = feedbacks;
