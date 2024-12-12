import express from "express"
import { AllUserController, ChangeUserRoleController, LoginController, LogoutController, RegisterController, SingleUserController } from "../controllers/user.controller";



const userRouter=express.Router();



userRouter.post("/register",RegisterController);
userRouter.post("/login", LoginController);
userRouter.get("/logout", LogoutController);
userRouter.get("/all", AllUserController)
userRouter.get("/user/:id", SingleUserController);
userRouter.put("/changeUserRole/:id", ChangeUserRoleController);
