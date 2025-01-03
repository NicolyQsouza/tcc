const express = require('express');
const router = express.Router();

// Página inicial
router.get('/', (req, res) => {
    const isAdmin = req.session.user && req.session.user.role === 'admin';
    res.render('index', { title: 'Página Inicial', isAdmin });
});

module.exports = router;
