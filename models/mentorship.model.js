import mongoose from "mongoose";
// import { catchAsync } from "../middleware/catchAsyn";

const mentorshipRequestSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
    },{timestamps:true})

    const MentorShipRequest=mongoose.model("MentorShipRequest",mentorshipRequestSchema);
    export default MentorShipRequest;