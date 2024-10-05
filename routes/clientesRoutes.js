const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/', clienteController.getAllClientes);

// Rota para buscar clientes
router.get('/search', clienteController.searchClientes); // Adicione esta rota

// Rota para renderizar o formulário de criação
router.get('/new', clienteController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', clienteController.createCliente);

// Rota para obter um cliente específico pelo código
router.get('/:cod', clienteController.getClienteById);

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', clienteController.renderEditForm);

// Rota para atualizar um cliente específico
router.put('/:cod', clienteController.updateCliente);

// Rota para deletar um cliente específico
router.delete('/:cod', clienteController.deleteCliente);

module.exports = router;
