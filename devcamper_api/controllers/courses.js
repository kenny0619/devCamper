// import error response from utils
const ErrorResponse = require("../utils/errorResponse");

// import asyncHandler middleware
const asyncHandler = require("../middleware/async");

// import model from mongoose
const { model } = require("mongoose");

// import Course model from CourseSchema
const Course = model("Course");

// import Bootcamp model from BootcampSchema
const Bootcamp = model("Bootcamp");

// @desc Get All Courses
// @routes GET /api/v1.0.0/courses
// @routes GET /api/v1.0.0/bootcamps/:bootcampId/courses
// @access PUBLIC
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    console.log(req.params);
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

/**
 * @desc    Get single Course
 * @route   GET /api/v1.0.0/courses/:id
 * @access  Public
 */
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

/**
 * @desc    Add a Course
 * @route   POST /api/v1.0.0/bootcamps/:bootcampId/courses/
 * @access  Private
 */
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.course.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const course = await Course.create(req.body.course);

  res.status(200).json({
    success: true,
    data: course,
  });
});

/**
 * @desc    Update a Course
 * @route   PUT /api/v1.0.0/courses/:id
 * @access  Private
 */
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body.course, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

/**
 * @desc    Delete a Course
 * @route   DELETE /api/v1.0.0/courses/:id
 * @access  Private
 */
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
