const Usuarios = require('../models/usuariosModel');

const usuarioController = {
    // Criar usuário
    createUsuario: (req, res) => {
        const novoUsuario = {
            nome: req.body.nome,
            senha: req.body.senha,
        };

        Usuarios.create(novoUsuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuario');
        });
    },

    // Obter usuário por ID
    getUsuarioById: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/show', { usuario });
        });
    },

    // Obter todos os usuários
    getAllUsuarios: (req, res) => {
        Usuarios.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuario/index', { usuarios });
        });
    },

    // Renderizar formulário de criação
    renderCreateForm: (req, res) => {
        res.render('usuario/create');
    },

    // Renderizar formulário de edição
    renderEditForm: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/edit', { usuario });
        });
    },

    // Atualizar usuário
    updateUsuario: (req, res) => {
        const usuarioId = req.params.cod;
        const usuarioAtualizado = {
            nome: req.body.nome,
            senha: req.body.senha,
        };

        Usuarios.update(usuarioId, usuarioAtualizado, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuario');
        });
    },

    // Deletar usuário
    deleteUsuario: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuario');
        });
    },

    // Buscar usuários por nome
    searchUsuarios: (req, res) => {
        const search = req.query.search || '';

        Usuarios.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuarioController;
