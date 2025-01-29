// Arquivo: routes/clientesRoutes.js
const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para exibir todos os clientes
router.get('/', clientesController.getAllCliente);

// Rota para renderizar o formulário de criação
router.get('/create', clientesController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', clientesController.createCliente);

// Rota para exibir informações de um cliente específico
router.get('/:cod', clientesController.getClienteById);

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', clientesController.renderEditForm);

// Rota para atualizar um cliente
router.put('/:cod', clientesController.updateCliente);

// Rota para excluir um cliente
router.delete('/:cod', clientesController.deleteCliente);

module.exports = router;
