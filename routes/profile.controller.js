import express from "express"
import { createOrUpdateProfile, DeleteProfile, fillterProfile, GetAllProfile, getAllProfiles, getProfile, getProfileByUser, GetSingleProfile } from "../controllers/profile.controller.js";
import { isAuthenticated } from "../middleware/auth.js";


export const ProfileRouter=express.Router();


ProfileRouter.post("/create",isAuthenticated,createOrUpdateProfile);  
ProfileRouter.get("/allProfile",isAuthenticated,GetAllProfile);
ProfileRouter.get("/singleProfile/:id",isAuthenticated,GetSingleProfile);
// ProfileRouter.put("/updateProfile/:id", isAuthenticated, UpdateProfile);
ProfileRouter.delete("/deleteProfile/:id",isAuthenticated,DeleteProfile)
ProfileRouter.get("/search",isAuthenticated,fillterProfile)
ProfileRouter.get("allProfile",getAllProfiles)

ProfileRouter.get('/:id', getProfileByUser);

ProfileRouter.get('/:userId', getProfile);