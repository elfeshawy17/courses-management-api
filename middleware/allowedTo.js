const userRoles = require('../utils/userRoles.js');
const AppError = require('../utils/appError.js');
const httpStatusText = require('../utils/HttpStatusText.js');

const allowedTo = (req, res, next) => {

    const roles = [userRoles.ADMIN, userRoles.MANAGER];

    if (!roles.includes(req.currentUser.role)) {
        const error = AppError.create('Not Allowed For This Role', 401, httpStatusText.FAIL);
        return next(error);
    }
    next();

};

module.exports = allowedTo;