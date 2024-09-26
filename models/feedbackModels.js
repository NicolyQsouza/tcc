const db = require('../config/database'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Feedback {
    static async create(feedback) {
        const { foto, comentario, avaliacao, cliente } = feedback;
        const result = await db.query(
            'INSERT INTO Feedback (foto, comentario, avaliacao, cliente) VALUES (?, ?, ?, ?)',
            [foto, comentario, avaliacao, cliente]
        );
        return result.insertId;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM Feedback');
        return result;
    }

    static async getById(cod) {
        const result = await db.query('SELECT * FROM Feedback WHERE cod = ?', [cod]);
        return result[0];
    }

    static async update(cod, feedback) {
        const { foto, comentario, avaliacao, cliente } = feedback;
        await db.query(
            'UPDATE Feedback SET foto = ?, comentario = ?, avaliacao = ?, cliente = ? WHERE cod = ?',
            [foto, comentario, avaliacao, cliente, cod]
        );
    }

    static async delete(cod) {
        await db.query('DELETE FROM Feedback WHERE cod = ?', [cod]);
    }
}

module.exports = Feedback;
