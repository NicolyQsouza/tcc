const Clientes = require('../models/clientesModel');

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

        // Validação básica dos campos
        if (!newCliente.nome || !newCliente.fone || !newCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        Clientes.create(newCliente, (err, clienteId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    getAllClientes: (req, res) => {
        Clientes.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('clientes/index', { clientes });
        });
    },

    getClienteById: (req, res) => {
        const clienteId = req.params.cod;

        Clientes.getById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
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
        const clienteId = req.params.cod;

        Clientes.getById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/edit', { cliente });
        });
    },

    updateCliente: (req, res) => {
        const clienteId = req.params.cod;

        const updatedCliente = {
            nome: req.body.nome,
            genero: req.body.genero,
            endereco: req.body.endereco,
            fone: req.body.fone,
            email: req.body.email,
            data_de_nascimento: req.body.data_de_nascimento
        };

        // Validação básica dos campos
        if (!updatedCliente.nome || !updatedCliente.fone || !updatedCliente.email) {
            return res.status(400).json({ error: 'Os campos nome, fone e email são obrigatórios.' });
        }

        Clientes.update(clienteId, updatedCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    deleteCliente: (req, res) => {
        const clienteId = req.params.cod;

        Clientes.delete(clienteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    searchClientes: (req, res) => {
        const search = req.query.search || '';

        Clientes.searchByName(search, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ clientes });
        });
    }
};

module.exports = clientesController;
