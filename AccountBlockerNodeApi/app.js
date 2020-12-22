const express = require('express');
const app = express();
const port = 3000;

const userRouter = require('./routes/user');

app.use('/user',userRouter);

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

module.exports=app;


