const db = require('../config/db'); // Certifique-se de que o arquivo de configuração do banco de dados está correto

class Agenda {
    // Criar um novo registro de agenda
    static async create(agenda) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        const result = await db.query(
            'INSERT INTO agenda (clientes, procedimentos, profissional, forma_pag, data, hora) VALUES (?, ?, ?, ?, ?, ?)',
            [clientes, procedimentos, profissional, forma_pag, data, hora]
        );
        return result.insertId; // Retorna o ID (cod) do novo registro
    }

    // Obter todos os registros de agenda
    static async getAll() {
        const result = await db.query('SELECT * FROM agenda');
        return result; // Retorna todos os registros da agenda
    }

    // Obter um registro de agenda por ID
    static async getById(cod) {
        const result = await db.query('SELECT * FROM agenda WHERE cod = ?', [cod]);
        return result[0]; // Retorna o registro específico ou undefined se não existir
    }

    // Atualizar um registro de agenda
    static async update(cod, agenda) {
        const { clientes, procedimentos, profissional, forma_pag, data, hora } = agenda;
        await db.query(
            'UPDATE agenda SET clientes = ?, procedimentos = ?, profissional = ?, forma_pag = ?, data = ?, hora = ? WHERE cod = ?',
            [clientes, procedimentos, profissional, forma_pag, data, hora, cod]
        );
    }

    // Deletar um registro de agenda
    static async delete(cod) {
        await db.query('DELETE FROM agenda WHERE cod = ?', [cod]);
    }
}

// Cria uma instância da classe Agenda
const agendaInstance = new Agenda();

// Exporte a instância
module.exports = agendaInstance;
