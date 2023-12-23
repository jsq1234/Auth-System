const passport = require('../passport/config');

const requireJwtAuth = passport.authenticate('jwt', { session : false });

module.exports = requireJwtAuth;