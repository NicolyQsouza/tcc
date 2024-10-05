const express = require('express');
const feedbacksController = require('../controllers/feedbacksController');
const router = express.Router();

// Rota para obter todos os feedbacks
router.get('/', feedbacksController.getAllfeedbacks);

// Rota para renderizar o formulário de criação de feedbacks
router.get('/new', feedbacksController.renderCreateForm);

// Rota para criar um novo feedbacks
router.post('/', feedbacksController.createfeedbacks);

// Rota para obter um feedbacks específico pelo ID
router.get('/:id', feedbacksController.getfeedbacksById);

// Rota para renderizar o formulário de edição de feedbacks
router.get('/:id/edit', feedbacksController.renderEditForm);

// Rota para atualizar um feedbacks específico
router.put('/:id', feedbacksController.updatefeedbacks);

// Rota para deletar um feedbacks específico
router.delete('/:id', feedbacksController.deletefeedbacks);

module.exports = router;
