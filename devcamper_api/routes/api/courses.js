const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../../controllers/courses");

const advancedResults = require("../../middleware/advancedResults");

// import model from mongoose
const { model } = require("mongoose");

// import Course model from CourseSchema
const Course = model("Course");

const router = require("express").Router({
  mergeParams: true,
});

router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
