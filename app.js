const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const indexRoutes = require('./routes/indexRoutes');
const clientesRoutes = require('./routes/clientesRoutes'); // Renomeado para clientes
const produtosRoutes = require('./routes/produtosRoutes');
const procedimentosRoutes = require('./routes/procedimentosRoutes'); // Rota para Procedimentos
const feedbacksRoutes = require('./routes/feedbacksRoutes');
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
app.use('/clientes', clientesRoutes); // Alterado para Clientes
app.use('/produtos', produtosRoutes);
app.use('/procedimentos', procedimentosRoutes); // Rota para Procedimentos
app.use('/feedbacks', feedbacksRoutes); // Corrigido o nome da variável
app.use('/agenda', agendaRoutes);
app.use('/usuarios', usuarioRoutes); // Corrigido o nome da rota

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
