const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');

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

// Importar o middleware de autenticação
const isAdmin = require('./middleware/isAdmin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS (se você não usar EJS, pode remover isso)
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
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
            secure: process.env.NODE_ENV === 'production', // Enviar o cookie via HTTPS se for produção
            maxAge: 24 * 60 * 60 * 1000 // Tempo de expiração do cookie (1 dia)
        }
    })
);

// Configuração do flash
app.use(flash());

// Middleware para definir mensagens de flash para todas as páginas
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Middleware para verificar se o usuário está autenticado
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Se estiver autenticado, permite o acesso
    }
    req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
    res.redirect('/login'); // Se não estiver autenticado, redireciona para o login
}

// Middleware para definir informações globais nas views
app.use((req, res, next) => {
    res.locals.user = req.session.user; // Adiciona o usuário autenticado na view
    next();
});

// Servir arquivos estáticos
app.use(express.static(__dirname + '/site'));  // Serve arquivos de 'site' incluindo fotos, css, js

// Rota principal (mantendo como estava antes, com arquivo estático)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site/telainicial.html'); // Envia o arquivo HTML como estático
});

// Roteadores
app.use('/', indexRoutes);
app.use('/clientes', isAuthenticated, clientesRoutes);

// Remover o middleware de autenticação das rotas de produtos e feedbacks
app.use('/produtos', produtosRoutes); // Permite acesso público
app.use('/feedbacks', feedbacksRoutes); // Permite acesso público

app.use('/procedimentos', isAuthenticated, procedimentosRoutes);
app.use('/agenda', isAuthenticated, agendaRoutes);
app.use('/usuarios', isAuthenticated, isAdmin, usuariosRoutes); // Protege a rota de usuários
app.use('/items_proce', isAuthenticated, items_proceRoutes);
app.use('/', authRoutes); // Rotas de autenticação

// Tratamento de erros
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
