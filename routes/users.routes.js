const express = require("express");

const usersController = require("../controller/users.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

const httpStatusText = require('../utils/HttpStatusText.js');

const AppError = require('../utils/appError.js');


const multer = require('multer');

const diskStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },

    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user_${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {

    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true)
    }
    else{
        const error = AppError.create("File Must Be An Image", 400, httpStatusText.ERROR);
        cb(error, false)
    }

};

const upload = multer({ storage: diskStorage, fileFilter });



const userRouter = express.Router()

userRouter.get('/', verifyToken, usersController.getAllUsers);

userRouter.post('/register', upload.single('avatar'), usersController.register);

userRouter.post('/login', usersController.login);


module.exports = userRouter;