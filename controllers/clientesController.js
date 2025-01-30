const Clientes = require('../models/clientesModel');
const db = require('../config/db');

const clientesController = {
    createCliente: (req, res) => {
        console.log(req.body); // LOG PARA VERIFICAR DADOS RECEBIDOS

        const newCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento,
            avaliacao: req.body.avaliacao
        };

        if (!newCliente.nome || !newCliente.fone || !newCliente.email || !newCliente.avaliacao) {
            return res.status(400).json({ error: 'Os campos nome, fone, email e avaliação são obrigatórios.' });
        }

        if (newCliente.data_de_nascimento && isNaN(Date.parse(newCliente.data_de_nascimento))) {
            return res.status(400).json({ error: 'A data de nascimento é inválida.' });
        }

        Clientes.createCliente(newCliente, (err) => {
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
            data_de_nascimento: req.body.data_de_nascimento,
            avaliacao: req.body.avaliacao
        };

        if (!updatedCliente.nome || !updatedCliente.fone || !updatedCliente.email || !updatedCliente.avaliacao) {
            return res.status(400).json({ error: 'Os campos nome, fone, email e avaliação são obrigatórios.' });
        }

        if (updatedCliente.data_de_nascimento && isNaN(Date.parse(updatedCliente.data_de_nascimento))) {
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

        if (!clienteCod) {
            return res.status(400).json({ error: 'Código do cliente não fornecido.' });
        }

        const deleteAgendaQuery = 'DELETE FROM agenda WHERE clientes = ?';
        db.query(deleteAgendaQuery, [clienteCod], (err) => {
            if (err) {
                console.error('Erro ao excluir registros na agenda:', err);
                return res.status(500).json({ error: 'Erro ao excluir registros na agenda: ' + err.message });
            }

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
