const express = require('express');
const items_proceController = require('../controllers/items_proceController'); // Altere o nome do controlador se necessário
const router = express.Router();

router.get('/', items_proceController.getAllitems_proce); // Para obter todos os itens
router.get('/new', items_proceController.renderCreateForm); // Para renderizar o formulário de criação
router.post('/', items_proceController.createItemProce); // Para criar um novo item
router.get('/:id', items_proceController.getItemProceById); // Para obter um item por ID
router.get('/:id/edit', items_proceController.renderEditForm); // Para renderizar o formulário de edição
router.put('/:id', items_proceController.updateItemProce); // Para atualizar um item
router.delete('/:id', items_proceController.deleteItemProce); // Para deletar um item

module.exports = router;
