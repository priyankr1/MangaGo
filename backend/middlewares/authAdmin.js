import jwt from 'jsonwebtoken'

const authAdmin=async(req,res,next)=>{
    try {
        console.log("header in req"+req.headers)
        const atoken=req.headers?.atoken
        console.log(atoken)
        console.log("hello")
        if(!atoken){
            return res.json({success:false,message:"Unautharized user"})
        }
        const token_decode= jwt.verify(atoken,process.env.JWT_SECRET)
         
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PAS){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        next()
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:error.message})
    }
}

export default authAdmin