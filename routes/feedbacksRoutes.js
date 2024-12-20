const express = require('express');
const feedbacksController = require('../controllers/feedbacksController');
const router = express.Router();

// Rota para obter todos os feedbacks
router.get('/', feedbacksController.getAll);

// Rota para renderizar o formulário de criação
router.get('/new', feedbacksController.renderCreateForm);

// Rota para criar um novo feedback
router.post('/', feedbacksController.create);

// Rota para obter um feedback específico pelo código
router.get('/:id', feedbacksController.getById); // Corrigido o parâmetro para 'id' para consistência

// Rota para renderizar o formulário de edição
router.get('/:id/edit', feedbacksController.renderEditForm); // Corrigido o parâmetro para 'id' para consistência

// Rota para atualizar um feedback específico
router.put('/:id', feedbacksController.update); // Corrigido o parâmetro para 'id' para consistência

// Rota para deletar um feedback específico
router.delete('/:id', feedbacksController.delete); // Corrigido o parâmetro para 'id' para consistência

module.exports = router;
