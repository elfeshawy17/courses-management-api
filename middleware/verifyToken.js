const jwt = require('jsonwebtoken');

const httpStatusText = require('../utils/HttpStatusText.js');

const AppError = require('../utils/appError.js');

const verifyToken = (req, res, next) => {

    const token = req.headers['Authorization'] || req.headers['authorization']

    if (!token) {
        const error = AppError.create("Token Is Required", 401, httpStatusText.ERROR);
        return next(error);
    }

    try{

        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();

    } catch(err) {
        const error = AppError.create("Invalid Token", 401, httpStatusText.ERROR);
        return next(error);
    }

};

module.exports = verifyToken;