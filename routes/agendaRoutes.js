const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

// Rota para a lista de todas as agendas
router.get('/', agendaController.getAll);

// Rota para renderizar o formulário de criação de agenda
router.get('/create', agendaController.renderCreateForm);

// Rota para criar uma nova agenda
router.post('/', agendaController.create);

// Rota para editar uma agenda
router.get('/:cod/edit', agendaController.getAgendaById);

// Rota para atualizar uma agenda
router.put('/:cod', agendaController.update);

// Rota para deletar uma agenda
router.delete('/:cod', agendaController.delete);

module.exports = router;
