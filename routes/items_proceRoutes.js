const express = require('express');
const usaController = require('../controllers/usaController');
const router = express.Router();

router.get('/', usaController.getAllUsas);
router.get('/new', usaController.renderCreateForm);
router.post('/', usaController.createUsa);
router.get('/:id', usaController.getUsaById);
router.get('/:id/edit', usaController.renderEditForm);
router.put('/:id', usaController.updateUsa);
router.delete('/:id', usaController.deleteUsa);

module.exports = router;
