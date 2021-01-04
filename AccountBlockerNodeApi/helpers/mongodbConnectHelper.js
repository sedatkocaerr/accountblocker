const mongoose = require('mongoose');
console.log(process.env.DB_CON_STR)
module.exports =()=>{

    mongoose.connect(process.env.DB_CON_STR,
        {useNewUrlParser: true,useUnifiedTopology: true});

    mongoose.connection.on('open',()=>{
        console.log("mongoose ayakta");
    });

    mongoose.connection.on('error',(err)=>{
        console.log("mongoose hatalı =>",err);
    });

    mongoose.Promise=global.Promise;
};