const adminModel = require("../models/adminRegistrationModel")
const jwt = require("jsonwebtoken")


const registration = async function(req,res){
    try{
        let data = req.body
        if(!data){
            return res.status(400).send({status:false,message:"all fields are mandatory"})
        }
        let savedData = await adminModel.create(data)
        return res.status(201).send({status:true,data:savedData})
    }catch(error){
        return res.status(500).send({status:false,message:error})
    }
}

const login = async function (req, res) {
    try{
       let emailId = req.body.emailId
       let password = req.body.password
       let loginUser = await adminModel.findOne({ email: emailId, password: password })
       if (!loginUser || !(loginUser.emailId == emailId && loginUser.password == password)) {
           return res.status(401).send({  status: false, msg: "invalid Login details" })
       }
       let jwtToken = jwt.sign(
           {
               loginId: loginUser._id.toString(),
               adminStatus: "active",
               app: "student Details"
           },
           "stusents collection@secret key"
    
       )
    
        res.status(200).send({ status: true , data:jwtToken})
          }
          catch(err){
             return res.status(500).send({ status: false, msg:err.message})
          } 
    }




const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });
    token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "Veryverysecretkey", (err, decodedToken) => {
      if (err) {
        let message =
          err.message === "jwt expired"
            ? "token is expired"
            : "token is valid";
        return res.status(401).send({ status: false, message: message });
      }
      req.headers = decodedToken;
      next();
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};



    module.exports = {registration,login , authentication}