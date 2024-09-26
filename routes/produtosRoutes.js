const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/new', produtoController.renderCreateForm);
router.post('/', produtoController.createProduto);
router.get('/:cod', produtoController.getProdutoById);
router.get('/:cod/edit', produtoController.renderEditForm);
router.put('/:cod', produtoController.updateProduto);
router.delete('/:cod', produtoController.deleteProduto);

module.exports = router;
