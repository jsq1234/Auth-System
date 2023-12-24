const router = require('express').Router();
const googleRoutes = require('./googleAuth');
const githubRoutes = require('./githubAuth');
const localRoutes = require('./localAuth');

router.use(googleRoutes);
router.use(githubRoutes);
router.use(localRoutes);

module.exports = router;