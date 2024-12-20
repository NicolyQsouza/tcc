const express = require('express');
const usuariosController = require('../controllers/usuariosController');  // Certifique-se que o caminho está correto
const router = express.Router();

// Rota para listar todos os usuários
router.get('/', usuariosController.getAll);

// Rota para mostrar o formulário de criação de um novo usuário
router.get('/new', usuariosController.renderCreateForm);

// Rota POST para criar um novo usuário
router.post('/', usuariosController.create);  

// Rota para mostrar detalhes de um usuário específico
router.get('/:cod', usuariosController.getById);

// Rota para mostrar o formulário de edição de um usuário específico
router.get('/:cod/edit', usuariosController.renderEditForm);

// Rota para atualizar um usuário específico
router.put('/:cod', usuariosController.update);

// Rota para deletar um usuário específico
router.delete('/:cod', usuariosController.delete);

module.exports = router;
