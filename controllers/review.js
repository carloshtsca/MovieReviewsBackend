const { isValidObjectId } = require("mongoose");
const Movie = require('../models/movie');
const Review = require('../models/review');
const { sendError } = require("../utils/helper");

exports.addReview = async (req, res) => {
    const { movieId } = req.params;
    const { content, rating } = req.body;
    const userId = req.user._id;

    if (!isValidObjectId(movieId)) return sendError(res, 'Invalid Movie!');

    const movie = await Movie.findOne({ _id: movieId, status: 'public' });
    if (!movie) return sendError(res, 'Movie not found!', 404);

    const isAlreadyReviewed = await Review.findOne({ 
        owner: userId, 
        parentMovie: movie._id 
    });
    if (isAlreadyReviewed) return sendError(res, 'Invalid request review is already their!');

    // create and update review
};