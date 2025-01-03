const express = require('express');
const usuariosController = require('../controllers/usuariosController'); 
const router = express.Router();

// Rotas protegidas por autenticação
router.get('/', usuariosController.getAll);
router.get('/new', usuariosController.renderCreateForm);
router.post('/', usuariosController.create);
router.get('/:cod', usuariosController.getById);
router.get('/:cod/edit', usuariosController.renderEditForm);
router.put('/:cod', usuariosController.update);
router.delete('/:cod', usuariosController.delete);

module.exports = router;
