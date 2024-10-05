const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

// Rota para obter todos os feedbacks
router.get('/', feedbackController.getAllFeedbacks);

// Rota para renderizar o formulário de criação de feedback
router.get('/new', feedbackController.renderCreateForm);

// Rota para criar um novo feedback
router.post('/', feedbackController.createFeedback);

// Rota para obter um feedback específico pelo ID
router.get('/:id', feedbackController.getFeedbackById);

// Rota para renderizar o formulário de edição de feedback
router.get('/:id/edit', feedbackController.renderEditForm);

// Rota para atualizar um feedback específico
router.put('/:id', feedbackController.updateFeedback);

// Rota para deletar um feedback específico
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
