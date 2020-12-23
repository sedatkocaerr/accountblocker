const mongoose = require('mongoose');
console.log(process.env.DB_CON_STR)
module.exports =()=>{

    mongoose.connect(process.env.DB_CON_STR,
        {useNewUrlParser: true});

    mongoose.connection.on('open',()=>{
        console.log("mongoose ayakta");
    });

    mongoose.connection.on('error',(err)=>{
        console.log("mongoose hatalı =>",err);
    });

    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

    mongoose.Promise=global.Promise;
};