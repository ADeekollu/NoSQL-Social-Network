const router = require('express').Router();
const friendRoutes = require('./friendRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/friend', friendRoutes);
router.use('/user', userRoutes);
router.use('/reaction', reactionRoutes);
router.use('/thought', thoughtRoutes);



module.exports = router;
