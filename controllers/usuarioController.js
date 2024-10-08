const usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: async (req, res) => {
        try {
            const newUsuario = {
                nome: req.body.nome,
                senha: req.body.senha,
            };

            await usuario.create(newUsuario);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUsuarioById: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            const usuarioEncontrado = await usuario.getById(usuarioId);
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/show', { usuario: usuarioEncontrado });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await usuario.getAll();
            res.render('usuario/index', { usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('usuario/create');
    },

    renderEditForm: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            const usuarioEncontrado = await usuario.getById(usuarioId);
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/edit', { usuario: usuarioEncontrado });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuario: async (req, res) => {
        const usuarioId = req.params.id;
        const updatedUsuario = {
            nome: req.body.nome,
            senha: req.body.senha,
        };

        try {
            await usuario.update(usuarioId, updatedUsuario);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuario: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            await usuario.delete(usuarioId);
            res.redirect('/usuarios');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsuario: async (req, res) => {
        const search = req.query.search || '';

        try {
            const usuarios = await usuario.searchByName(search);
            res.json({ usuarios });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = usuarioController;
