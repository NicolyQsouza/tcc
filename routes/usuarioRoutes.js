const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Rota para listar todos os usuários
router.get('/', usuarioController.getAllUsuarios);

// Rota para mostrar o formulário de criação de um novo usuário
router.get('/new', usuarioController.renderCreateForm);

// Rota para criar um novo usuário
router.post('/', usuarioController.createUsuario);

// Rota para mostrar detalhes de um usuário específico
router.get('/:cod', usuarioController.getUsuarioById);  // Corrigido para :cod

// Rota para mostrar o formulário de edição de um usuário específico
router.get('/:cod/edit', usuarioController.renderEditForm); // Corrigido para :cod

// Rota para atualizar um usuário específico
router.put('/:cod', usuarioController.updateUsuario); // Corrigido para :cod

// Rota para deletar um usuário específico
router.delete('/:cod', usuarioController.deleteUsuario); // Corrigido para :cod

module.exports = router;
