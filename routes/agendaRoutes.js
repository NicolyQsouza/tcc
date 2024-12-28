const express = require('express');
const agendaController = require('../controllers/agendaController');
const router = express.Router();

router.get('/', agendaController.getAll);
router.get('/create', agendaController.renderCreateForm);
router.post('/', agendaController.create);
router.get('/:cod', agendaController.getAgendaById);
router.get('/:cod/edit', agendaController.renderEditForm);
router.put('/:cod', agendaController.update);
router.delete('/:cod', agendaController.delete);

module.exports = router;
