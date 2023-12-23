const router = require('express').Router();
const requireJwt = require('../../middleware/requireJwtAuth');
const { userInfo } = require('../../controllers/userController');

router.get('/info', requireJwt, userInfo); 

module.exports = router;