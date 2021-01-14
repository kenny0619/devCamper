// import express router as router
const router = require("express").Router();

// route endpoints
router.use("/bootcamps", require("./bootcamps"));
router.use("/courses", require("./courses"));

module.exports = router;
