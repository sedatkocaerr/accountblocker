const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userId:Schema.Types.ObjectId,
    name:{
        type:String,
        required:[true,'Name is required']
    },
    surname:{
        type:String,
        required:[true,'Surname is required']
    },
    email:{
        type:String,
        required:[true,'E- Mail is required'],
        
    },
    password:String,
    createdDate:{
        type:Date,
        default:Date.now
    }

    

})

module.exports = mongoose.model('user',userSchema);