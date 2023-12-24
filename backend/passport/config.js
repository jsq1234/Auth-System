const passport = require('passport');
const jwtStrategy = require('./jwtStrategy');
const googleStrategy = require('./googleStrategy');
const githubStrategy = require('./githubStrategy');

passport.use(jwtStrategy);
passport.use(googleStrategy);
passport.use(githubStrategy);

module.exports = passport;