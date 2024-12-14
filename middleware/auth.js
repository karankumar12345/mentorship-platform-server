
import jwt from "jsonwebtoken"



import dotenv from "dotenv"
import { catchAsync } from "./catchAsyn.js"
import User from "../models/user.model.js"
dotenv.config()
export const isAuthenticated=catchAsync(async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource",
            });
        }
        const decodedData=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET||"karankumar");


        const user=await User.findById(decodedData.id);    
       
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        console.log("Authenticated User:", req.user);

        next();

    } catch (error) {

   if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                success: false,
                message: "Token expired, please refresh your token",
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV !== "production" ? error.message : undefined,
        });
    }
})