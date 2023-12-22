const router = require('express').Router();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_JWT_KEY;

// auth login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the DB and the hashed password matches.

    const token = jwt.sign({ sub: 1, username}, secretKey, { expiresIn: '7d'});

    res.cookie('jwt', token, { httpOnly: true, maxAge: 7*24*60*60*1000 });

    res.json({ message: "Login successful!"});
})


module.exports = router;    

