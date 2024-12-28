const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');

dotenv.config();

// Importar rotas de outras partes do sistema
const indexRoutes = require('./routes/indexRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const procedimentosRoutes = require('./routes/procedimentosRoutes');
const feedbacksRoutes = require('./routes/feedbacksRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const items_proceRoutes = require('./routes/items_proceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Definir a engine de visualização para ejs (caso queira usar ejs)
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Servir arquivos estáticos
app.use(express.static('site'));  // Arquivos da pasta "site" (CSS, JS, etc.)
app.use(express.static('fotos')); // Arquivos da pasta "fotos" (Imagens)

// Rota principal - Página inicial
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site/telainicial.html'); // Serve o arquivo HTML da pasta "site"
});

// Roteadores para outras partes da aplicação
app.use('/clientes', clientesRoutes);
app.use('/produtos', produtosRoutes);
app.use('/procedimentos', procedimentosRoutes);
app.use('/feedbacks', feedbacksRoutes);
app.use('/agenda', agendaRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/items_proce', items_proceRoutes);

// Roteamento de erro (Página não encontrada)
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Roteamento de erro interno
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
