const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rota para a lista de todas as agendas
router.get('/', agendaController.getAll);

// Rota para renderizar o formulário de criação de agenda
router.get('/create', agendaController.renderCreateForm);

// Rota para criar uma nova agenda
router.post('/', agendaController.create);

// Rota para mostrar os detalhes de uma agenda
router.get('/:cod', agendaController.getById);

// Rota para renderizar o formulário de edição de agenda
router.get('/:cod/edit', agendaController.renderEditForm);

// Rota para atualizar a agenda
router.post('/:cod', agendaController.update);

// Rota para deletar uma agenda
router.get('/:cod/delete', agendaController.delete);

module.exports = router;
