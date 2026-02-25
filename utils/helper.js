const crypto = require('crypto');
const cloudinary = require('../cloud');

exports.sendError = (res, error, statusCode = 401) => {
    res.status(statusCode).json({ error });
};

exports.generateRandomByte = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) => {
            if (err) reject(err);
            const buffString = buff.toString('hex');

            console.log(buffString);
            resolve(buffString);
        });
    });
};

exports.handleNotFound = (req, res, next) => {
    this.sendError(res, 'Not Found', 404);
}

exports.uploadImageToCloud = async (file, path) => {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(file, {
        folder: path,
        gravity: 'face',
        height: 500,
        width: 500,
        crop: 'thumb'
    });

    return { url, public_id };
}

exports.formatActor = actor => {
    const { name, gender, about, _id, avatar } = actor;
    return {
        id: _id,
        name,
        about,
        gender,
        avatar: avatar?.url
    }
}

exports.parseData = (req, res, next) => {
    const { trailer, cast, genres, tags, writers } = req.body;

    if (trailer) req.body.trailer = JSON.parse(trailer);
    if (cast) req.body.cast = JSON.parse(cast);
    if (genres) req.body.genres = JSON.parse(genres);
    if (tags) req.body.tags = JSON.parse(tags);
    if (writers) req.body.writers = JSON.parse(writers);

    next();
};

exports.averageRatingPipeline = (movieId) => {
    return [
        {
            $lookup: {
                from: "Review",
                localField: "rating",
                foreignField: '_id',
                as: "avgRat",
            },
        },
        {
            $match: { parentMovie: movieId },
        },
        {
            $group: {
                _id: null,
                ratingAvg: {
                    $avg: '$rating',
                },
                reviewCount: {
                    $sum: 1
                }
            },
        },
    ];
};