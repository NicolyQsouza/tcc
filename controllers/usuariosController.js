const Usuarios = require('../models/usuariosModel');  // Importação do modelo de usuários

// Middleware para verificar autenticação do usuário
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
        return res.redirect('/login');
    }
    next();
}

// Middleware para verificar se o usuário é administrador
function isAdmin(req, res, next) {
    if (req.session.role !== 'admin') {
        req.flash('error', 'Acesso restrito! Somente administradores podem acessar.');
        return res.redirect('/login');
    }
    next();
}

const usuariosController = {
    // Renderiza o formulário de login
    renderLoginForm: (req, res) => {
        res.render('auth/login', { success: req.flash('success'), error: req.flash('error') });
    },

    // Processa o login
    login: (req, res) => {
        const { nome, senha } = req.body;

        // Verificar o usuário no banco de dados
        Usuarios.getByUsername(nome, (err, usuario) => {
            if (err) {
                req.flash('error', 'Erro ao verificar usuário.');
                return res.redirect('/login');
            }

            if (!usuario) {
                req.flash('error', 'Nome de usuário não encontrado.');
                return res.redirect('/login');
            }

            // Comparar a senha
            if (usuario.senha === senha) {
                // Armazenar os dados do usuário na sessão
                req.session.user = usuario.nome;
                req.session.role = usuario.role; // Papel do usuário (admin ou outro)
                req.flash('success', 'Login realizado com sucesso!');

                // Redirecionar com base no papel do usuário
                if (usuario.role === 'admin') {
                    return res.redirect('/admin'); // Área administrativa
                } else {
                    return res.redirect('/produtos'); // Área normal de usuários
                }
            } else {
                req.flash('error', 'Nome ou senha inválidos.');
                return res.redirect('/login');
            }
        });
    },

    // Processa o logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                req.flash('error', 'Erro ao realizar logout.');
                return res.redirect('/dashboard');
            }
            res.clearCookie('connect.sid'); // Limpa o cookie de sessão
            req.flash('success', 'Logout realizado com sucesso!');
            res.redirect('/login'); // Redireciona para a página de login após o logout
        });
    },

    // Área administrativa - Painel
    adminDashboard: (req, res) => {
        res.render('admin/dashboard', { user: req.session.user });
    },

    // Função para listar todos os usuários
    getAll: (req, res) => {
        Usuarios.getAll((err, usuarios) => {
            if (err) {
                req.flash('error', 'Ocorreu um erro ao carregar os usuários.');
                return res.status(500).render('error', { message: 'Erro no servidor.' });
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
        const { nome, senha } = req.body;
        if (!nome || !senha) {
            req.flash('error', 'Nome e senha são obrigatórios.');
            return res.redirect('/usuarios/create');
        }

        const novoUsuario = { nome, senha };

        Usuarios.create(novoUsuario, (err, usuarioId) => {
            if (err) {
                req.flash('error', 'Erro ao criar usuário. Tente novamente.');
                return res.status(500).redirect('/usuarios/create');
            }
            req.flash('success', 'Usuário criado com sucesso!');
            res.redirect('/usuarios');
        });
    },

    // Função para obter um usuário específico
    getById: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
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

    // Função para renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.getById(usuarioId, (err, usuario) => {
            if (err) {
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

    // Função para atualizar um usuário específico
    update: (req, res) => {
        const usuarioId = req.params.cod;
        const usuarioAtualizado = {
            nome: req.body.nome,
            senha: req.body.senha || null  // Senha pode ser null se não for alterada
        };

        Usuarios.update(usuarioId, usuarioAtualizado, (err) => {
            if (err) {
                req.flash('error', 'Erro ao atualizar usuário.');
                return res.status(500).redirect('/usuarios');
            }
            req.flash('success', 'Usuário atualizado com sucesso!');
            res.redirect('/usuarios');
        });
    },

    // Função para deletar um usuário
    delete: (req, res) => {
        const usuarioId = req.params.cod;

        Usuarios.delete(usuarioId, (err) => {
            if (err) {
                req.flash('error', 'Erro ao deletar usuário.');
                return res.status(500).redirect('/usuarios');
            }
            req.flash('success', 'Usuário deletado com sucesso!');
            res.redirect('/usuarios');
        });
    }
};

module.exports = usuariosController;
