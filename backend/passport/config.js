const passport = require('passport');
const jwtStrategy = require('./jwtStrategy');
const googleStrategy = require('./googleStrategy');
const githubStrategy = require('./githubStrategy');
const {
    loginStrategy,
    registerStrategy
} = require('./localStrategy');

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(githubStrategy);
passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

module.exports = passport;