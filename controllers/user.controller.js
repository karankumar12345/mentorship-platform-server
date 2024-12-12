import { catchAsync } from "../middleware/catchAsyn.js";
import User from "../models/user.model.js";
import { sentToken } from "../utils/jwt.js";


export const RegisterController=catchAsync(async(req,res,next)=>{
   try {
     const {name,email,password,role}=req.body;
 
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
         role
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
//single user controller
export const SingleUserController=catchAsync(async(req, res, next)=>{
    try {
        const user=await User.findById(req.params.id);
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

//change user role
export const ChangeUserRoleController=catchAsync(async(req, res, next)=>{
    try {
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        if(user.role==="mentee"){
            user.role="mentor"
        }else{
            user.role="mentee"
        }
        await user.save();
        res.status(200).json({
            success:true,
            user,
            message:"User role changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})