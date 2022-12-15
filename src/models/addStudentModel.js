const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;


const addStudentSchema = new mongoose.Schema(
    {
      userId: {
        type: ObjectId,
        // required: true,
        ref: "user",
      },
      Name: {
        type: String,
        required: true,
        trim: true,
      },
      Subject: {
        type: String,
        required: true,
      },
      Marks: {
        type: Number,
        required: true,
      },
      isDeleted :{
        type : Boolean,
        default : false
      }
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("addStudent",addStudentSchema)