import { catchAsync } from "../middleware/catchAsyn.js";
import Profile from "../models/Profile.model.js";
import User from "../models/user.model.js";

export const createProfile = catchAsync(async (req, res, next) => {
  try {
    const { userId, skills, interests, bio } = req.body;

    if (!userId || !skills || !interests || !bio) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const profile = await Profile.findOne({ userId });
    if (profile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }
    const newProfile = new Profile({
      userId,
      skills,
      interests,
      bio,
    });
    await newProfile.save();
    res.status(200).json({
      success: true,
      profile: newProfile,

      message: "Profile created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


//Get All Profile


export const GetAllProfile=catchAsync(async(req,res,next)=>{
    try {
        const Profiles=await Profile.find();
        res.status(200).json({
            success:true,
            Profiles,
            message:"All Profiles fetched successfully"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
})

//update Profile
export const UpdateProfile=catchAsync(async(req,res,next)=>{
    try {
        const profile=await Profile.findById(req.params.id);
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }
        const {skills, interests, bio}=req.body;
        if(skills){
            profile.skills=skills;
        }
        if(interests){
            profile.interests=interests;
        }
        if(bio){
            profile.bio=bio;
        }
        await profile.save();
        res.status(200).json({
            success:true,
            profile,
            message:"Profile updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//get single Profile
export const GetSingleProfile=catchAsync(async(req, res, next)=>{
    try {
        const profile=await Profile.findById(req.params.id);
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }
        res.status(200).json({
            success:true,
            profile,
            message:"Profile fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

//delete Profile
export const DeleteProfile=catchAsync(async(req, res, next)=>{
    try {
        const profile=await Profile.findById(req.params.id);
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }
        await profile.remove();
        res.status(200).json({
            success:true,
            message:"Profile deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


//filter role skills interset


export const fillterProfile=catchAsync(async(req,res,next)=>{
    const {role,skills,interests}=req.query;
    try {
        
        const query={};
        if (role) query.role = role; // Filter by role (mentor or mentee)
        if (skills) query.skills = { $in: skills.split(",") }; // Match profiles with any of the provided skills
        if (interests) query.interests = { $in: interests.split(",") }; // Match profiles with any of the provided interests

        // Find profiles that match the query
        const profiles = await Profile.find(query);

        if (profiles.length === 0) {
            return res.status(404).json({ message: "No profiles found matching the criteria" });
        }

        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })

        
    }
})