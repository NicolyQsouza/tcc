const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios); // Corrigido para "getAllUsuarios"
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createUsuario); // Corrigido para "createUsuario"
router.get('/:id', usuarioController.getUsuarioById); // Corrigido para "getUsuarioById"
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario); // Corrigido para "updateUsuario"
router.delete('/:id', usuarioController.deleteUsuario); // Corrigido para "deleteUsuario"

module.exports = router;
