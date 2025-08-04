import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


//create token when user login
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// function for user login
const loginUser = async(req, res) => {
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success:false, message:"User doesn't exist!"})
        }

        //compare if the password matches the encrypted pw
        const isMatch = await bcrypt.compare(password, user.password);

        //create token if matched
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials. Try Again!"})
            
        }

    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }

}


// function for user registration
const registerUser = async(req, res) => {
    try{
        const {name, email, password} = req.body;

        //check if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists!"})
        }

        //validate email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        //validate pasword
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //hashing user password using bcrypt salt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        //create a userModel for the registering user    
        const newUser = new userModel({
            name,email,password:hashedPassword
        })

        //save user id
        const user = await newUser.save()

        //create jwt token
        const token = createToken(user._id)

        res.json({success:true, token})


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}



// function for admin login
const adminLogin = async(req, res) => {
    try{
        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials!"})
        }
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export {loginUser,registerUser, adminLogin}