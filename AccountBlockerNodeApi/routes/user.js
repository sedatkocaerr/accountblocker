const express = require('express');
const router = express.Router();

router.get('/register', function(req, res, next) {
    console.log("sedat");
    res.send( { title: 'Express' });
});

 module.exports=router; 
