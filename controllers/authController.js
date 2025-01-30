const Usuarios = require('../models/usuariosModel');
const Produtos = require('../models/produtosModel');  
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

// Middleware de CORS
app.use(cors({
    origin: 'http://seu-front-end.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

module.exports = {
    renderLoginForm: (req, res) => {
        res.render('auth/login', { success: req.flash('success'), error: req.flash('error') });
    },

    renderLoginForm2: (req, res) => {  // Novo renderizador para login2
        res.render('auth/login2', { success: req.flash('success'), error: req.flash('error') });
    },

    login: (req, res) => {
        const { nome, senha } = req.body;

        Usuarios.getByUsername(nome, (err, usuario) => {
            if (err) {
                req.flash('error', 'Erro ao verificar usuário.');
                return res.redirect('/login');
            }

            if (!usuario) {
                req.flash('error', 'Nome de usuário não encontrado.');
                return res.redirect('/login');
            }

            if (usuario.senha === senha) {
                req.session.user = usuario.nome;
                req.session.role = usuario.role;
                req.flash('success', 'Login realizado com sucesso!');
                return res.redirect('/dashboard');
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
            res.clearCookie('connect.sid');
            res.redirect('/login');
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

    listarProdutos: (req, res) => {
        if (!req.session.role || req.session.role !== 'admin') {
            req.flash('error', 'Você não tem permissão para acessar esta página.');
            return res.redirect('/login');
        }

        Produtos.listar((err, produtos) => {
            if (err) {
                req.flash('error', 'Erro ao carregar produtos.');
                return res.redirect('/produtos');
            }
            res.render('produtos/listar', { produtos });
        });
    },

    adicionarProduto: (req, res) => {
        const { nome, preco } = req.body;

        if (!nome || !preco) {
            req.flash('error', 'Nome e preço são obrigatórios.');
            return res.redirect('/produtos');
        }

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

// Rota aberta para criação de usuário
app.post('/usuarios/new', module.exports.createUser);
