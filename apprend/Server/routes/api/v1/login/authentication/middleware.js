function authenticationMiddleware() {
    return function (req, res, next) {
        const username = req.session.username ? req.session.username : req.cookies.username;
        if (req.isAuthenticated() || username) {
            return next()
        }
        res.redirect('/api/v1/login/error')
    }
}

module.exports = authenticationMiddleware;
