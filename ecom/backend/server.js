//creating a basic server
import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

import dotenv from 'dotenv';
import productRouter from "./routes/productRoute.js";
dotenv.config({ quiet: true });



//Configuration of the App
const app = express()
//start app on 4000
const port = process.env.PORT || 4000

//connect server to db and cloudinary server
connectDb()
connectCloudinary()

//adding the middlewares (To access from anywhere)
app.use(express.json())
app.use(cors())





//adding the api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)


app.get('/',(req,res)=>{
    res.send("API Working!")
})

//start the express server
app.listen(port,()=> console.log(`Server started on PORT ` + port))
