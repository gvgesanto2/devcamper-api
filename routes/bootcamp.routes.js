const express = require('express');

const {
  findBootcampById,
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto
} = require('../controllers/bootcamp.controller');

const Bootcamp = require('../models/bootcamp.model');

const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./course.routes');
const reviewRouter = require('./review.routes');

const router = express.Router();

const { protect, authorize, requireOwnership } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/:id/photo')
  .put(
    protect,
    authorize('publisher', 'admin'),
    requireOwnership,
    uploadBootcampPhoto
  );

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(
    protect,
    authorize('publisher', 'admin'),
    requireOwnership,
    updateBootcamp
  )
  .delete(
    protect,
    authorize('publisher', 'admin'),
    requireOwnership,
    deleteBootcamp
  );

router.param('bootcampId', findBootcampById);
router.param('id', findBootcampById);

module.exports = router;
