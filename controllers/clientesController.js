const Cliente = require('../models/clienteModel');

const clienteController = {
    createCliente: (req, res) => {
        const newCliente = {
            foto: req.body.foto,
            genero: req.body.genero,
            endereco: req.body.endereco,
            cod: req.body.cod,
            nome: req.body.nome,
            fone: req.body.fone,
            email: req.body.email,
            feedback: req.body.feedback, // New field
            agenda: req.body.agenda,     // New field
            data_de_nascimento: req.body.data_de_nascimento,
        };

        Cliente.create(newCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    getClienteById: (req, res) => {
        const clienteId = req.params.cod;

        Cliente.findById(clienteId, (err, cliente) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
            res.render('clientes/show', { cliente });
        });
    },

    getAllClientes: (req, res) => {
        Cliente.getAll((err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('clientes/index', { clientes });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('clientes/create');
    },

    renderEditForm: (req, res) => {
        const clienteId = req.params.cod;

        Cliente.findById(clienteId, (err, cliente) => {
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
            foto: req.body.foto,
            genero: req.body.genero,
            endereco: req.body.endereco,
            nome: req.body.nome,
            fone: req.body.fone,
            email: req.body.email,
            feedback: req.body.feedback, // New field
            agenda: req.body.agenda,     // New field
            data_de_nascimento: req.body.data_de_nascimento,
        };

        Cliente.update(clienteId, updatedCliente, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    deleteCliente: (req, res) => {
        const clienteId = req.params.cod;

        Cliente.delete(clienteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    searchClientes: (req, res) => {
        const search = req.query.search || '';

        Cliente.searchByName(search, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ clientes });
        });
    },
};

module.exports = clienteController;
