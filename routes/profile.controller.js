import express from "express"
import { createProfile, DeleteProfile, fillterProfile, GetAllProfile, GetSingleProfile, UpdateProfile } from "../controllers/profile.controller.js";
import { isAuthenticated } from "../middleware/auth.js";


export const ProfileRouter=express.Router();

ProfileRouter.post("/create",isAuthenticated,createProfile);  
ProfileRouter.get("/allProfile",isAuthenticated,GetAllProfile);
ProfileRouter.get("/singleProfile/:id",isAuthenticated,GetSingleProfile);
ProfileRouter.put("/updateProfile/:id", isAuthenticated, UpdateProfile);
ProfileRouter.delete("/deleteProfile",isAuthenticated,DeleteProfile)
ProfileRouter.get("/search",isAuthenticated,fillterProfile)



