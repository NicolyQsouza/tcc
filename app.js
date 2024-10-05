const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // Renomeado para Cliente
const produtoRoutes = require('./routes/produtoRoutes');
const procedimentoRoutes = require('./routes/procedimentoRoutes'); // Rota para Procedimento
const feedbackRoutes = require('./routes/feedbacksRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const usuarioRoutes = require('./routes/usuariosRoutes'); // Corrigido o nome da rota

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', indexRoutes);
app.use('/clientes', clienteRoutes); // Alterado para Clientes
app.use('/produtos', produtoRoutes);
app.use('/procedimentos', procedimentoRoutes); // Rota para Procedimento
app.use('/feedbacks', feedbackRoutes); // Corrigido o nome da variável
app.use('/agenda', agendaRoutes);
app.use('/usuarios', usuarioRoutes); // Corrigido o nome da rota

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
