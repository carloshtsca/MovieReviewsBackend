const express = require('express');
const router = express.Router();

const { isAuth, isAdmin } = require('../middlewares/auth');
const { uploadVideo, uploadImage } = require('../middlewares/multer');
const { uploadTrailer, createMovie, removeMovie, getMovies, getMovieForUpdate, updateMovie, searchMovies } = require('../controllers/movie');
const { parseData } = require('../utils/helper');
const { validateMovie, validate, validateTrailer } = require('../middlewares/validator');

router.post('/upload-trailer', isAuth, isAdmin, uploadVideo.single('video'), uploadTrailer);
router.post('/create', isAuth, isAdmin, uploadImage.single('poster'), parseData, validateMovie, validateTrailer, validate, createMovie);
// router.patch(
//     '/update-movie-without-poster/:movieId',
//     isAuth,
//     isAdmin,
//     // parseData, 
//     validateMovie,
//     validate,
//     updateMovieWithoutPoster
// );
router.patch(
    '/update/:movieId',
    isAuth,
    isAdmin,
    uploadImage.single('poster'),
    parseData,
    validateMovie,
    // validateTrailer,
    validate,
    updateMovie
);
router.delete('/:movieId', isAuth, isAdmin, removeMovie);
router.get('/movies', isAuth, isAdmin, getMovies);
router.get('/for-update/:movieId', isAuth, isAdmin, getMovieForUpdate);
router.get('/search', isAuth, isAdmin, searchMovies);

module.exports = router;