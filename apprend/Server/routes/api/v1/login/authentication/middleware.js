function authenticationMiddleware() {
    return function (req, res, next) {
        if (req.isAuthenticated() || req.session.username) {
            return next()
        }
        res.redirect('/api/v1/login/error')
    }
}

module.exports = authenticationMiddleware;
