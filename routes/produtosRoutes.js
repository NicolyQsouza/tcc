const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para mostrar o formulário de criação de um novo produto
router.get('/new', produtoController.renderCreateForm);

// Rota para criar um novo produto
router.post('/', produtoController.createProduto);

// Rota para mostrar detalhes de um produto específico
router.get('/:cod', produtoController.getProdutoById);

// Rota para mostrar o formulário de edição de um produto específico
router.get('/:cod/edit', produtoController.renderEditForm);

// Rota para atualizar um produto específico
router.put('/:cod', produtoController.updateProduto);

// Rota para deletar um produto específico
router.delete('/:cod', produtoController.deleteProduto);

module.exports = router;
