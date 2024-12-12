import mongoose from "mongoose"
const uri=process.env.DB_URL;
if(!uri){
    throw new Error("DB_URL is not defined")
}
const connectDB=async()=>{
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }catch(error){
        console.log("Error connecting to MongoDB",error.message)
    }
}
export default connectDB;