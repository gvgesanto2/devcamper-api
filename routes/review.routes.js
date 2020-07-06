const express = require('express');
const {
  findReviewById,
  getReviews,
  getReview
} = require('../controllers/review.controller');

const Review = require('../models/review.model');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description'
  }),
  getReviews
);

router.route('/:id').get(getReview);

router.param('id', findReviewById);

module.exports = router;
