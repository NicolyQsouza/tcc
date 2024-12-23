const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rota para obter todas as agendas
router.get('/', agendaController.getAll);

// Rota para renderizar o formulário de criação de agenda
router.get('/create', agendaController.renderCreateForm);

// Rota para criar uma nova agenda
router.post('/', agendaController.create);

// Rota para obter os detalhes de uma agenda pelo código
router.get('/:cod', agendaController.getById);

// Rota para atualizar a agenda
router.post('/:cod', agendaController.update);

// Rota para deletar uma agenda
router.delete('/:cod', agendaController.delete);

module.exports = router;
