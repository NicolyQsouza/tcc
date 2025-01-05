// Atualizado: routers/produtos.js
const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', produtosController.getAllProdutos); // Função para obter todos os produtos

// Rota para mostrar o formulário de criação de um novo produto
router.get('/new', produtosController.renderCreateForm); // Função para renderizar o formulário de criação

// Rota para criar um novo produto
router.post('/', produtosController.createProduto); // Função para criar um novo produto

// Rota para mostrar detalhes de um produto específico
router.get('/:id', produtosController.getProdutosById); // Função para obter um produto por ID

// Rota para mostrar o formulário de edição de um produto específico
router.get('/:id/edit', produtosController.renderEditForm); // Função para renderizar o formulário de edição

// Rota para atualizar um produto específico
router.put('/:id', produtosController.updateProdutos); // Função para atualizar um produto

// Rota para deletar um produto específico
router.delete('/:id', produtosController.deleteProdutos); // Função para deletar um produto

module.exports = router;