const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Usuarios {
    // Criar um novo usuario
    static async create(usuario) {
        const {nome, senha } = usuario;
        try {
            const result = await db.query(
                'INSERT INTO usuario (nome, senha) VALUES ( ?, ?)',
                [nome, senha]
            );
            return result.insertId; // Retorna o ID do novo usuario
        } catch (err) {
            throw new Error('Erro ao criar usuario: ' + err.message);
        }
    }

    // Obter todos os usuarios
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM usuario');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter usuarios: ' + err.message);
        }
    }

    // Obter um usuario pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE cod = ?', [cod]);
            return result[0]; // Retorna o usuario ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter usuario por código: ' + err.message);
        }
    }

    // Atualizar um usuario existente
    static async update(cod, usuario) {
        const { nome, senha } = usuario;
        try {
            await db.query(
                'UPDATE usuario SET nome = ?, senha = ? WHERE cod = ?',
                [nome, senha, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar usuario: ' + err.message);
        }
    }

    // Deletar um usuario
    static async delete(cod) {
        try {
            await db.query('DELETE FROM usuarios WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar usuario: ' + err.message);
        }
    }
}

module.exports = Usuarios;
