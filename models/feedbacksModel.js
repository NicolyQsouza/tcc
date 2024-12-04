const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Feedbacks {
    // Criar um novo feedback
    static async create(feedback) {
        const { foto, comentario, avaliacao, clientes } = feedback;
        try {
            const result = await db.query(
                'INSERT INTO feedbacks (foto, comentario, avaliacao, clientes) VALUES (?, ?, ?, ?)',
                [foto, comentario, avaliacao, clientes]
            );
            return result.insertId; // Retorna o ID do novo feedback
        } catch (err) {
            throw new Error('Erro ao criar feedback: ' + err.message);
        }
    }

    // Obter todos os feedbacks
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM feedbacks');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter feedbacks: ' + err.message);
        }
    }

    // Obter feedback pelo ID
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM feedbacks WHERE cod = ?', [cod]);
            return result[0]; // Retorna o feedback encontrado ou undefined
        } catch (err) {
            throw new Error('Erro ao obter feedback por ID: ' + err.message);
        }
    }

    // Atualizar um feedback
    static async update(cod, feedback) {
        const { foto, comentario, avaliacao, clientes } = feedback;
        try {
            await db.query(
                'UPDATE feedbacks SET foto = ?, comentario = ?, avaliacao = ?, clientes = ? WHERE cod = ?',
                [foto, comentario, avaliacao, clientes, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar feedback: ' + err.message);
        }
    }

    // Deletar um feedback
    static async delete(cod) {
        try {
            await db.query('DELETE FROM feedbacks WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar feedback: ' + err.message);
        }
    }
}

module.exports = Feedbacks;
