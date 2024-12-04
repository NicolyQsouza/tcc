const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Usuario {
    // Criar um novo usuário
    static async create(usuario) {
        const { nome, senha } = usuario;
        try {
            const result = await db.query(
                'INSERT INTO usuario (nome, senha) VALUES (?, ?)',
                [nome, senha]
            );
            return result.insertId; // Retorna o ID do novo usuário
        } catch (err) {
            throw new Error('Erro ao criar usuário: ' + err.message);
        }
    }

    // Obter um usuário pelo ID
    static async findById(id) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE id = ?', [id]);
            return result[0]; // Retorna o usuário ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter usuário por ID: ' + err.message);
        }
    }

    // Obter um usuário pelo nome de usuário
    static async findByUsuarioName(usuarioname) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE nome = ?', [usuarioname]);
            return result[0]; // Retorna o usuário ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter usuário por nome: ' + err.message);
        }
    }

    // Atualizar um usuário
    static async update(id, usuario) {
        const { nome, senha } = usuario;
        try {
            await db.query(
                'UPDATE usuario SET nome = ?, senha = ? WHERE id = ?',
                [nome, senha, id]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar usuário: ' + err.message);
        }
    }

    // Deletar um usuário
    static async delete(id) {
        try {
            await db.query('DELETE FROM usuario WHERE id = ?', [id]);
        } catch (err) {
            throw new Error('Erro ao deletar usuário: ' + err.message);
        }
    }

    // Obter todos os usuários
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM usuario');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter usuários: ' + err.message);
        }
    }

    // Pesquisar usuários pelo nome
    static async searchByName(name) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE nome LIKE ?', [`%${name}%`]);
            return result;
        } catch (err) {
            throw new Error('Erro ao pesquisar usuários por nome: ' + err.message);
        }
    }
}

module.exports = Usuario;
