const router = require('express').Router();
const googleRoutes = require('./googleAuth');
const githubRoutes = require('./githubAuth');

router.use(googleRoutes);
router.use(githubRoutes);

module.exports = router;