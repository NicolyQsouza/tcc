const express = require('express');
const authController = require('../controllers/authController');
const isAdmin = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para a página de login
router.get('/login', authController.renderLoginForm);

// Rota para processar o login (POST)
router.post('/login', authController.login);

// Rota para logout
router.get('/logout', authController.logout);

// Página pública (qualquer usuário pode acessar)
router.get('/', (req, res) => {
    res.render('public/home'); // Página inicial pública
});

// Página de dashboard, acessível apenas para admins autenticados
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard'); // Página do admin
});

module.exports = router;
