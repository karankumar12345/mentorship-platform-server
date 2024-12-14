import mongoose from "mongoose";

const ProfileSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
        type: String,
        enum: ['mentor', 'mentee'],
        required: true,
      },
    skills:{
        type:[String],
        required:true

    },
    interests:{
        type:[String],
        required:true,


    },
    bio:{
        type:String,
        required:true,
    }
    
},{timestamps:true})




const Profile=mongoose.model("Profile",ProfileSchema);

export default Profile;

