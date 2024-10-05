const usuarios = require('../models/usuariosModel');

const usuariosController = {
    createusuarios: async (req, res) => {
        try {
            const newusuarios = {
                nome: req.body.nome, // Alterado para "nome"
                senha: req.body.senha, // Alterado para "senha"
            };

            await usuarios.create(newusuarios);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getusuariosById: async (req, res) => {
        const usuariosId = req.params.id;

        try {
            const usuarios = await usuarios.findById(usuariosId);
            if (!usuarios) {
                return res.status(404).json({ message: 'usuarios not found' });
            }
            res.render('usuarios/show', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllusuarios: async (req, res) => {
        try {
            const usuarios = await usuarios.getAll();
            res.render('usuarios/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: async (req, res) => {
        const usuariosId = req.params.id;

        try {
            const usuarios = await usuarios.findById(usuariosId);
            if (!usuarios) {
                return res.status(404).json({ message: 'usuarios not found' });
            }
            res.render('usuarios/edit', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateusuarios: async (req, res) => {
        const usuariosId = req.params.id;
        const updatedusuarios = {
            nome: req.body.nome, // Alterado para "nome"
            senha: req.body.senha, // Alterado para "senha"
        };

        try {
            await usuarios.update(usuariosId, updatedusuarios);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteusuarios: async (req, res) => {
        const usuariosId = req.params.id;

        try {
            await usuarios.delete(usuariosId);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchusuarios: async (req, res) => {
        const search = req.query.search || '';

        try {
            const usuarios = await usuarios.searchByName(search);
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = usuariosController;
