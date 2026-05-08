const router = require('express').Router();
const { createReview, getHelperReviews } = require('../controllers/reviewController');
const { auth } = require('../middleware/auth');

router.post('/', auth, createReview);
router.get('/helper/:id', getHelperReviews);

module.exports = router;
