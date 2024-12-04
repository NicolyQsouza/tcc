const express = require('express');
const itemsProceController = require('../controllers/items_proceController'); // Verifique se o nome do controlador está correto
const router = express.Router();

// Rota para obter todos os itens de procedimento
router.get('/', itemsProceController.getAllItemsProce);

// Rota para renderizar o formulário de criação de item
router.get('/new', itemsProceController.renderCreateForm);

// Rota para criar um novo item de procedimento
router.post('/', itemsProceController.createItemProce);

// Rota para obter um item específico por ID
router.get('/:id', itemsProceController.getItemProceById);

// Rota para renderizar o formulário de edição de um item
router.get('/:id/edit', itemsProceController.renderEditForm);

// Rota para atualizar um item de procedimento específico
router.put('/:id', itemsProceController.updateItemProce);

// Rota para deletar um item de procedimento específico
router.delete('/:id', itemsProceController.deleteItemProce);

module.exports = router;
