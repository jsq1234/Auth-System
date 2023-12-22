const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const auth = require('./routes/auth_routes');
const passport = require('./passport/config');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(passport.initialize());
app.use('/auth/', auth);

app.get('/', (req, res) => {
    res.send('Get route!');
})
// protected route

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})