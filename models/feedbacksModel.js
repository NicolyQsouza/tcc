const db = require('../config/db');

class Feedback {
    // Criar um novo feedback
    static async create(feedback) {
        const { clientes, foto, comentario, avaliacao } = feedback;
        try {
            const result = await db.query(
                'INSERT INTO feedbacks ( clientes, foto, comentario, avaliacao) VALUES ( ?, ?, ?, ?)',
                [clientes, foto, comentario, avaliacao]
            );
            // return result.insertId; // Retorna o ID do novo feedback
        } catch (err) {
            throw new Error('Erro ao criar feedback: ' + err.message);
        }
    }

    // Obter feedback por ID
    static async findById(id) {
        const query = 'SELECT feedbacks.*, clientes.nome AS cliente_nome FROM feedbacks JOIN clientes ON feedbacks.cliente = clientes.id WHERE feedbacks.id = ?';
        try {
            const result = await db.query(query, [id]);
            return result[0]; // Retorna o feedback ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao buscar feedback por ID: ' + err.message);
        }
    }

    // Atualizar um feedback existente
    static async update(cod, feedback) {
        const { clientes, foto, comentario, avaliacao, } = feedback;
        try {
            await db.query(
                'UPDATE feedbacks SET clientes = ?, foto = ?, comentario = ?, avaliacao = ? WHERE cod = ?',
                [clientes, foto, comentario, avaliacao, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar feedback: ' + err.message);
        }
    }

    // Deletar um feedback
    static async delete(id) {
        const query = 'DELETE FROM feedbacks WHERE cod = ?';
        try {
            await db.query(query, [id]);
        } catch (err) {
            throw new Error('Erro ao deletar feedback: ' + err.message);
        }
    }

    // Obter todos os feedbacks, com filtro opcional por cliente
    static async getAll(cliente) {
        let query = 'SELECT feedbacks.cod, feedbacks.clientes, feedbacks.foto, feedbacks.comentario, feedbacks.avaliacao, clientes.nome AS cliente_nome FROM feedbacks JOIN clientes ON feedbacks.clientes = clientes.cod';

        if (cliente) {
            query += ' WHERE feedbacks.clientes = ?';
        }

        try {
            const results = await db.query(query, [cliente]);
            return results; // Retorna os feedbacks encontrados
        } catch (err) {
            throw new Error('Erro ao obter feedbacks: ' + err.message);
        }
    }
}

module.exports = Feedback;
