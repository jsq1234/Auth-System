const User = require('../models/user');

const GitHubStrategy = require('passport-github2').Strategy;


// TODO : Add it into a db, for now keeping it simple
const githubStrategy = new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback",
    scope: ['read:user', 'user:email'],
}, async function (accessToken, refreshToken, profile, cb) {
    /*
        Check if the user exists in a database, if it does,
        find the user and call cb(null, user).
        If it does not, create a new entry for user in your database.
        Don't create/sign a JWT here. For that use /auth/google/callback
        handler.

        You can have two collections/tables/databases for the user,
        one for local sign-up/login-in and one for login through
        google/github etc. Or you can have one db for it and keep
        some values as sparse.
    */
    try {
        console.log('Authenticating using github!');
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        if (user) {
            return cb(null, user);
        }
        user = await new User({
            provider: 'github',
            githubId: profile.nodeId,
            username: `user${profile.nodeId}`,
            email: email,
            name: profile.displayName,
            avatar: profile.photos[0].value,
        }).save();

        return cb(null, user);
    } catch (err) {
        console.log(`Error : ${err.message}`);
        return cb(err.message, false);
    }
})

module.exports = githubStrategy;