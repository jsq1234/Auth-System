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
    try {
        const user = await User.findById(payload.id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        console.log(`Error : ${err.message}`);
        done(err, false);
    }
})

module.exports = jwtStrategy;