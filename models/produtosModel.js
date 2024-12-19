const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Produtos {
    // Criar um novo produto
    static async create(produto) {
        const {nome, valor, marca, descricao, foto} = produto;
        try {
            const result = await db.query(
                'INSERT INTO produtos (nome, valor, marca, descricao, foto) VALUES ( ?, ?, ?, ?, ? )',
                [nome, valor, marca, descricao, foto]
            );
            return result.insertId; // Retorna o ID do novo produto
        } catch (err) {
            throw new Error('Erro ao criar produto: ' + err.message);
        }
    }
   
    // Obter todos os produtos
    static async getAll() {
        try {
            const result = await db.query('SELECT * FROM produtos');
            return result;
        } catch (err) {
            throw new Error('Erro ao obter produtos: ' + err.message);
        }
    }

    // Obter um produto pelo código
    static async getById(cod) {
        try {
            const result = await db.query('SELECT * FROM produtos WHERE cod = ?', [cod]);
            return result[0]; // Retorna o produto ou undefined se não encontrado
        } catch (err) {
            throw new Error('Erro ao obter produto por código: ' + err.message);
        }
    }

    // Atualizar um produto existente
    static async update(cod, produto) {
        const { nome, valor, marca, descricao, foto} = produto;
        try {
            await db.query(
                'UPDATE produtos SET nome = ?, valor = ?, marca = ?, descricao = ?, foto = ? WHERE cod = ?',
                [nome, valor, marca, descricao, foto, cod]
            );
        } catch (err) {
            throw new Error('Erro ao atualizar produto: ' + err.message);
        }
    }

    // Deletar um produto
    static async delete(cod) {
        try {
            await db.query('DELETE FROM produtos WHERE cod = ?', [cod]);
        } catch (err) {
            throw new Error('Erro ao deletar produto: ' + err.message);
        }
    }
}

module.exports = Produtos;
