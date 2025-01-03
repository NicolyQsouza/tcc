function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Se estiver autenticado, continua a requisição
    }
    req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
    res.redirect('/login'); // Se não estiver autenticado, redireciona para o login
}

module.exports = isAuthenticated;
