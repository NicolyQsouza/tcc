function isAuthenticated(req, res, next) {
    console.log('Rota acessada:', req.originalUrl); // Depuração, mostra a rota sendo acessada
    if (req.session.user) {
        console.log('Usuário autenticado:', req.session.user); // Depuração, mostra o usuário autenticado
        return next(); // Permite o acesso se o usuário estiver autenticado
    }
    console.log('Usuário não autenticado. Redirecionando...'); // Depuração, informa que o usuário não está autenticado
    req.flash('error', 'Você precisa estar autenticado para acessar essa página.');
    res.redirect('/login'); // Se o usuário não estiver autenticado, redireciona para a página de login
}

module.exports = isAuthenticated;
