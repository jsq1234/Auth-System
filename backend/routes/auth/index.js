const router = require('express').Router();
const googleRoutes = require('./google');
const githubRoutes = require('./github');

router.use(googleRoutes);
router.use(githubRoutes);

module.exports = router;