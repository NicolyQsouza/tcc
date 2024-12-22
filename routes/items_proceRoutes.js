const express = require('express');
const itemsProceController = require('../controllers/itemsProceController');
 // Verifique se o nome do controlador está correto
const router = express.Router();

// Rota para listar todos os items_proce
router.get('/', itemsProceController.getAllItemsProce);

// Rota para mostrar o formulário de criação de um novo item_proce
router.get('/new', itemsProceController.renderCreateForm); // Anteriormente estava '/create'

// Rota para criar um novo item_proce
router.post('/', itemsProceController.createItemProce);

// Rota para obter um item de procedimento específico por ID
router.get('/:id', itemsProceController.getItemProceById);

// Rota para renderizar o formulário de edição de um item de procedimento
router.get('/:id/edit', itemsProceController.renderEditForm);

// Rota para atualizar um item de procedimento específico
router.put('/:id', itemsProceController.updateItemProce);

// Rota para excluir um item de procedimento específico
router.delete('/:id', itemsProceController.deleteItemProce);

module.exports = router;
