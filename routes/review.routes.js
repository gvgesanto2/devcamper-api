const express = require('express');
const {
  findReviewById,
  findBootcampById,
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

const Review = require('../models/review.model');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize, requireOwnership } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), requireOwnership, updateReview)
  .delete(protect, authorize('user', 'admin'), requireOwnership, deleteReview);

router.param('bootcampId', findBootcampById);
router.param('id', findReviewById);

module.exports = router;
