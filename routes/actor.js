const express = require('express');
const router = express.Router();

const { createActor } = require('../controllers/actor');
const { uploadImage } = require('../middlewares/multer');
const { actorInfoValidator, validate } = require('../middlewares/validator');

router.post(
    '/create',
    uploadImage.single('avatar'),
    actorInfoValidator,
    validate,
    createActor,
);

module.exports = router;