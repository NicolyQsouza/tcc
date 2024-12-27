// Arquivo: routes/clientesRoutes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para a lista de todos os clientes
router.get('/', clientesController.getAllCliente);

// Rota para renderizar o formulário de criação de cliente
router.get('/create', clientesController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', clientesController.createCliente);

// Rota para mostrar os detalhes de um cliente
router.get('/:cod', clientesController.getClienteById);

// Rota para renderizar o formulário de edição de cliente
router.get('/:cod/edit', clientesController.renderEditForm);

// Rota para atualizar o cliente
router.put('/:cod', clientesController.updateCliente);

// Rota para deletar um cliente
router.get('/:cod/delete', clientesController.deleteCliente);

module.exports = router;
