const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
}, function(accessToken, refreshToken, profile, cb){
    console.log("calling the callback now!");
    return cb(null, profile);
})

module.exports = googleStrategy;