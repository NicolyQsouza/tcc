const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Usuarios {
    // Criar um novo usuario
    static async create(usuario) {
        const { nome, senha } = usuario;
        try {
            const result = await db.query(
                'INSERT INTO usuario (nome, senha) VALUES (?, ?)',
                [nome, senha]
            );
            // MySQL não suporta RETURNING, então precisamos buscar o último ID inserido separadamente
            //const [rows] = await db.query('SELECT LAST_INSERT_ID() as cod');
            //return rows[0].cod; // Retorna o ID do novo usuário
        } catch (err) {
            throw new Error('Erro ao criar usuario: ' + err.message);
        }
    }

    // Obter todos os usuarios
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM usuario');
            return result[0];  // Retorna apenas os dados (sem a descrição das colunas)
        } catch (err) {
            throw new Error('Erro ao obter usuarios: ' + err.message);
        }
    }

    // Obter um usuario pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE cod = ?', [cod]);
            console.log('Usuário encontrado pelo ID:', result);  // Debugging
            return result[0]; // Retorna o usuário ou undefined se não encontrado
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
            console.log(`Usuário com ID ${cod} atualizado`);  // Debugging
        } catch (err) {
            throw new Error('Erro ao atualizar usuario: ' + err.message);
        }
    }

    // Deletar um usuario
    static async delete(cod) {
        try {
            await db.query('DELETE FROM usuario WHERE cod = ?', [cod]);
            console.log(`Usuário com ID ${cod} deletado`);  // Debugging
        } catch (err) {
            throw new Error('Erro ao deletar usuario: ' + err.message);
        }
    }

    // Buscar usuários por nome (pesquisa)
    static async searchByName(name) {
        try {
            const result = await db.query('SELECT * FROM usuario WHERE nome LIKE ?', [`%${name}%`]);
            console.log(`Usuários encontrados com nome: ${name}`, result);  // Debugging
            return result[0];  // Retorna os dados (sem a descrição das colunas)
        } catch (err) {
            throw new Error('Erro ao pesquisar usuários: ' + err.message);
        }
    }
}

module.exports = Usuarios;
