const usuario = require('../models/usuariosModel');

const usuarioController = {
    // Criar um novo usuário
    createUsuario: async (req, res) => {
        try {
            const { nome, senha } = req.body;

            // Validação de campos obrigatórios
            if (!nome || !senha) {
                return res.status(400).json({ error: 'Nome e senha são obrigatórios.' });
            }

            const newUsuario = { nome, senha };
            await usuario.create(newUsuario);
            res.redirect('/usuarios');
        } catch (err) {
            console.error('Erro ao criar usuário:', err);
            res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    // Buscar usuário por ID
    getUsuarioById: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            const usuarioEncontrado = await usuario.getById(usuarioId);
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/show', { usuario: usuarioEncontrado });
        } catch (err) {
            console.error('Erro ao buscar usuário por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
    },

    // Obter todos os usuários
    getAllUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.getAll();
            res.render('usuario/index', { usuarios });
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('usuario/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            const usuarioEncontrado = await usuario.getById(usuarioId);
            if (!usuarioEncontrado) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuario/edit', { usuario: usuarioEncontrado });
        } catch (err) {
            console.error('Erro ao carregar formulário de edição:', err);
            res.status(500).json({ error: 'Erro ao carregar formulário de edição.' });
        }
    },

    // Atualizar um usuário
    updateUsuario: async (req, res) => {
        const usuarioId = req.params.id;
        const { nome, senha } = req.body;

        // Validação de campos obrigatórios
        if (!nome || !senha) {
            return res.status(400).json({ error: 'Nome e senha são obrigatórios.' });
        }

        const updatedUsuario = { nome, senha };

        try {
            await usuario.update(usuarioId, updatedUsuario);
            res.redirect('/usuarios');
        } catch (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).json({ error: 'Erro ao atualizar usuário.' });
        }
    },

    // Deletar um usuário
    deleteUsuario: async (req, res) => {
        const usuarioId = req.params.id;

        try {
            await usuario.delete(usuarioId);
            res.redirect('/usuarios');
        } catch (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).json({ error: 'Erro ao deletar usuário.' });
        }
    },

    // Buscar usuários por nome (pesquisa)
    searchUsuario: async (req, res) => {
        const search = req.query.search || '';

        try {
            const usuarios = await usuario.searchByName(search);
            res.json({ usuarios });
        } catch (err) {
            console.error('Erro ao pesquisar usuários:', err);
            res.status(500).json({ error: 'Erro ao pesquisar usuários.' });
        }
    },
};

module.exports = usuarioController;
