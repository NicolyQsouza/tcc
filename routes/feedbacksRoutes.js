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
router.get('/:cod', feedbacksController.getById);


// Rota para renderizar o formulário de edição
router.get('/:cod/edit', feedbacksController.renderEditForm);

// Rota para atualizar um feedback específico
// Rota para atualizar um feedback específico
router.put('/:cod', feedbacksController.update);

// Rota para deletar um feedback específico
router.delete('/:cod', feedbacksController.delete);

module.exports = router;
