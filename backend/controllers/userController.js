const User = require('../models/user');

const userInfo = async (req, res) => {
    console.log(req.user);
    return res.send({ message: "You accessed a protected route!", user: req.user });
}

module.exports = {
    userInfo,
}