const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('../passport/config');

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        console.log(req.user._json);
        res.redirect("http://localhost:5174/")
    });

module.exports = router;

