// Arquivo: controllers/clientesController.js
const Clientes = require('../models/clientesModel');
const db = require('../config/db');  // Supondo que você tenha uma configuração de banco de dados

const clientesController = {
    createCliente: (req, res) => {
        const newCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        if (!newCliente.nome || !newCliente.fone || !newCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        if (!newCliente.data_de_nascimento || isNaN(Date.parse(newCliente.data_de_nascimento))) {
            return res.status(400).json({ error: 'A data de nascimento é inválida.' });
        }

        Clientes.createCliente(newCliente, (err, clienteId) => {
            if (err) {
                console.error('Erro ao criar cliente:', err);
                return res.status(500).json({ error: 'Erro ao criar cliente: ' + err.message });
            }
            res.redirect('/clientes');
        });
    },

    getAllCliente: (req, res) => {
        Clientes.getAllCliente((err, clientes) => {
            if (err) {
                console.error('Erro ao obter clientes:', err);
                return res.status(500).json({ error: 'Erro ao obter clientes: ' + err.message });
            }
            res.render('clientes/index', { clientes });
        });
    },

    getClienteById: (req, res) => {
        const clienteCod = req.params.cod;

        Clientes.getClienteByCod(clienteCod, (err, cliente) => {
            if (err) {
                console.error('Erro ao buscar cliente:', err);
                return res.status(500).json({ error: 'Erro ao buscar cliente: ' + err.message });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/show', { cliente });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    renderEditForm: (req, res) => {
        const clienteCod = req.params.cod;

        Clientes.getClienteByCod(clienteCod, (err, cliente) => {
            if (err) {
                console.error('Erro ao buscar cliente para edição:', err);
                return res.status(500).json({ error: 'Erro ao buscar cliente para edição: ' + err.message });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { cliente });
        });
    },

    updateCliente: (req, res) => {
        const clienteCod = req.params.cod;
        const updatedCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        if (!updatedCliente.nome || !updatedCliente.fone || !updatedCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        if (!updatedCliente.data_de_nascimento || isNaN(Date.parse(updatedCliente.data_de_nascimento))) {
            return res.status(400).json({ error: 'A data de nascimento é inválida.' });
        }

        Clientes.updateCliente(clienteCod, updatedCliente, (err) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                return res.status(500).json({ error: 'Erro ao atualizar cliente: ' + err.message });
            }
            res.redirect('/clientes');
        });
    },

    deleteCliente: (req, res) => {
        const clienteCod = req.params.cod;

        // Verifica se o código do cliente está presente
        if (!clienteCod) {
            return res.status(400).json({ error: 'Código do cliente não fornecido.' });
        }

        // Excluir registros da tabela 'agenda' que fazem referência ao cliente
        const deleteAgendaQuery = 'DELETE FROM agenda WHERE clientes = ?';
        db.query(deleteAgendaQuery, [clienteCod], (err) => {
            if (err) {
                console.error('Erro ao excluir registros na agenda:', err);
                return res.status(500).json({ error: 'Erro ao excluir registros na agenda: ' + err.message });
            }

            // Chama o modelo para excluir o cliente
            Clientes.deleteCliente(clienteCod, (err) => {
                if (err) {
                    console.error('Erro ao deletar cliente:', err);
                    return res.status(500).json({ error: 'Erro ao deletar cliente: ' + err.message });
                }
                res.redirect('/clientes');
            });
        });
    }
};

module.exports = clientesController;
