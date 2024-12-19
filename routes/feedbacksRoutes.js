const express = require('express');
const feedbacksController = require('../controllers/feedbacksController');
const router = express.Router();

// Rota para obter todos os feedbacks
router.get('/', feedbacksController.getAll);

// Rota para renderizar o formulário de criação
router.get('/new', feedbacksController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', feedbacksController.create);

// Rota para obter um cliente específico pelo código
router.get('/:cod', feedbacksController.getById);

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', feedbacksController.renderEditForm);

// Rota para atualizar um cliente específico
router.put('/:cod', feedbacksController.update);

// Rota para deletar um cliente específico
router.delete('/:cod', feedbacksController.delete);

module.exports = router;
