const express = require('express');
const router = express.Router();  // Criação do roteador

const authController = require('../controllers/authController');  // Importando o controlador de autenticação

// Rotas de autenticação
router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/createUser', authController.createUser);

module.exports = router;  // Exportando o roteador
