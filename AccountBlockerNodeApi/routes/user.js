const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', (req, res, next) => {
    
    const user = new User(req.body);
    // hashing User Password
    const doesUserExit =  User.exists({ email: user.email });
    if(doesUserExit)
      res.status(401).json({error:{message:"E-Mail Alredy exists"}});

    user.password =  bcrypt.hashSync(user.password, 8);
    const userPromise = user.save(user);
    
    userPromise.then((data)=>{
        res.status(201).json(data);
      }).catch((err)=>{
        res.status(500).json({
          error:{
            message:err
          }
        }); 
    });

});

// get email and password req.body before give the token and refresh token
router.post('/getToken', (req, res, next) => {
    
    const user = new User(req.body);
    const userPromise = user.save(user);

    userPromise.then((data)=>{
        res.json(data);
      }).catch((err)=>{
        res.json(err);
      });
});

module.exports=router; 
