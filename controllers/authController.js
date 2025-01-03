const Usuarios = require('../models/usuariosModel');

module.exports = {
    renderLoginForm: (req, res) => {
        res.render('auth/login', { success: req.flash('success'), error: req.flash('error') });
    },

    login: (req, res) => {
        const { nome, senha } = req.body;

        // Verificar o usuário no banco de dados
        Usuarios.getByUsername(nome, (err, usuario) => {
            if (err) {
                req.flash('error', 'Erro ao verificar usuário.');
                return res.redirect('/login');
            }

            if (!usuario) {
                req.flash('error', 'Nome de usuário não encontrado.');
                return res.redirect('/login');
            }

            // Comparar a senha (sem bcrypt, apenas comparação direta)
            if (usuario.senha === senha) {
                // Armazenar os dados do usuário na sessão
                req.session.user = usuario.nome;
                req.session.role = usuario.role; // Armazenar o papel (admin ou outro)
                req.flash('success', 'Login realizado com sucesso!');
                return res.redirect('/dashboard'); // Redireciona para o dashboard
            } else {
                req.flash('error', 'Nome ou senha inválidos.');
                return res.redirect('/login');
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/dashboard');
            }
            res.clearCookie('connect.sid'); // Limpa o cookie de sessão
            res.redirect('/login'); // Redireciona para a página de login após o logout
        });
    }
};
