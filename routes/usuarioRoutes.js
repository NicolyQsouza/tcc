const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllusuario); // Verifique se o nome está correto
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createusuario); // Verifique se o nome está correto
router.get('/:id', usuarioController.getusuarioById); // Verifique se o nome está correto
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateusuario); // Verifique se o nome está correto
router.delete('/:id', usuarioController.deleteusuario); // Verifique se o nome está correto

module.exports = router;
