const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares/auth');
const { uploadVideo, uploadImage } = require('../middlewares/multer');
const { uploadTrailer, createMovie } = require('../controllers/movie');
const { parseData } = require('../utils/helper');
const { validateMovie, validate } = require('../middlewares/validator');

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post('/create', isAuth, isAdmin, uploadImage.single('poster'), parseData, validateMovie, validate, createMovie);

module.exports = router;