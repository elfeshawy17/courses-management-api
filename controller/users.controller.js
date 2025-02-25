const User = require('../models/users.models.js');
const asyncWrqpper = require('../middleware/asyncWrapper.js');
const httpStatusText = require('../utils/HttpStatusText.js');
const AppError = require('../utils/appError.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT.js');

const getAllUsers = asyncWrqpper(

    async (req, res) =>{

        const query = req.query;
    
        const limit = query.limit || 5;
        const page = query.page || 1;
        const skip = (page - 1)*limit;
    
        const users = await User.find({}, {__v: 0, password: 0}).limit(limit).skip(skip);
    
        res.status(200).json({status: httpStatusText.SUCCESS, data: {users}});
    
    }

);

const register = asyncWrqpper(

    async (req, res, next) => {

        const {firstName, lastName, email, password, role} = req.body;

        const oldUser = await User.findOne({email})

        if (oldUser) {
            const error = AppError.create("User Is Already Exists", 400, httpStatusText.FAIL);
                return next(error);
        }

        const hashedPassword = bcrypt.hashSync(password, 8);

        const newUser = new User({firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar: req.file.filename
        });

        const token = await generateJWT({email: newUser.email, id: newUser._id, role: newUser.role});

        newUser.token = token;

        await newUser.save();

        res.status(201).json({status: httpStatusText.SUCCESS, data: newUser});

    }

);

const login = asyncWrqpper(

    async (req, res, next) => {

        const {email, password} = req.body;

        if (!email || !password) {
            const error = AppError.create("Email And Password Are Required", 400, httpStatusText.FAIL);
                return next(error);
        }

        const user = await User.findOne({email});

        if (!user) {
            const error = AppError.create("User Is Not Found", 400, httpStatusText.FAIL);
                return next(error);
        }

        const matchedPassword = bcrypt.compareSync(password, user.password);

        if (matchedPassword) {

            const token = await generateJWT({email: user.email, id: user._id, role: user.role});

            return res.status(200).json({status: httpStatusText.SUCCESS, data: {token}});

        }
        else {
            const error = AppError.create("Incorrect Password", 400, httpStatusText.FAIL);
                return next(error);
        }

    }

);

module.exports = {

    getAllUsers,
    register,
    login

};