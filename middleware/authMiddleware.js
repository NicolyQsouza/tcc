function isAuthenticated(req, res, next) {
    console.log('Rota acessada:', req.originalUrl);
    if (req.session.user) {
        console.log('Usuário autenticado:', req.session.user);
        return next();
    }
    console.log('Usuário não autenticado. Redirecionando...');
    req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
    res.redirect('/login');
}


module.exports = isAuthenticated;
