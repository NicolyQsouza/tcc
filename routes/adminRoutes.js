const express = require('express');
const isAdmin = require('../middleware/authMiddleware');
const router = express.Router();

// Rota para o painel administrativo (apenas acessível para admin)
router.get('/admin', isAdmin, (req, res) => {
    res.render('admin/dashboard'); // Página de dashboard/admin
});

module.exports = router;
