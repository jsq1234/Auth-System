const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid');
const User = require('../models/user');

const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    session: false,
}, async function (email, password, done) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return done(null, false, { message: "Email doesn't exist." });
        }
        const isSame = await User.comparePassword(password);
        if (!isSame) {
            console.log("Passwords do not match.");
            return done(null, false, { message: "Password doesn't match. " });
        }

        console.log('User found & authenticated.');

        return done(null, user);
    } catch (err) {
        done(err);
    }
});

const registerStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
}, async function (email, password, done) {
    try {
        const user = await User.findOne({ email });

        if (existingUser) {
            return done(null, false, { message: 'Email is already registered. ' });
        }

        const id = uuid.v4();

        const newUser = await new User({
            email,
            password,
            username: `user${id}`,
            provider: 'email',
        }).save();

        return done(null, newUser);
    } catch (err) {
        console.log(`Error from registerStrategy : ${err.message}`);
        return done(err, null);
    }
});


module.exports = {
    loginStrategy,
    registerStrategy,
}