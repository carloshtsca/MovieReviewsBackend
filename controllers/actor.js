const actor = require('../models/actor');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

exports.createActor = (req, res) => {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new actor({ name, about, gender });
}