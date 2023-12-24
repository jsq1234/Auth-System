const router = require('express').Router();
const passport = require('../../passport/config');
const clientRedirectUrl = process.env.CLIENT_REDIRECT_URL;

router.post('/login', (req, res, next) => {
    passport.authenticate('login', {
        session: false,
    }, function (err, user, info) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                Error: "server error",
            });
        }

        if (!user) {
            console.log(info.message);
            return res.status(409).json({
                Error: info.message,
            })
        }

        console.log("New login!");

        const jwtToken = user.generateJWT();

        res.cookie('jwt', jwtToken);

        return res.status(200).json({
            registered: true,
            email: user.email,
            username: user.username
        });
    })
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('register', {
        session: false,
    }, function (err, user, info) {
        if (err) {
            console.log(err);
            return res.status(500).send({
                Error: "server error",
            });
        }

        if (!user) {
            console.log(info.message);
            return res.status(409).json({
                Error: info.message,
            });
        }

        console.log("New user registered!");

        const jwtToken = user.generateJWT();

        res.cookie('jwt', jwtToken);

        return res.status(200).json({
            registered: true,
            email: user.email,
            username: user.username
        });
    })(req, res, next);
});

module.exports = router;