import express from "express"
import { AllUserController, getUserInfo, LoginController, LogoutController, RegisterController, SingleUserController, updateAccessToken } from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";



export const userRouter=express.Router();



userRouter.post("/register",RegisterController);
userRouter.post("/login", LoginController);
userRouter.post("/logout", LogoutController);
userRouter.get("/all", AllUserController)
userRouter.get("/user/:id", SingleUserController);
userRouter.get("/me",isAuthenticated,getUserInfo)



userRouter.get("/refreshToken",updateAccessToken)
