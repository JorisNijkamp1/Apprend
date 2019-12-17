const user = (req, res, next) => {
    if (req.session.username === req.user._id) return next()
    return res.status(401).json({message: 'You are not allowed to do that'})
}

const deck = (req, res, next) => {
    if (req.session.username === req.user._id || req.deck.private === false) return next()
    return res.status(401).json({message: 'This deck is private'})
}

module.exports = {user, deck}