import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from '../config/cloudinary.js'

const registerUser= async(req,res)=>{
    try {
        const {name,email,password}=req.body
        
        if(!name||!email||!password){
            return res.json({success:false,message:'Complete the sign-in Form'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Invalid email '})
        }
        if(password.length<8){
            return res.json({success:false,message:'Create Strong Password'})
        }
        const userData={
            name,
            email,
            password
        }
        const newUser=new userModel(userData)
        const user=await newUser.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({success:true,token:token})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Enter all details' }); 
        }

        const user = await userModel.findOne({ email }).select("password");
        console.log(user)
        if (!user) {
            return res.json({ success: false, message: 'User does not exist' }); 
        }
console.log(password,user.password);
        const pasMatch = await bcrypt.compare(password, user.password);
        if (!pasMatch) {
            return res.json({ success: false, message: 'Invalid Credentials' }); 
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.json({ success: true, token: token }); 

    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message }); 
    }
};

const getProfile=async(req,res)=>{
    try {
        const {userId}=req.body
        if(!userId){
            return res.json({success:false,message:"No user"})
        }
        console.log(userId);    
        const userData= await userModel.findById(userId);
        return res.json({success:true,userData})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

const updateProfile=async(req,res)=>{
    try {
        const {userId,name,address,phone}=req.body
        console.log(req.file)
    const image=req.file
    if(!name||!address||!phone){
        return res.json({success:false,message:'No update Found'})
    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address)})

    if(image){
        const imageUpload=await cloudinary.uploader.upload(image.path,{resource_type:'image'});
        const imageUrl=imageUpload.secure_url;
        await userModel.findByIdAndUpdate(userId,{image:imageUrl})
    }
    return res.json({success:true,message:"Profile Updated"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})       
    }
    
}

export {registerUser,loginUser,getProfile,updateProfile}
