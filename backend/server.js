    const express = require('express');
    const app = express();

    require('dotenv').config();

    const port = process.env.PORT || 3000;

    const auth = require('./routes/auth_routes');
    const passport = require('./passport/config');
    const cookieParser = require('cookie-parser');

    app.use(express.json());
    app.use(passport.initialize());
    app.use(cookieParser());
    app.use('/auth/', auth);


    // protected route
    app.get('/protected', passport.authenticate('jwt', { session: false}), (req, res) => {
        return res.status(200).json({ msg: "You have accessed protected route!", user: req.user });
    })

    app.listen(port, () => {
        console.log(`Server running on port ${port}.`);
    })