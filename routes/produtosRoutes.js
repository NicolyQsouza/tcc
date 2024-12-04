const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', produtosController.getAllProdutos);

// Rota para mostrar o formulário de criação de um novo produto
router.get('/new', produtosController.renderCreateForm);

// Rota para criar um novo produto
router.post('/', produtosController.createProdutos); // Alterado para 'createProdutos'

// Rota para mostrar detalhes de um produto específico
router.get('/:cod', produtosController.getProdutosById); // Alterado para 'getProdutosById'

// Rota para mostrar o formulário de edição de um produto específico
router.get('/:cod/edit', produtosController.renderEditForm);

// Rota para atualizar um produto específico
router.put('/:cod', produtosController.updateProdutos); // Alterado para 'updateProdutos'

// Rota para deletar um produto específico
router.delete('/:cod', produtosController.deleteProdutos); // Alterado para 'deleteProdutos'

module.exports = router;
