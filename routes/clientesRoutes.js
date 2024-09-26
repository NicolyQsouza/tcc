const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

router.get('/', clienteController.getAllClientes);
router.get('/search', clienteController.searchClientes); // Adicione esta rota
router.get('/new', clienteController.renderCreateForm);
router.post('/', clienteController.createCliente);
router.get('/:cod', clienteController.getClienteById);
router.get('/:cod/edit', clienteController.renderEditForm);
router.put('/:cod', clienteController.updateCliente);
router.delete('/:cod', clienteController.deleteCliente);

module.exports = router;
