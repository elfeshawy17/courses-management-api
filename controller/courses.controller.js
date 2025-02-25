const joi = require("joi");

const Course = require("../models/courses.model.js");

const httpStatusText = require('../utils/HttpStatusText.js');

const asyncWrapper = require('../middleware/asyncWrapper.js');

const AppError = require('../utils/appError.js');

// schema for joi middlewar
const schema = joi.object({
  title: joi.string().min(3).required(),
  price: joi.number().integer().min(1000).required(),
});


const getAllcourses = asyncWrapper( 

  async (req, res) => {

    const query = req.query;
    const limit = query.limit || 4;
    const page = query.page ||1;
    const skip = (page -1)*limit;

    const courses = await Course.find({}, {"__v": 0}).limit(limit).skip(skip);
    res.json({
      status: httpStatusText.SUCCESS,
      data: {courses}
    });

});


const getCourse = asyncWrapper(

  async (req, res, next) => {

    const course = await Course.findById(req.params.courseId);

      if (!course) {
        const error = AppError.create("Course Is Not Found", 404, httpStatusText.FAIL);
        return next(error);
      }

      return res.status(200).json({
          status: httpStatusText.SUCCESS,
          data: {course}
        })
      }

);


const addcourse = asyncWrapper( 

  async (req, res) => {

    const { error, value } = schema.validate(req.body);

    if (error) {
      const error = AppError.create(error.details[0].message, 400, httpStatusText.FAIL);
      return next(error);
    }

    const newcourse = new Course(req.body);
    await newcourse.save();

    res.json({
      status: httpStatusText.SUCCESS,
      data: {newcourse}
    });

});


const updatecourse =  asyncWrapper( 
  
  async (req, res) => {
  
    let courseId = req.params.courseId;
    const updatedcourse = await Course.findByIdAndUpdate(courseId, {
      $set: { ...req.body },
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      const error = AppError.create(error.details[0].message, 400, httpStatusText.ERROR);
      return next(error);
    }

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {course: updatedcourse}
    });

});


const deletecourse = asyncWrapper( 
  
  async (req, res) => {

    await Course.deleteOne({ _id: req.params.courseId });

    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: null
    });

});


module.exports = {

  getAllcourses,
  getCourse,
  addcourse,
  updatecourse,
  deletecourse

};
