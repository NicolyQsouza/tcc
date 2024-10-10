const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const procedimentosRoutes = require('./routes/procedimentosRoutes');
const feedbacksRoutes = require('./routes/feedbacksRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do EJS
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Rotas
app.use('/', indexRoutes);
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/procedimentos', procedimentosRoutes);
app.use('/feedbacks', feedbacksRoutes);
app.use('/agenda', agendaRoutes);
app.use('/usuario', usuarioRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
