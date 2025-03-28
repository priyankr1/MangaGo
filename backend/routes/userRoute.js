import express from 'express'
import upload from '../middlewares/multer.js'
import { registerUser,loginUser, getProfile, updateProfile } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import { bookMarked, getBookMarked, removeBookMarked } from '../controllers/mangaController.js'
import {rateManga,getRating,getUserRating  } from '../controllers/RatingController.js'



const userRouter =express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-mark',authUser,bookMarked)
userRouter.get('/booked-manga',authUser,getBookMarked)
userRouter.post("/delete-marked",authUser,removeBookMarked)
userRouter.post("/add-rating",authUser,rateManga)
userRouter.get("/get-rating",getRating)
userRouter.get("/user-rating",authUser,getUserRating)

export default userRouter;