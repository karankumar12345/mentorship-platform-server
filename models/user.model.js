import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config();

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["mentor","mentee"],
        required:true,

    }
},{timestamps:true})


userSchema.methods.comparePassword=async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password)

}
userSchema.methods.SignAccessToken=function(){
    const accessToken=jwt.sign(
        {id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
    )
    return accessToken;
}
userSchema.methods.SignRefreshToken=function(){
    const refreshToken=jwt.sign(
        {id:this._id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
    )
    return refreshToken;
}


const User=mongoose.model("User",userSchema)
export default User;
