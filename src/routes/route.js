const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController")
const adminController = require("../controllers/adminController")
const mid = require("../middleware/auth")



router.post('/registration',adminController.registration)
router.post('/login',adminController.login)
router.post('/addStudent',studentController.addStudent)
//router.get('/studentListByFilter',studentController.studentListByFilter)
router.get('/view',studentController.view)
router.post('/edit/:studentId',studentController.edit)

router.delete('/student/:userId/:studentId',studentController.deleteStudent)


module.exports = router;