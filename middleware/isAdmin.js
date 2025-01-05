function isAdmin(req, res, next) {
    // Verifica se o usuário está autenticado e tem o papel de 'admin'
    if (req.session.user && req.session.role === 'admin') {
        return next(); // Permite o acesso se o usuário for admin e autenticado
    }
    req.flash('error', 'Acesso restrito! Somente administradores podem acessar.');
    res.redirect('/login'); // Se não for admin ou não estiver autenticado, redireciona para o login
}

module.exports = isAdmin;