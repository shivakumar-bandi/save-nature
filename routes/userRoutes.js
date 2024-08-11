const express =require('express')
const router =express.Router()
const userController =require('../controllers/userController')


// Route for user registration
router.post('/register',userController.userRegister)
// Route for getting all users
router.get('/all', userController.getAllUsers);
//Route for user login
router.post('/login', userController.userLogin)


module.exports =router;