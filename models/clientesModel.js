const db = require('../config/db');

class Clientes {
    // Criar um novo cliente
    static async create(cliente) {
        const { nome, genero, endereco, fone, email, data_de_nascimento } = cliente;
        try {
            const result = await db.query(
                'INSERT INTO clientes (nome, genero, endereco, fone, email, data_de_nascimento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cod',
                [nome, genero, endereco, fone, email, data_de_nascimento]
            );
            return result.rows[0].cod; // Retorna o ID do novo cliente
        } catch (err) {
            throw new Error('Erro ao criar cliente: ' + err.message);
        }
    }

    // Obter todos os clientes
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM clientes');
            return result.rows; // Retorna as linhas resultantes da consulta
        } catch (err) {
            throw new Error('Erro ao obter clientes: ' + err.message);
        }
    }

    // Obter um cliente pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM clientes WHERE cod = $1', [cod]);
            return result.rows[0]; // Retorna o cliente ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter cliente por código: ' + err.message);
        }
    }

    // Atualizar um cliente existente
    static async update(cod, cliente) {
        const { nome, genero, endereco, fone, email, data_de_nascimento } = cliente;
        try {
            await db.query(
                'UPDATE clientes SET nome = $1, genero = $2, endereco = $3, fone = $4, email = $5, data_de_nascimento = $6 WHERE cod = $7',
                [nome, genero, endereco, fone, email, data_de_nascimento, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar cliente: ' + err.message);
        }
    }

    // Deletar um cliente
    static async delete(cod) {
        try {
            await db.query('DELETE FROM clientes WHERE cod = $1', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar cliente: ' + err.message);
        }
    }

    // Buscar clientes pelo nome
    static async searchByName(name) {
        try {
            const result = await db.query('SELECT * FROM clientes WHERE nome ILIKE $1', [`%${name}%`]);
            return result.rows;
        } catch (err) {
            throw new Error('Erro ao buscar clientes: ' + err.message);
        }
    }
}

module.exports = Clientes;
