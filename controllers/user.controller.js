const User = require('../models/user.model');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const findResourceById = require('../middleware/findResourceById');

// Load bootcamp by the ID and append to req
exports.findUserById = findResourceById(User);

// @desc Get all users
// @route GET /api/v1/auth/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc Get single user
// @route GET /api/v1/auth/users/:id
// @access Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = req.resource;

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Create user
// @route POST /api/v1/auth/users
// @access Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc Update user
// @route PUT /api/v1/auth/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc Delete user
// @route DELETE /api/v1/auth/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = req.resource;

  await user.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
