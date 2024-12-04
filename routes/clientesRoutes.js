const express = require('express');
const clientesController = require('../controllers/clientesController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/', clientesController.getAllClientes);

// Rota para buscar clientes
router.get('/search', clientesController.searchClientes);

// Rota para renderizar o formulário de criação
router.get('/new', clientesController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', clientesController.createCliente);

// Rota para obter um cliente específico pelo código
router.get('/:cod', clientesController.getClienteById);

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', clientesController.renderEditForm);

// Rota para atualizar um cliente específico
router.put('/:cod', clientesController.updateCliente);

// Rota para deletar um cliente específico
router.delete('/:cod', clientesController.deleteCliente);

module.exports = router;
