const express = require('express');
const itemsProceController = require('../controllers/items_proceController');

const router = express.Router();

router.get('/', itemsProceController.getAllItemsProce);
router.get('/create', itemsProceController.renderCreateForm);
router.post('/', itemsProceController.createItemProce);
router.get('/:cod', itemsProceController.getItemProceByCod);
router.get('/:cod/edit', itemsProceController.renderEditForm);
router.put('/:cod', itemsProceController.updateItemProce);
router.delete('/:cod', itemsProceController.deleteItemProce);

module.exports = router;
