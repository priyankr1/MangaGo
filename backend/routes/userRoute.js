import express from 'express'
import upload from '../middlewares/multer.js'
import { registerUser,loginUser, getProfile, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'



const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)


export default userRouter;