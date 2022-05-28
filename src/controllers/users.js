const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const userEntity = require('../entities/User');

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get users
// @route     GET /api/v1/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  // const user = await User.findById(req.params.id);
  const users = [
    {
      first_name: 'John',
      last_name: 'Doe',
    },
  ];

  res.status(200).json({
    success: true,
    data: users,
  });
});

// @desc      Create single user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log('... about to create something', req.body);

  const user = userEntity.User.create(req.body);
  console.log(user);
  await user.save();

  res.status(200).json({
    success: true,
    data: user,
  });
});
