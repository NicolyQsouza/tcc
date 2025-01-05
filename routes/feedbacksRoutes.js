const express = require('express');
const feedbacksController = require('../controllers/feedbacksController');
const router = express.Router();
router.get('/', feedbacksController.getAll); // Função para obter todos os feedbacks

// Rota para mostrar o formulário de criação de um novo feedback
router.get('/new', feedbacksController.renderCreateForm); // Função para renderizar o formulário de criação

// Rota para criar um novo feedback
router.post('/', feedbacksController.create); // Função para criar um novo feedback

// Rota para mostrar detalhes de um feedback específico
router.get('/:cod', feedbacksController.getById); // Função para obter um feedback por ID

// Rota para mostrar o formulário de edição de um feedback específico
router.get('/:cod/edit', feedbacksController.renderEditForm); // Função para renderizar o formulário de edição

// Rota para atualizar um feedback específico
router.put('/:cod', feedbacksController.update); // Função para atualizar um feedback

// Rota para deletar um feedback específico
router.delete('/:cod', feedbacksController.delete); // Função para deletar um feedback

module.exports = router;
