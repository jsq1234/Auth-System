const router = require('express').Router();

router.get('/pogchamp', (_, res) => {
    return res.json({ msg: "Pogchamp!" });
})

module.exports = router;