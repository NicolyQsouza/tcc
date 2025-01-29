const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const usuariosController = require('./controllers/usuariosController');

// Configurações de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

// Middlewares básicos
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
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

// Configuração do flash
app.use(flash());

// Middleware para passar mensagens flash para as views
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.user = req.session.user || null;
    next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'site')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'site', 'telainicial.html'));
});

// Importação e verificação das rotas
const loadRoute = (routePath) => {
    try {
        const route = require(routePath);
        if (route && typeof route === 'function') {
            return route;
        } else {
            console.error(`Erro: ${routePath} não exporta um Router válido.`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao carregar ${routePath}:`, error);
        return null;
    }
};

// Carregar rotas
const indexRoutes = loadRoute('./routes/indexRoutes');
const clientesRoutes = loadRoute('./routes/clientesRoutes');
const produtosRoutes = loadRoute('./routes/produtosRoutes');
const procedimentosRoutes = loadRoute('./routes/procedimentosRoutes');
const feedbacksRoutes = loadRoute('./routes/feedbacksRoutes');
const agendaRoutes = loadRoute('./routes/agendaRoutes');
const usuariosRoutes = loadRoute('./routes/usuariosRoutes');
const items_proceRoutes = loadRoute('./routes/items_proceRoutes');
const authRoutes = loadRoute('./routes/authRoutes');

// Importação de middlewares
const isAuthenticated = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/isAdmin');

// Aplicar rotas se forem válidas
if (indexRoutes) app.use('/', indexRoutes);
if (clientesRoutes) app.use('/clientes', clientesRoutes);
if (produtosRoutes) app.use('/produtos', produtosRoutes);
if (feedbacksRoutes) app.use('/feedbacks', feedbacksRoutes);
if (procedimentosRoutes) app.use('/procedimentos', isAuthenticated, procedimentosRoutes);
if (agendaRoutes) app.use('/agenda', isAuthenticated, agendaRoutes);
if (usuariosRoutes) app.use('/usuarios', isAuthenticated, isAdmin, usuariosRoutes);
if (items_proceRoutes) app.use('/items_proce', isAuthenticated, items_proceRoutes);
if (authRoutes) app.use('/', authRoutes);

// Rotas de Login e Logout
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', usuariosController.login);

app.get('/logout', usuariosController.logout);

// Rota de Usuários (somente admin)
app.get('/usuarios', usuariosController.getAll);

// Rotas de criação, edição e deleção de usuários
app.get('/usuarios/create', usuariosController.renderCreateForm);
app.post('/usuarios/create', usuariosController.create);
app.get('/usuarios/:cod/edit', usuariosController.renderEditForm);
app.post('/usuarios/:cod/edit', usuariosController.update);
app.get('/usuarios/:cod/delete', usuariosController.delete);

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
