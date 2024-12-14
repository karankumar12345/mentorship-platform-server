import { catchAsync } from "../middleware/catchAsyn.js";
import MentorShipRequest from "../models/mentorship.model.js";
// import Notification from "../models/notification.model.js"; // Import the notification model
import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/user.model.js";
import { fileURLToPath } from "url";
import path from "path";
import Notification from "../models/notif.model.js";

// Use fileURLToPath directly for resolving paths
const templatePath = (fileName) =>
  path.join(path.dirname(fileURLToPath(import.meta.url)), "../mail", fileName);

export const sendMentorshipRequest = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    // Check if a mentorship request already exists
    const existingRequest = await MentorShipRequest.findOne({ sender, receiver })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const senderUser = await User.findById(sender);
    const receiverUser = await User.findById(receiver);

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    // Save the new mentorship request
    const newRequest = new MentorShipRequest({ sender, receiver });
    await newRequest.save();

    // Create a notification for the receiver
    const notification = new Notification({
      userId: receiver,
      content: `${senderUser.name} has sent you a mentorship request.`,
    });
    await notification.save();

    // Optionally, send the notification in real-time via WebSocket (if implemented)
    // io.to(receiver).emit("new-notification", notification);

    res.status(201).json({
      message: "Request sent successfully",
      request: newRequest,
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to send request", error: error.message });
  }
};


export const acceptMentorshipRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Find the mentorship request by ID
    const request = await MentorShipRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    // Check if the request is already accepted or rejected
    if (request.status === "accepted" || request.status === "rejected") {
      return res.status(400).json({ message: "Request already processed" });
    }

    // Update the request status to accepted
    request.status = "accepted";
    await request.save();

    // Fetch sender user details to notify them
    const senderUser = await User.findById(request.sender);
    if (!senderUser) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Create a notification for the sender
    const notification = new Notification({
      userId: request.sender, // Send the notification to the sender
      content: `Your mentorship request to ${request.receiver.name} has been accepted.`,
    });
    await notification.save();

    // Optionally, push this notification to the sender in real-time if you're using WebSockets
    // io.to(request.sender).emit("new-notification", notification);

    res.status(200).json({
      message: "Request accepted successfully",
      request,
      notification,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept request", error: error.message });
  }
};


export const rejectMentorshipRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await MentorShipRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Request rejected successfully", request });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject request", error: error.message });
  }
};

export const removeMentorshipRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await MentorShipRequest.findByIdAndDelete(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove request", error: error.message });
  }
};

export const getMentorshipRequestsForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Fetch requests where the receiver is the userId and the status is 'pending'
    const requests = await MentorShipRequest.find({ receiver: userId, status: "pending" })
      .populate("sender", "name email")
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
};

export const getMentorshipAcceptForUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Fetch requests where the receiver is the userId and the status is 'pending'
    const requests = await MentorShipRequest.find({ receiver: userId, status: "accepted" })
      .populate("sender", "name email")
      .sort({ createdAt: -1 }); // Sort by creation date in descending order

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests", error: error.message });
  }
};





export const getAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the URL parameters

    // Fetch all notifications for the user
    const notifications = await Notification.find({ userId }).populate("userId","name").sort({ createdAt: -1 }); // Sort by date (newest first)

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found for this user" });
    }

    res.status(200).json({ message: "Notifications retrieved successfully", notifications });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve notifications", error: error.message });
  }
};