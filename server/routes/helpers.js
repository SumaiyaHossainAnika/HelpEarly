const router = require('express').Router();
const { getHelpers, getHelper, updateHelper, addService, deleteService, getMyHelperProfile } = require('../controllers/helperController');
const { auth, requireRole } = require('../middleware/auth');

router.get('/', getHelpers);
router.get('/me', auth, requireRole('helper'), getMyHelperProfile);
router.get('/:id', getHelper);
router.put('/me', auth, requireRole('helper'), updateHelper);
router.post('/services', auth, requireRole('helper'), addService);
router.delete('/services/:serviceId', auth, requireRole('helper'), deleteService);

module.exports = router;
