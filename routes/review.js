const router = require('express').Router();
const { isAuth } = require('../middlewares/auth');
const { validateRatings, validate } = require('../middlewares/validator');
const { addReview } = require('../controllers/review');

router.post('/add/:movieId', isAuth, validateRatings, validate, addReview);

module.exports = router;