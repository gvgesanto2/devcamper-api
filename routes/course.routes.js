const express = require('express');

const {
  courseById,
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/course.controller');

const { protect, authorize, requireOwnership } = require('../middleware/auth');

const Course = require('../models/course.model');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(protect, authorize('publisher', 'admin'), requireOwnership, addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), requireOwnership, updateCourse)
  .delete(
    protect,
    authorize('publisher', 'admin'),
    requireOwnership,
    deleteCourse
  );

router.param('id', courseById);

module.exports = router;
