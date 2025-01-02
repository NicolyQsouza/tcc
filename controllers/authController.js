const db = require('../config/db'); // Importa a conexão com o banco de dados

const authController = {
    // Função para exibir o formulário de login
    renderLoginForm: (req, res) => {
        res.render('auth/login'); // Aqui renderizamos o login.ejs
    },

    // Função para processar o login
    login: (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            req.flash('error', 'Por favor, insira seu nome e senha.');
            return res.redirect('/login');
        }

        // Verificar o usuário no banco de dados
        const query = 'SELECT * FROM usuarios WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                req.flash('error', 'Erro ao consultar o banco de dados.');
                return res.redirect('/login');
            }

            if (results.length === 0) {
                req.flash('error', 'Credenciais inválidas!');
                return res.redirect('/login');
            }

            const usuario = results[0];

            // Comparar a senha diretamente com a senha armazenada no banco (sem bcrypt)
            if (senha === usuario.senha) {
                // Se a senha for correta
                req.session.user = { nome: usuario.nome, role: usuario.role }; // Armazena o nome e o role do usuário na sessão
                req.flash('success', `Bem-vindo, ${usuario.nome}!`);

                // Redireciona para a página correspondente ao tipo de usuário
                if (usuario.role === 'admin') {
                    res.redirect('/admin'); // Se for admin, vai para a página do admin
                } else {
                    res.redirect('/'); // Se for usuário normal, vai para a página inicial
                }
            } else {
                req.flash('error', 'Credenciais inválidas!');
                return res.redirect('/login');
            }
        });
    },

    // Função para processar o logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/'); // Redireciona para a página inicial após logout
        });
    },
};

module.exports = authController;
