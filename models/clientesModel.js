const db = require('../config/db');

class Clientes {
    // Criar um novo cliente
    static async create (cliente)  {
        const {nome, genero, endereco, fone, email, data_de_nascimento } = cliente;
        try {
            const result = await db.query ('INSERT INTO clientes(nome, genero, endereco, fone, email, data_de_nascimento) VALUES (?, ?, ?, ?, ?, ?)',
            [nome, genero, endereco, fone, email, data_de_nascimento]
            );
            return result.insertId; // Retorna o ID do novo cliente
        } catch (err) {
            throw new Error('Erro ao criar cliente: ' + err.message);
        }
    }

    // Obter todos os clientes
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM clientes');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter clientes: ' + err.message);
        }
    }

    // Obter um cliente pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM clientes WHERE cod = ?', [cod]);
            return result[0]; // Retorna o cliente ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter cliente por código: ' + err.message);
        }
    }

    // Atualizar um cliente existente
    static async update(cod, cliente) {
        const { nome, genero, endereco, fone, email, data_de_nascimento} = cliente;
        try {
            await db.query(
                'UPDATE cliente SET nome = ?, genero = ?, endereco = ?, fone = ?, email = ?, data_de_nascimento = ? WHERE cod = ?',
                [nome, genero, endereco, fone, email, data_de_nascimento, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar cliente: ' + err.message);
        }
    }

    // Deletar um cliente
    static async delete(cod) {
        try {
            await db.query('DELETE FROM clientes WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar cliente: ' + err.message);
        }
    }
}
module.exports = Clientes;
