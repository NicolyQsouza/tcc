const express = require('express');
const router = express.Router();
const procedimentoController = require('../controllers/procedimentoController');

// Rota para listar todos os procedimentos
router.get('/', procedimentoController.getAllProcedimentos);

// Rota para mostrar o formulário de criação de um novo procedimento
router.get('/new', procedimentoController.renderCreateForm);

// Rota para criar um novo procedimento
router.post('/', procedimentoController.createProcedimento);

// Rota para mostrar detalhes de um procedimento específico
router.get('/:cod', procedimentoController.getProcedimentoById);

// Rota para mostrar o formulário de edição de um procedimento específico
router.get('/:cod/edit', procedimentoController.renderEditForm);

// Rota para atualizar um procedimento específico
router.put('/:cod', procedimentoController.updateProcedimento);

// Rota para deletar um procedimento específico
router.delete('/:cod', procedimentoController.deleteProcedimento);

module.exports = router;
