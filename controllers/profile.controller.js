import { catchAsync } from "../middleware/catchAsyn.js";
import Profile from "../models/Profile.model.js";
import User from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createOrUpdateProfile = catchAsync(async (req, res, next) => {
    const { role, skills, interests, bio ,user} = req.body;

    try {
      let profile = await Profile.findOne({ user });
      const existingUser = await User.findById(user);
      console.log("karan",existingUser)


      if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (profile) {
        // If the profile exists, update it
        profile.skills = skills;
        profile.interests = interests;
        profile.bio = bio;
  
        await profile.save();
        return res.status(200).json({ message: 'Profile updated successfully', profile });
      }
  
      // If no profile exists, create a new one
      profile = new Profile({
        user: user,
        role,
        skills,
        interests,
        bio,
      });
  
      await profile.save();
      return res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//Get All Profile


export const GetAllProfile=catchAsync(async(req,res,next)=>{
    try {
        const Profiles=await Profile.find().populate("user","name email");
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

//getprofilebyuser
export const getProfileByUser = catchAsync(async (req, res, next) => {
    try {
      const id = req.params.id; // Accessing the id from route params
      const profile = await Profile.findOne({ user: id });
  
      if (!profile) {
        return res.status(400).json({
          success: false,
          message: "Profile not found",
        });
      }
  
      res.status(200).json({
        success: true,
        profile,
        message: "Profile fetched successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });


//get single Profile
export const GetSingleProfile=catchAsync(async(req, res, next)=>{
    try {
        const profile=await Profile.findById(req.params.id).populate("sender", "name email");
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

//get all profile

export const getAllProfiles = async (req, res) => {
    try {
      // Fetch all profiles from the database
      const profiles = await Profile.find().populate('user', "name email")  ;
  
      // Return the profiles data
      res.status(200).json({
        success: true,
        profiles,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching profiles',
        error: error.message, // Send the error message for easier debugging
      });
    }
  };


export const getProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      
  console.log(userId)
      // Fetch the profile for the given user ID
      const profile = await Profile.findOne({user: userId }).populate('user',"name email")  ;
  

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found',
        });
      }
  
      // Return the profile data
      res.status(200).json({
        success: true,
        profile,
        
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message, // Send the error message for easier debugging
      });
    }
  };
  
//delete Profile
export const DeleteProfile=catchAsync(async(req, res, next)=>{
    try {
        const id=req.params.id;
        const profile=await Profile.findOne({user:id});
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile not found"
            })
        }
        await profile.deleteOne();
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