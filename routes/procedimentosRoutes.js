const express = require('express');
const router = express.Router();
const procedimentosController = require('../controllers/procedimentosController');

// Rota para listar todos os procedimentoss
router.get('/', procedimentosController.getAllprocedimentos);

// Rota para mostrar o formulário de criação de um novo procedimentos
router.get('/new', procedimentosController.renderCreateForm);

// Rota para criar um novo procedimentos
router.post('/', procedimentosController.createprocedimentos);

// Rota para mostrar detalhes de um procedimentos específico
router.get('/:cod', procedimentosController.getprocedimentosById);

// Rota para mostrar o formulário de edição de um procedimentos específico
router.get('/:cod/edit', procedimentosController.renderEditForm);

// Rota para atualizar um procedimentos específico
router.put('/:cod', procedimentosController.updateprocedimentos);

// Rota para deletar um procedimentos específico
router.delete('/:cod', procedimentosController.deleteprocedimentos);

module.exports = router;
