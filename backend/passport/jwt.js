const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const secretKey = process.env.SECRET_JWT_KEY

const cookieExtracter = (req) => {
    console.log("Extracting from cookie!");
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
        console.log(token);
    }
    return token
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: secretKey,
}

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
    const user = { id: payload.sub, username: payload.username };
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
})

module.exports = jwtStrategy;