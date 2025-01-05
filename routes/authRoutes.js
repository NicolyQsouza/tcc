const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// Rotas públicas
router.get('/login', authController.renderLoginForm); // Formulário de login
router.post('/login', authController.login); // Processamento de login
router.get('/usuarios/create', (req, res) => {
    res.render('usuarios/create'); // Página de criação de usuários
});

// Middleware global para rotas autenticadas
router.use(isAuthenticated);

// Rotas autenticadas
router.get('', (req, res) => {
    res.render('dashboard'); // Painel do usuário
});
router.get('/logout', authController.logout); // Logout

// Rotas administrativas
router.get('/admin', isAdmin, (req, res) => {
    res.render('admin/dashboard', { user: req.session.user }); // Painel administrativo
});

module.exports = router;
