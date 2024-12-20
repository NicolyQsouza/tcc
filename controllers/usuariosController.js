const Usuarios = require('../models/usuariosModel');  // Importação do modelo de usuários

const usuariosController = {
    // Função para listar todos os usuários
    getAll: (req, res) => {
        Usuarios.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    // Função para exibir o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    // Função para criar um novo usuário
    create: (req, res) => {
        const novoUsuario = {
            nome: req.body.nome,
            senha: req.body.senha
        };

        // Usando o modelo para salvar o novo usuário
        Usuarios.create(novoUsuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Redireciona para a página de listagem de usuários
            res.redirect('/usuarios');
        });
    },

    // Função para obter um usuário específico
    getById: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    // Função para renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    // Função para atualizar um usuário específico
    update: (req, res) => {
        const usuarioId = req.params.cod;
        const usuarioAtualizado = {
            nome: req.body.nome,
            senha: req.body.senha || null  // Senha pode ser null se não for alterada
        };

        Usuarios.update(usuarioId, usuarioAtualizado, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    // Função para deletar um usuário
    delete: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    }
};

module.exports = usuariosController;
