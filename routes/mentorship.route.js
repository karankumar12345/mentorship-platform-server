
import express from "express";
import {
  sendMentorshipRequest,
  acceptMentorshipRequest,
  rejectMentorshipRequest,
  removeMentorshipRequest,
  getMentorshipRequestsForUser,
  getAllNotifications,
} from "../controllers/mentorship.controller.js";

const Mentorouter = express.Router();

Mentorouter.post("/createRequest", sendMentorshipRequest);
Mentorouter.put("/request/accept",  acceptMentorshipRequest);
Mentorouter.put("/request/reject",  rejectMentorshipRequest);
Mentorouter.delete("/request/remove",  removeMentorshipRequest);
Mentorouter.get("/getAllRequests/:id",  getMentorshipRequestsForUser);
Mentorouter.get("/getAllMessage/:userId",getAllNotifications)
export default Mentorouter;
