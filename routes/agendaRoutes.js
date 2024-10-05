const express = require('express');
const agendaController = require('../controllers/agendaController');
const router = express.Router();

// Rota para obter todas as agendas
router.get('/', agendaController.getAllAgendas);

// Rota para renderizar o formulário de criação
router.get('/new', agendaController.renderCreateForm);

// Rota para criar uma nova agenda
router.post('/', agendaController.createAgenda);

// Rota para obter uma agenda específica pelo ID
router.get('/:id', agendaController.getAgendaById);

// Rota para renderizar o formulário de edição
router.get('/:id/edit', agendaController.renderEditForm);

// Rota para atualizar uma agenda específica
router.put('/:id', agendaController.updateAgenda);

// Rota para deletar uma agenda específica
router.delete('/:id', agendaController.deleteAgenda);

module.exports = router;
