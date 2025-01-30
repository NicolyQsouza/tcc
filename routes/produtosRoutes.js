const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', produtosController.getAllProdutos);
router.get('/produtos2', produtosController.getAllProdutos); // Acesso via /produtos/produtos2

// Rota para criação de produto
router.get('/new', produtosController.renderCreateForm);
router.post('/', produtosController.createProduto);

// Rota para exibir detalhes de um produto
router.get('/:cod', produtosController.getProdutoById);

// Rotas para edição de produtos
router.get('/:cod/edit', produtosController.renderEditForm);
router.get('/produtos2/:cod/edit', produtosController.renderEditForm); // Ajuste para /produtos/produtos2/:cod/edit

// Rota para atualização de produto
router.put('/:cod', produtosController.updateProduto);
router.put('/produtos2/:cod', produtosController.updateProduto); // Ajuste para /produtos/produtos2/:cod

// Rota para deletar produto
router.delete('/:cod', produtosController.deleteProduto);
router.delete('/produtos2/:cod', produtosController.deleteProduto); // Ajuste para /produtos/produtos2/:cod

module.exports = router;
