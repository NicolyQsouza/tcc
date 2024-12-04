const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', produtosController.getAllProdutos); // Função para obter todos os produtos

// Rota para mostrar o formulário de criação de um novo produto
router.get('/new', produtosController.renderCreateForm); // Função para renderizar o formulário de criação

// Rota para criar um novo produto
router.post('/', produtosController.createProduto); // Função para criar um novo produto (corrigido)

// Rota para mostrar detalhes de um produto específico
router.get('/:cod', produtosController.getProdutoById); // Função para obter um produto por código (corrigido)

// Rota para mostrar o formulário de edição de um produto específico
router.get('/:cod/edit', produtosController.renderEditForm); // Função para renderizar o formulário de edição

// Rota para atualizar um produto específico
router.put('/:cod', produtosController.updateProduto); // Função para atualizar o produto (corrigido)

// Rota para deletar um produto específico
router.delete('/:cod', produtosController.deleteProduto); // Função para deletar o produto (corrigido)

module.exports = router;
