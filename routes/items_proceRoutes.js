const express = require('express');
const itemsProceController = require('../controllers/itemsProceController'); // Altere o nome do controlador se necessário
const router = express.Router();

router.get('/', itemsProceController.getAllItemsProce); // Para obter todos os itens
router.get('/new', itemsProceController.renderCreateForm); // Para renderizar o formulário de criação
router.post('/', itemsProceController.createItemProce); // Para criar um novo item
router.get('/:id', itemsProceController.getItemProceById); // Para obter um item por ID
router.get('/:id/edit', itemsProceController.renderEditForm); // Para renderizar o formulário de edição
router.put('/:id', itemsProceController.updateItemProce); // Para atualizar um item
router.delete('/:id', itemsProceController.deleteItemProce); // Para deletar um item

module.exports = router;
