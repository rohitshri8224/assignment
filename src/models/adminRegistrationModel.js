const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({

    Name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin" ,"Student"]
    }
},{timestamps:true})

module.exports=mongoose.model("registration", registrationSchema)
