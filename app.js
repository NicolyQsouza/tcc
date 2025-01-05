const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

// Importar rotas
const indexRoutes = require('./routes/indexRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const procedimentosRoutes = require('./routes/procedimentosRoutes');
const feedbacksRoutes = require('./routes/feedbacksRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const items_proceRoutes = require('./routes/items_proceRoutes');
const authRoutes = require('./routes/authRoutes');

// Importar middlewares
const isAuthenticated = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/isAdmin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuração de sessão
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'algum_segredo_forte',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // HTTPS em produção
            httpOnly: true, // Protege o cookie de acesso via client-side JS
            maxAge: 24 * 60 * 60 * 1000, // Expiração em 1 dia
        },
    })
);

// Configuração do flash
app.use(flash());

// Middleware para mensagens flash disponíveis nas views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Middleware para informações globais nas views
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Adiciona o usuário autenticado nas views
    next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'site')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'site', 'telainicial.html'));
});

// Roteadores
app.use('/', indexRoutes);
app.use('/clientes', clientesRoutes);

// Rotas públicas
app.use('/produtos', produtosRoutes);
app.use('/feedbacks', feedbacksRoutes);

// Rotas protegidas
app.use('/procedimentos', isAuthenticated, procedimentosRoutes);
app.use('/agenda', isAuthenticated, agendaRoutes);
app.use('/usuarios', isAuthenticated, isAdmin, usuariosRoutes);
app.use('/items_proce', isAuthenticated, items_proceRoutes);

// Rotas de autenticação
app.use('/', authRoutes);

// Tratamento de erros (404)
app.use((req, res, next) => {
    const err = new Error('Página não encontrada');
    err.status = 404;
    next(err);
});

// Tratamento de erros gerais
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
