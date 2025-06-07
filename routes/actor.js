const express = require('express');
const router = express.Router();

const { createActor, updateActor, removeActor, searchActor, getLatestActors, getSingleActor } = require('../controllers/actor');
const { uploadImage } = require('../middlewares/multer');
const { actorInfoValidator, validate } = require('../middlewares/validator');
const { isAuth, isAdmin } = require('../middlewares/auth');

router.post(
    '/create',
    isAuth,
    isAdmin,
    uploadImage.single('avatar'),
    actorInfoValidator,
    validate,
    createActor,
);

router.post(
    '/update/:actorId',
    isAuth,
    isAdmin,
    uploadImage.single('avatar'),
    actorInfoValidator,
    validate,
    updateActor,
);

router.delete('/:actorId', isAuth, isAdmin, removeActor);
router.get('/search', isAuth, isAdmin, searchActor);
router.get('/latest-uploads', isAuth, isAdmin, getLatestActors);
router.get('/single/:id', getSingleActor);

module.exports = router;