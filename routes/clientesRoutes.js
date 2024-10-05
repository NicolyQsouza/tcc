const express = require('express');
const clientesController = require('../controllers/clientesController');
const router = express.Router();

// Rota para obter todos os clientes
router.get('/', clientesController.getAllclientes);

// Rota para buscar clientes
router.get('/search', clientesController.searchclientes); // Adicione esta rota

// Rota para renderizar o formulário de criação
router.get('/new', clientesController.renderCreateForm);

// Rota para criar um novo clientes
router.post('/', clientesController.createclientes);

// Rota para obter um clientes específico pelo código
router.get('/:cod', clientesController.getclientesById);

// Rota para renderizar o formulário de edição
router.get('/:cod/edit', clientesController.renderEditForm);

// Rota para atualizar um clientes específico
router.put('/:cod', clientesController.updateclientes);

// Rota para deletar um clientes específico
router.delete('/:cod', clientesController.deleteclientes);

module.exports = router;
