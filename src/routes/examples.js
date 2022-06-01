const express = require('express');
const {getExample, getExamples} = require("../controllers/examples");

// const router = express.Router();
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getExamples)

router.route('/:id')
    .get(getExample)

// router.route('/').get().post().delete();

module.exports = router;