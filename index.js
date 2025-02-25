require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path');

const coursesrouter = require("./routes/courses.routes.js");
const userRouter = require('./routes/users.routes.js');
const HttpStatusText = require('./utils/HttpStatusText.js');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => console.log("connected succssefully"));

const app = express();

const port = process.env.PORT;

app.use( cors() );

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/courses", coursesrouter);

app.use('/api/users', userRouter);


// Global MiddleWare For Not Found Router
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: HttpStatusText.ERROR,
        Message: "This Resource Is Not Available"
    })
});

// Global Error Handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || HttpStatusText.ERROR,
        Message: error.message,
        code: error.statusCode || 500,
        data: null
    })
});


app.listen(port, () => console.log(`App run on ${port}`));