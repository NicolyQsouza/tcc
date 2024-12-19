const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os usuários
router.get('/', produtosController.getAllProdutos); // Função para obter todos os usuários

// Rota para mostrar o formulário de criação de um novo usuário
router.get('/new', produtosController.renderCreateForm); // Função para renderizar o formulário de criação

// Rota para criar um novo usuário
router.post('/', produtosController.createProduto); // Função para criar um novo usuário (corrigido para "createProduto")

// Rota para mostrar detalhes de um usuário específico
router.get('/:id', produtosController.getProdutosById); // Função para obter um usuário por ID (corrigido para "getProdutoById")

// Rota para mostrar o formulário de edição de um usuário específico
router.get('/:id/edit', produtosController.renderEditForm); // Função para renderizar o formulário de edição

// Rota para atualizar um usuário específico
router.put('/:id', produtosController.updateProdutos); // Função para atualizar um usuário (corrigido para "updateProduto")

// Rota para deletar um usuário específico
router.delete('/:id', produtosController.deleteProdutos); // Função para deletar um usuário (corrigido para "deleteProduto")

module.exports = router;
