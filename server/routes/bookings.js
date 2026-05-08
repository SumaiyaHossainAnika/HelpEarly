const router = require('express').Router();
const { createBooking, getBookings, updateBooking, cancelBooking } = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);
router.put('/:id', auth, updateBooking);
router.delete('/:id', auth, cancelBooking);

module.exports = router;
