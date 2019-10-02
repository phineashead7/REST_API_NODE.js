const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');
const personRoutes = require('./api/routes/person');

mongoose.connect(
    "mongodb://127.0.0.1:27017/rest",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(err => {
    console.log(err);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/person', personRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
