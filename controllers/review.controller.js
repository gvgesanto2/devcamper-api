const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/review.model');
const Bootcamp = require('../models/bootcamp.model');
const findResourceById = require('../middleware/findResourceById');

// Load bootcamp by the ID and append to req
exports.findReviewById = findResourceById(Review, {
  path: 'bootcamp',
  select: 'name description'
});

// @desc Get reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/bootcamps/:bootcampId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = req.resource;

  res.status(200).json({
    success: true,
    data: review
  });
});
