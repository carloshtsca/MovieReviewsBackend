const cloudinary = require('../cloud');
const storage_path = require('../cloud/path');
const { sendError } = require('../utils/helper');


exports.uploadTrailer = async (req, res) => {
    const { file } = req;

    if (!file) return sendError(res, 'Video file is missing!');

    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        {
            folder: storage_path('trailers'),
            resource_type: 'video',
        },
    );

    res.status(201).json({ url, public_id});
}