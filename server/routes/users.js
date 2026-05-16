const router = require('express').Router();
const { getPublicUser } = require('../controllers/userController');

router.get('/:id', getPublicUser);

module.exports = router;
