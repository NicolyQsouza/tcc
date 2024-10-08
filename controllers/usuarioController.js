const usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: async (req, res) => { // Corrigido para "createUsuario"
        try {
            const newUsuario = {
                nome: req.body.nome, // Alterado para "nome"
                senha: req.body.senha, // Alterado para "senha"
            };

            await usuario.create(newUsuario);
            res.redirect('/usuarios'); // Corrigido o redirecionamento
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getUsuarioById: async (req, res) => { // Corrigido para "getUsuarioById"
        const usuarioId = req.params.id;

        try {
            const usuarioEncontrado = await usuario.getById(usuarioId); // Corrigido para "getById"
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/show', { usuario: usuarioEncontrado }); // Corrigido para usar "usuarioEncontrado"
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllUsuarios: async (req, res) => { // Corrigido para "getAllUsuarios"
        try {
            const usuarios = await usuario.getAll(); // Corrigido para usar "getAll"
            res.render('usuario/index', { usuarios }); // Corrigido para usar "usuarios"
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
            const usuarioEncontrado = await usuario.getById(usuarioId); // Corrigido para "getById"
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/edit', { usuario: usuarioEncontrado }); // Corrigido para usar "usuarioEncontrado"
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateUsuario: async (req, res) => { // Corrigido para "updateUsuario"
        const usuarioId = req.params.id;
        const updatedUsuario = {
            nome: req.body.nome, // Alterado para "nome"
            senha: req.body.senha, // Alterado para "senha"
        };

        try {
            await usuario.update(usuarioId, updatedUsuario); // Corrigido para "update"
            res.redirect('/usuarios'); // Corrigido o redirecionamento
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteUsuario: async (req, res) => { // Corrigido para "deleteUsuario"
        const usuarioId = req.params.id;

        try {
            await usuario.delete(usuarioId); // Corrigido para "delete"
            res.redirect('/usuarios'); // Corrigido o redirecionamento
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchUsuario: async (req, res) => { // Corrigido para "searchUsuario"
        const search = req.query.search || '';

        try {
            const usuarios = await usuario.searchByName(search); // Corrigido para usar "searchByName"
            res.json({ usuarios }); // Corrigido para usar "usuarios"
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = usuarioController;
