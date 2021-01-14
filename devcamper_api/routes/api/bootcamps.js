const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../../controllers/bootcamps");

const advancedResults = require("../../middleware/advancedResults");

// import model from mongoose
const { model } = require("mongoose");

// import Bootcamp model from BootcampSchema
const Bootcamp = model("Bootcamp");

const router = require("express").Router();

// route into other resource routers
router.use("/:bootcampId/courses", require("./courses"));

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router.route("/:id/photo").put(bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
