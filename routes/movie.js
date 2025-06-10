const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares/auth');
const { uploadVideo } = require('../middlewares/multer');
const { uploadTrailer } = require('../controllers/movie');

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);

module.exports = router;