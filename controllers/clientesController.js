const clientes = require('../models/clientesModel');

const clientesController = {
    createclientes: (req, res) => {
        const newclientes = {
            foto: req.body.foto,
            genero: req.body.genero,
            endereco: req.body.endereco,
            cod: req.body.cod,
            nome: req.body.nome,
            fone: req.body.fone,
            email: req.body.email,
            feedbacks: req.body.feedbacks, // New field
            agenda: req.body.agenda,     // New field
            data_de_nascimento: req.body.data_de_nascimento,
        };

        clientes.create(newclientes, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    getclientesById: (req, res) => {
        const clientesId = req.params.cod;

        clientes.findById(clientesId, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!clientes) {
                return res.status(404).json({ message: 'clientes não encontrado' });
            }
            res.render('clientes/show', { clientes });
        });
    },

    getAllclientes: (req, res) => {
        clientes.getAll((err, clientes) => {
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
        const clientesId = req.params.cod;

        clientes.findById(clientesId, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!clientes) {
                return res.status(404).json({ message: 'clientes não encontrado' });
            }
            res.render('clientes/edit', { clientes });
        });
    },

    updateclientes: (req, res) => {
        const clientesId = req.params.cod;
        const updatedclientes = {
            foto: req.body.foto,
            genero: req.body.genero,
            endereco: req.body.endereco,
            nome: req.body.nome,
            fone: req.body.fone,
            email: req.body.email,
            feedbacks: req.body.feedbacks, // New field
            agenda: req.body.agenda,     // New field
            data_de_nascimento: req.body.data_de_nascimento,
        };

        clientes.update(clientesId, updatedclientes, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    deleteclientes: (req, res) => {
        const clientesId = req.params.cod;

        clientes.delete(clientesId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/clientes');
        });
    },

    searchclientes: (req, res) => {
        const search = req.query.search || '';

        clientes.searchByName(search, (err, clientes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ clientes });
        });
    },
};

module.exports = clientesController;
