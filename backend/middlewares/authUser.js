import jwt from 'jsonwebtoken'

const authUser=async(req,res,next)=>{
    try {
        const token=req.headers?.token;
        if(!token){
            return res.json({success:false,message:'Unauthorized User'})
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next()
    } catch (error) {
        console.log("auth error",error.message)
        return res.json({success:false,message:error.message+"Hello"})   
    }
}

export default authUser