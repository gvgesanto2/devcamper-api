const express = require('express');

const {
  courseById,
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/course.controller');

const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(addCourse);

router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

router.param('id', courseById);

module.exports = router;
