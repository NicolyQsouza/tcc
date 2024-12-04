const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Procedimentos {
    // Criar um novo procedimento
    static async create(procedimento) {
        const { duracao, restricao, descricao, cod, nome, valor, agenda, items_proce } = procedimento;
        try {
            const result = await db.query(
                'INSERT INTO procedimentos (duracao, restricao, descricao, cod, nome, valor, agenda, items_proce) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [duracao, restricao, descricao, cod, nome, valor, agenda, items_proce]
            );
            return result.insertId; // Retorna o ID do novo procedimento
        } catch (err) {
            throw new Error('Erro ao criar procedimento: ' + err.message);
        }
    }

    // Obter todos os procedimentos
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM procedimentos');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter procedimentos: ' + err.message);
        }
    }

    // Obter um procedimento pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM procedimentos WHERE cod = ?', [cod]);
            return result[0]; // Retorna o procedimento ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter procedimento por código: ' + err.message);
        }
    }

    // Atualizar um procedimento existente
    static async update(cod, procedimento) {
        const { duracao, restricao, descricao, nome, valor, agenda, items_proce } = procedimento;
        try {
            await db.query(
                'UPDATE procedimentos SET duracao = ?, restricao = ?, descricao = ?, nome = ?, valor = ?, agenda = ?, items_proce = ? WHERE cod = ?',
                [duracao, restricao, descricao, nome, valor, agenda, items_proce, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar procedimento: ' + err.message);
        }
    }

    // Deletar um procedimento
    static async delete(cod) {
        try {
            await db.query('DELETE FROM procedimentos WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar procedimento: ' + err.message);
        }
    }
}

module.exports = Procedimentos;
