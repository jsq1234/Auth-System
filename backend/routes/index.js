const router = require('express').Router();
const authRoutes = require('./auth');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

module.exports = router;