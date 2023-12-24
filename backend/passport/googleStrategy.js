const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth20').Strategy;


// TODO : Add it into a db, for now keeping it simple
const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
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
        
        let user = await User.findOne({ email : profile._json.email });
        if(user){
            return cb(null, user);
        }
        user = await new User({
            provider: 'google',
            googleId: profile.id,
            username: `user${profile.id}`,
            email: profile._json.email,
            name: profile.displayName,
            avatar: profile._json.picture,
        }).save();

        return cb(null, user);
    }catch(err){
        console.log(`Error : ${err.message}`);
        return cb(err.message, false);
    }
})

module.exports = googleStrategy;