const router = require('express').Router();
const { getCategories, getCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id', getCategory);

module.exports = router;
