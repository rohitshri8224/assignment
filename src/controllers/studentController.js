const addStudentModel = require("../models/addStudentModel")


const addStudent = async (req, res) => {
    try {
      let data = req.body;
      let userId = req.params.userId;
      let { Name, Subject, Marks } = data;
  if(!data){
    return res.status(400).send({status:false,message:"all fields are mandatory"})
  }
      if(!Name){
        return res.status(400).send({status:false,message:"Name required"})
      }
      if(!Subject){
        return res.status(400).send({status:false,message:"Subject required"})
      }
      if(!Marks){
        return res.status(400).send({status:false,message:"Marks required"})
      }
  
      // check authentication
      if (req.headers.userId != userId) {
        return res.status(400).send({
          status: false,
          message: "User is not authorised to add students",
        });
      }
  
      let isStudentPresent = await addStudentModel
        .findOne({
          Name: Name,
          Subject: Subject,
        })
        .select({ updatedAt: 0, __v: 0, createdAt: 0 });
  
      if (isStudentPresent) {
        isStudentPresent.Marks += Marks;
        await isStudentPresent.save();
        return res.send({ status: true, ["student data"]: isStudentPresent });
      }
  
    //  DataTransfer["userId"] = userId;
  
      let createStudent = await addStudentModel.create(data);
  
      let getStudent = await addStudentModel
        .findOne(createStudent)
        .select({ updatedAt: 0, __v: 0, createdAt: 0 });
      return res.send({ status: true, ["student data"]: getStudent });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

//=================================================view Student================================================

const view = async function(req,res){
    let studentsList = await addStudentModel.find()
    if(!studentsList){
        return res.status(404).send({status:false,message:"notfound"})
    }
    return res.status(200).send({status:true,data:studentsList})
}

//=================================================edit Student==========================================
const edit = async function(req,res){
    let data = req.body
let {Name,Subject} = data
    let studentId = req.params.studentId

    if(!data){
        return res.status(400).send({status:false,message:"all fields are mandatory"})

    }
    let update = await addStudentModel.findByIdAndUpdate({_id:studentId},{Name:Name , Subject:Subject},{new:true})
    return res.status(200).send({status:true,data:update})
}
//=================================================Delete Student======================================================
const deleteStudent = async function (req, res) {
    try {
      let userId = req.params.userId;
      let studentId = req.params.studentId;
  
     
      let student = await addStudentModel.findOne({
        _id: studentId,
      });
      if (!student) {
        return res.send({
          status: false,
          message: "Student with this StudentId does not exist",
        });
      }
      if (req.headers.userId != userId) {
        return res.status(400).send({
          status: false,
          message: "User is not authorised to add students",
        });
      }
      let deletedData = await addStudentModel.findOneAndUpdate(studentId, {
        isDeleted: true,
      });
      return res.status(200).send({
        status: false,
        message: "Student's Data is deleted",
      });
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };
  

module.exports = {addStudent,view,edit,deleteStudent}