function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'Acesso restrito! Somente administradores podem acessar.');
    res.redirect('/'); // Redireciona para a página inicial se não for admin
}

module.exports = isAdmin;
