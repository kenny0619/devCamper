// @desc Get All Bootcamps
// @routes GET /api/v1.0.0/bootcamps
// @access PUBLIC
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" });
};

// @desc Get A Single Bootcamps
// @routes GET /api/v1.0.0/bootcamps/:id
// @access PUBLIC
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `show bootcamp ${req.params.id}` });
};

// @desc Create Bootcamp
// @routes POST /api/v1.0.0/bootcamps/
// @access PRIVATE
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: "created new bootcamp" });
};

// @desc Update A Bootcamp
// @routes PUT /api/v1.0.0/bootcamps/:id
// @access PRIVATE
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `update bootcamp ${req.params.id}` });
};

// @desc Delete A Bootcamps
// @routes DELETE /api/v1.0.0/bootcamps/:id
// @access PRIVATE
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Deleted bootcamp ${req.params.id}` });
};
