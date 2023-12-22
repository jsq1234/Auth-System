const passport = require('passport');
const jwtStrategy = require('./jwt');
const googleStrategy = require('./google');

passport.use(jwtStrategy);
passport.use(googleStrategy);

module.exports = passport;