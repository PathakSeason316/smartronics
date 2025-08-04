import jwt from 'jsonwebtoken'


//middleware for admin auth to add products etc
const adminAuth = async(req,res,next) => {
    try{
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized to Login!"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        //if token decoded is combination of email and password (error)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized to Login!"})
        }
        next()
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default adminAuth