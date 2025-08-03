import mongoose from "mongoose";


//connect mongoose from the mongo db atlas server 
//use the variable in env file
const connectDb = async() => {

    mongoose.connection.on('connected',()=> {
        console.log('DB Connected!')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/smartronics`)
}

export default connectDb