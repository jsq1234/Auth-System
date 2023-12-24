const router = require('express').Router();
const passport = require('../../passport/config');

const clientRedirectUrl = process.env.CLIENT_REDIRECT_URL;

router.get('/github',
    passport.authenticate('github', { scope: ['read:user', 'user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    function (req, res) {
        /*
            Create a jwt using jsonwebtokens package. Send both the id and
            email. Id here is the google/github/etc. ID, but you can also
            send mongoDB _id.
            Send the token as a cookie. Then, from the frontend call
            /api/user/profile to get your profile info. Save that to
            localStorage so that you don't have to make a request after
            every refresh.
        */
        const token = req.user.generateJWT();
        res.cookie('jwt', token);
        res.redirect(clientRedirectUrl);
    });

module.exports = router;
