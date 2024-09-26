const express = require('express');
const agendaController = require('../controllers/agendaController');
const router = express.Router();

router.get('/', agendaController.getAllAgendas);
router.get('/new', agendaController.renderCreateForm);
router.post('/', agendaController.createAgenda);
router.get('/:id', agendaController.getAgendaById);
router.get('/:id/edit', agendaController.renderEditForm);
router.put('/:id', agendaController.updateAgenda);
router.delete('/:id', agendaController.deleteAgenda);

module.exports = router;
