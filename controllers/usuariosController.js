const Usuarios = require('../models/usuariosModel');

// Middleware para verificar autenticação
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
        return res.redirect('/login');
    }
    next();
}

const usuariosController = {
    // Listar todos os usuários - Apenas para admin
    getAll: (req, res) => {
        if (!req.session.role || req.session.role !== 'admin') {
            req.flash('error', 'Acesso restrito! Somente administradores podem acessar.');
            return res.redirect('/login');
        }

        Usuarios.getAll((err, usuarios) => {
            if (err) {
                console.error('Erro ao carregar usuários:', err);
                req.flash('error', 'Ocorreu um erro ao carregar os usuários.');
                return res.status(500).render('error', { message: 'Erro no servidor.' });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    // Exibir formulário de criação - Acesso liberado para todos
    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    // Criar novo usuário
    create: (req, res) => {
        const { nome, senha, role } = req.body;

        if (!nome || !senha) {
            req.flash('error', 'Nome e senha são obrigatórios.');
            return res.redirect('/usuarios/create');
        }

        // Define o papel padrão como "user"
        const novoUsuario = { nome, senha, role: role || 'user' };

        Usuarios.getAll((err, usuarios) => {
            if (err) {
                console.error('Erro ao verificar usuários existentes:', err);
                req.flash('error', 'Erro ao verificar usuários existentes.');
                return res.status(500).redirect('/usuarios/create');
            }

            // O primeiro usuário criado será "admin"
            if (usuarios.length === 0) {
                novoUsuario.role = 'admin';
                novoUsuario.nome = 'admin';
                novoUsuario.senha = '123';  // Senha fixa para o admin
            }

            Usuarios.create(novoUsuario, (err) => {
                if (err) {
                    console.error('Erro ao criar usuário:', err);
                    req.flash('error', 'Erro ao criar usuário. Tente novamente.');
                    return res.status(500).redirect('/usuarios/create');
                }
                req.flash('success', 'Usuário criado com sucesso!');
                res.redirect('/login');
            });
        });
    },

    // Obter usuário por ID
    getById: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar usuário:', err);
                req.flash('error', 'Erro ao buscar usuário.');
                return res.status(500).redirect('/usuarios');
            }
            if (!usuario) {
                req.flash('error', 'Usuário não encontrado.');
                return res.status(404).redirect('/usuarios');
            }
            res.render('usuarios/show', { usuario });
        });
    },

    // Exibir formulário de edição - Apenas para o usuário logado ou admin
    renderEditForm: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar usuário para edição:', err);
                req.flash('error', 'Erro ao buscar dados para edição.');
                return res.status(500).redirect('/usuarios');
            }
            if (!usuario) {
                req.flash('error', 'Usuário não encontrado.');
                return res.status(404).redirect('/usuarios');
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    // Atualizar usuário - Apenas para o usuário logado ou admin
    update: (req, res) => {
        const usuarioId = req.params.cod;
        const { nome, senha, role } = req.body;

        if (!nome) {
            req.flash('error', 'O nome não pode estar vazio.');
            return res.redirect(`/usuarios/${usuarioId}/edit`);
        }

        const usuarioAtualizado = {
            nome,
            senha: senha || null, // Se senha não for fornecida, mantém a anterior
            role: role || 'user',
        };

        Usuarios.update(usuarioId, usuarioAtualizado, (err) => {
            if (err) {
                console.error('Erro ao atualizar usuário:', err);
                req.flash('error', 'Erro ao atualizar usuário.');
                return res.status(500).redirect('/usuarios');
            }
            req.flash('success', 'Usuário atualizado com sucesso!');
            res.redirect('/usuarios');
        });
    },

    // Deletar usuário - Apenas para admin
    delete: (req, res) => {
        const usuarioId = req.params.cod;

        if (!req.session.role || req.session.role !== 'admin') {
            req.flash('error', 'Acesso restrito! Somente administradores podem acessar.');
            return res.redirect('/login');
        }

        Usuarios.delete(usuarioId, (err) => {
            if (err) {
                console.error('Erro ao deletar usuário:', err);
                req.flash('error', 'Erro ao deletar usuário.');
                return res.status(500).redirect('/usuarios');
            }
            req.flash('success', 'Usuário deletado com sucesso!');
            res.redirect('/usuarios');
        });
    },

    // Método para autenticar o usuário
    login: (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            req.flash('error', 'Nome e senha são obrigatórios.');
            return res.redirect('/login');
        }

        Usuarios.getByUsername(nome, (err, usuario) => {
            if (err) {
                console.error('Erro ao verificar usuário:', err);
                req.flash('error', 'Erro ao verificar usuário.');
                return res.status(500).redirect('/login');
            }

            if (!usuario || usuario.senha !== senha) {
                req.flash('error', 'Nome de usuário ou senha incorretos.');
                return res.redirect('/login');
            }

            req.session.user = usuario;
            req.session.role = usuario.role;  // Salva o papel do usuário
            req.flash('success', 'Login realizado com sucesso!');
            res.redirect('/');  // Redireciona para a página inicial ou dashboard
        });
    },

    // Método para fazer logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error('Erro ao destruir a sessão:', err);
                req.flash('error', 'Erro ao deslogar.');
                return res.redirect('/');
            }
            res.redirect('/login');
        });
    }
};

module.exports = usuariosController;
