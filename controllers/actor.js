const actor = require('../models/actor');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

exports.createActor = async (req, res) => {
    const { name, about, gender } = req.body;
    const { file } = req;

    const newActor = new actor({ name, about, gender });
    const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: 'movie_reviews_app/actors' });
    
    newActor.avatar = { url: secure_url, public_id };
    await newActor.save();
    res.status(201).json(newActor);
}