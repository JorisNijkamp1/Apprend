const express = require('express');
const login = express.Router();
require('../../../../database/models/deck');
const Users = require('../../../../database/models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

// Body parser
var bodyParser = require('body-parser');

login.use(bodyParser.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
login.use(bodyParser.json()) // parse application/json

login.use(passport.initialize());
login.use(passport.session());
login.use(flash());

//Passport middleware for Authentication
passport.use(new LocalStrategy(
    function (username, password, done) {
        Users.findOne({_id: username}, function (err, user) {

            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'username-incorrect'});
            }
            if (password !== user.password) {
                return done(null, false, {message: 'password-incorrect'});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// REQUESTS

login.post('/',
    passport.authenticate('local', {
        successRedirect: '/api/v1/login/success',
        failureRedirect: '/api/v1/login/error',
    })
);

login.get('/success', (req, res) => {
    res.json({
        success: true,
        username: req.user._id
    });
});

login.get('/error', (req, res) => {
    res.json({
        success: false,
        username: ''
    });
});

module.exports = login;
