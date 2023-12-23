const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const User = require('../models/user');

const secretKey = process.env.SECRET_JWT_KEY

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    /*
        Here, the JWT is decoded for you and then you find the user
        from your database from the ID that you put in payload of JWT
        when you first created it. After that, you can access it using
        req.user in your next handler.
    */
    console.log("payload : ");
    console.log(payload);
    return done(null, { id: payload.id, email: payload.email });
})

module.exports = jwtStrategy;