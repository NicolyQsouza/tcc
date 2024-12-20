const express = require('express');
const router = express.Router();

/* Rota para a página inicial */
router.get('/', (req, res) => {
  // Renderiza a view 'index' com o título 'Express'
  res.render('index', { title: 'Página Inicial' });
});

module.exports = router;
