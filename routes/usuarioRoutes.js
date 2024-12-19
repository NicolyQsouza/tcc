const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Rota para listar todos os usuários
router.get('/', usuarioController.getAllUsuarios); // Função para obter todos os usuários

// Rota para mostrar o formulário de criação de um novo usuário
router.get('/new', usuarioController.renderCreateForm); // Função para renderizar o formulário de criação

// Rota para criar um novo usuário
router.post('/', usuarioController.createUsuario); // Função para criar um novo usuário (corrigido para "createUsuario")

// Rota para mostrar detalhes de um usuário específico
router.get('/:cod', usuarioController.getUsuariosById); // Função para obter um usuário por ID (corrigido para "getUsuarioById")

// Rota para mostrar o formulário de edição de um usuário específico
router.get('/:cod/edit', usuarioController.renderEditForm); // Função para renderizar o formulário de edição

// Rota para atualizar um usuário específico
router.put('/:cod', usuarioController.updateUsuarios); // Função para atualizar um usuário (corrigido para "updateUsuario")

// Rota para deletar um usuário específico
router.delete('/:cod', usuarioController.deleteUsuarios); // Função para deletar um usuário (corrigido para "deleteUsuario")

module.exports = router;
