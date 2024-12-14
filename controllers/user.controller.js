import { catchAsync } from "../middleware/catchAsyn.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sentToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken"

export const RegisterController=catchAsync(async(req,res,next)=>{
   try {
     const {name,email,password}=req.body;
 
     const existUser=await User.findOne({email});
     if(existUser){
         return res.status(400).json({
             success:false,
             message:"User already exist"
         })
     }
     const user=await User.create({
         name,
         email,
         password,
         
     })
     await sentToken(user,200,res)
     res.status(200).json({
         success:true,
         user,
         message:"User created successfully"
     })
 
   } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
    
   }


})



export const LoginController=catchAsync(async(req, res, next)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter email and password"
            })
        }


        const user=await User.findOne({email}).select("+password");
        console.log(user)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        await sentToken(user, 200, res)
        res.status(200).json({
            success:true,
            user,
            message:"User logged in successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})  

// logout controller
export const LogoutController=catchAsync(async(req, res, next)=>{
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//all user controller
export const AllUserController=catchAsync(async(req, res, next)=>{
    try {
        const users=await User.find();
        res.status(200).json({
            success:true,
            users,
            message:"All users fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//single user info
export const getUserInfo = catchAsync(async (req, res, next) => {
    try {
  
   
  
      const user=await User.findOne(req.user._id)
  
  
  
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
  });
  
//single user controller
export const SingleUserController=catchAsync(async(req, res, next)=>{
    try {
        const userId = req.params.id; // Accessing the id from route params
        const user = await User.findById(userId);
        console.log(userId)
console.log(user)    
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            user,
            message:"User fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})






export const updateAccessToken = catchAsync(async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refreshToken;
      console.log("Refresh Token:", refresh_token);
  
      if (!refresh_token) {
        return res.status(400).json({
          success: false,
          message: "Please login to access this resource.",
        });
      }
  
      // Decode and handle errors
      let decoded;
      try {
        decoded = jwt.verify(refresh_token, "karankumar");
        console.log(decoded)
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          console.error("JWT Token Expired:", err.message);
          return res.status(401).json({
            success: false,
            message: "Refresh token expired. Please log in again.",
          });
        }

        console.error("JWT Verification Error:", err.message);
        return res.status(400).json({
          success: false,
          message: "Invalid refresh token.",
        });
      }
  
      if (!decoded || !decoded.id) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired refresh token. Please log in again.",
        });
      }
  
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Generate new tokens
      const accessToken = jwt.sign({ id: user._id }, "karankumar", { expiresIn: "5m" });
      const newRefreshToken = jwt.sign({ id: user._id }, "karankumar", { expiresIn: "3d" });
  
      // Set cookies for the new tokens
      res.cookie("accessToken", accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
  
      res.cookie("refreshToken", newRefreshToken, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
  
      console.log("Access Token refreshed:", accessToken);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      console.error("Error in updateAccessToken:", error.message);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });
  