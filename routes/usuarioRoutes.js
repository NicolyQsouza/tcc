const express = require('express');
const usuarioController = require('../controllers/usuarioController'); // Ajuste o nome do controlador
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios); // Ajuste o método
router.get('/search', usuarioController.searchUsuarios); // Adicione esta rota
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createUsuario); // Ajuste o método
router.get('/:id', usuarioController.getUsuarioById); // Ajuste o método
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario); // Ajuste o método
router.delete('/:id', usuarioController.deleteUsuario); // Ajuste o método

module.exports = router;
