const express = require('express');
const produtosController = require('../controllers/produtosController');
const router = express.Router();

// Rota para listar todos os produtoss
router.get('/', produtosController.getAllProdutos);

// Rota para mostrar o formulário de criação de um novo produtos
router.get('/new', produtosController.renderCreateForm);

// Rota para criar um novo produtos
router.post('/', produtosController.createprodutos);

// Rota para mostrar detalhes de um produtos específico
router.get('/:cod', produtosController.getprodutosById);

// Rota para mostrar o formulário de edição de um produtos específico
router.get('/:cod/edit', produtosController.renderEditForm);

// Rota para atualizar um produtos específico
router.put('/:cod', produtosController.updateprodutos);

// Rota para deletar um produtos específico
router.delete('/:cod', produtosController.deleteprodutos);

module.exports = router;
