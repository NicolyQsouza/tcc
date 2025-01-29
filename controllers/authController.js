const Usuarios = require('../models/usuariosModel');
const Produtos = require('../models/produtosModel');  // Supondo que você tenha o model de produtos
const cors = require('cors');
const express = require('express');
const app = express();

// Middleware de autenticação
function verificarAutenticacao(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'Você precisa estar logado para acessar esta página.');
        return res.redirect('/login');
    }
    next();
}

// Middleware de CORS (caso necessário para requisições de diferentes domínios)
app.use(cors({
    origin: 'http://seu-front-end.com', // Substitua pelo seu domínio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

module.exports = {
    renderLoginForm: (req, res) => {
        res.render('auth/login', { success: req.flash('success'), error: req.flash('error') });  // Corrigido o caminho da view
    },

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

            // Comparar a senha (sem bcrypt, apenas comparação direta)
            if (usuario.senha === senha) {
                req.session.user = usuario.nome;
                req.session.role = usuario.role; // Armazenar o papel (admin ou outro)
                req.flash('success', 'Login realizado com sucesso!');
                return res.redirect('/dashboard'); // Redireciona para o dashboard
            } else {
                req.flash('error', 'Nome ou senha inválidos.');
                return res.redirect('/login');
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/dashboard');
            }
            res.clearCookie('connect.sid'); // Limpa o cookie de sessão
            res.redirect('/login'); // Redireciona para a página de login após o logout
        });
    },

    createUser: (req, res) => {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            req.flash('error', 'Por favor, preencha todos os campos.');
            return res.redirect('/usuarios/new');
        }

        Usuarios.create({ nome, email, senha }, (err) => {
            if (err) {
                console.error('Erro ao criar o usuário:', err);
                req.flash('error', 'Erro ao criar o usuário.');
                return res.redirect('/usuarios/new');
            }

            req.flash('success', 'Usuário criado com sucesso!');
            res.redirect('/login');
        });
    },

    // Rota para exibir produtos, apenas para usuários autenticados
    listarProdutos: (req, res) => {
        // Verificação de permissões de acesso
        if (!req.session.role || req.session.role !== 'admin') {
            req.flash('error', 'Você não tem permissão para acessar esta página.');
            return res.redirect('/login');
        }

        // Processar a exibição dos produtos aqui
        Produtos.listar((err, produtos) => {
            if (err) {
                req.flash('error', 'Erro ao carregar produtos.');
                return res.redirect('/produtos');
            }
            res.render('produtos/listar', { produtos });
        });
    },

    // Rota para adicionar produto, apenas para usuários autenticados
    adicionarProduto: (req, res) => {
        const { nome, preco } = req.body;

        if (!nome || !preco) {
            req.flash('error', 'Nome e preço são obrigatórios.');
            return res.redirect('/produtos');
        }

        // Supondo que você tenha um método para criar produtos no banco
        Produtos.adicionar({ nome, preco }, (err) => {
            if (err) {
                req.flash('error', 'Erro ao adicionar o produto.');
                return res.redirect('/produtos');
            }
            req.flash('success', 'Produto adicionado com sucesso!');
            res.redirect('/produtos');
        });
    },
};

// Para liberar a rota de criação de usuário sem autenticação
app.post('/usuarios/new', module.exports.createUser);  // Rota liberada para qualquer usuário
