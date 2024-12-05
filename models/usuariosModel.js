const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Usuarios {
    // Criar um novo usuario
    static async create(usuario) {
        const { foto, restricao, valor, indicacao, marca, descricao, cod, items_proce } = usuario;
        try {
            const result = await db.query(
                'INSERT INTO usuarios (foto, restricao, valor, indicacao, marca, descricao, cod, items_proce) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [foto, restricao, valor, indicacao, marca, descricao, cod, items_proce]
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
            const result = await db.query('SELECT * FROM usuarios WHERE cod = ?', [cod]);
            return result[0]; // Retorna o usuario ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter usuario por código: ' + err.message);
        }
    }

    // Atualizar um usuario existente
    static async update(cod, usuario) {
        const { foto, restricao, valor, indicacao, marca, descricao, items_proce } = usuario;
        try {
            await db.query(
                'UPDATE usuarios SET foto = ?, restricao = ?, valor = ?, indicacao = ?, marca = ?, descricao = ?, items_proce = ? WHERE cod = ?',
                [foto, restricao, valor, indicacao, marca, descricao, items_proce, cod]
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
