const express = require('express');
const { getCompanies } = require('../controllers/company');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getCompanies);

module.exports = router;
