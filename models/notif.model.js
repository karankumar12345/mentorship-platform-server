import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    
},{timestamps:true});

 const Notification = mongoose.model('Notification', notificationSchema);

 export default Notification;