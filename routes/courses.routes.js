const express = require("express");

const coursescontroller = require("../controller/courses.controller.js")

const verifyToken = require("../middleware/verifyToken.js");

const allowedTo = require('../middleware/allowedTo.js');

const router = express.Router()


router.route("/")
            .get(coursescontroller.getAllcourses)
            .post(verifyToken, allowedTo, coursescontroller.addcourse)


router.route("/:courseId")
            .get(coursescontroller.getCourse)
            .patch(coursescontroller.updatecourse)
            .delete(verifyToken, allowedTo, coursescontroller.deletecourse)


module.exports = router;