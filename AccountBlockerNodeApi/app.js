const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();
const mongoose = require('./helpers/mongodbConnectHelper')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers 
app.use('/user',userRouter);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

module.exports=app;


