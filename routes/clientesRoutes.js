const express = require('express');
const clientesController = require('../controllers/clientesController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/', clientesController.getAllClientes); // Corrigido o nome para 'getAllClientes'

// Rota para buscar clientes
router.get('/search', clientesController.searchClientes); // Corrigido o nome para 'searchClientes'

// Rota para renderizar o formulário de criação
router.get('/new', clientesController.renderCreateForm);

// Rota para criar um novo cliente
router.post('/', clientesController.createClientes); // Corrigido o nome para 'createClientes'

// Rota para obter um cliente específico pelo código
router.get('/:cod', clientesController.getClientesById); // Corrigido o nome para 'getClientesById'

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', clientesController.renderEditForm);

// Rota para atualizar um cliente específico
router.put('/:cod', clientesController.updateClientes); // Corrigido o nome para 'updateClientes'

// Rota para deletar um cliente específico
router.delete('/:cod', clientesController.deleteClientes); // Corrigido o nome para 'deleteClientes'

module.exports = router;
