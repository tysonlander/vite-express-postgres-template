const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all companies
// @route     GET /api/v1/company
// @access    Public
exports.getCompanies = asyncHandler(async (req, res, next) => {
  console.log('hello you route');
  const companies = [
    { name: 'company name one' },
    { name: 'company name two' },
  ];
  res.status(200).json(companies);
});
