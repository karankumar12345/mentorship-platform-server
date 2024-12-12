import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user.model";


export const sentToken=async(user,statusCode,res)=>{
    const accessToken=User.SignAccessToken();
    const refreshToken=User.SignRefreshToken();

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        sameSite:"None",
        secure:true,
    })
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        sameSite:"None",
        secure:true,
    })

    res.status(statusCode).json({
        success:true,
        user,
        accessToken,
        refreshToken
    })

}