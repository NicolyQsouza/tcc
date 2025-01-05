const express = require('express');
const router = express.Router();
const procedimentosController = require('../controllers/procedimentosController'); // Verifique se o caminho e o nome estão corretos

// Rota para listar todos os procedimentos
router.get('/', procedimentosController.getAllProcedimentos); // Função getAllProcedimentos

// Rota para mostrar o formulário de criação de um novo procedimento
router.get('/new', procedimentosController.renderCreateForm); // Função renderCreateForm

// Rota para criar um novo procedimento
router.post('/', procedimentosController.createProcedimento); // Função createProcedimento

// Rota para mostrar detalhes de um procedimento específico
router.get('/:cod', procedimentosController.getProcedimentoById); // Função getProcedimentoById

// Rota para mostrar o formulário de edição de um procedimento específico
router.get('/:cod/edit', procedimentosController.renderEditForm); // Função renderEditForm

// Rota para atualizar um procedimento específico
router.put('/:cod', procedimentosController.updateProcedimento); // Função updateProcedimento

// Rota para deletar um procedimento específico
router.delete('/:cod', procedimentosController.deleteProcedimento); // Função deleteProcedimento

module.exports = router;