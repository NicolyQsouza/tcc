const express = require('express');
const agendaController = require('../controllers/agendaController');
const router = express.Router();

// Rota para obter todas as agendas
router.get('/', agendaController.getAll);

// Rota para renderizar o formulário de criação
router.get('/new', agendaController.renderCreateForm);

// Rota para criar uma nova agenda
router.post('/', agendaController.create);

// Rota para obter uma agenda específica pelo ID
router.get('/:id', agendaController.getById);

// Rota para renderizar o formulário de edição
router.get('/:id/edit', agendaController.renderEditForm);

// Rota para atualizar uma agenda específica
router.put('/:id', agendaController.update);

// Rota para deletar uma agenda específica
router.delete('/:id', agendaController.delete);

module.exports = router;
