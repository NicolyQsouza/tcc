const express = require('express');
const router = express.Router();  

const authController = require('../controllers/authController');  

// Rotas de autenticação
router.get('/login', authController.renderLoginForm);
router.get('/login2', authController.renderLoginForm2);  
router.post('/login', authController.login);
router.post('/login2', authController.login);
router.get('/logout', authController.logout);
router.post('/createUser', authController.createUser);

module.exports = router;  
