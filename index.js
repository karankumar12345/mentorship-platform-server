import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";
import { ProfileRouter } from "./routes/profile.controller.js";
import connectDB from "./utils/Db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Mentorouter from "./routes/mentorship.route.js";
// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ||8000;
app.use(express.json({ limit: "50mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware for cookie parsing
app.use(cookieParser());
console.log(process.env.ORIGIN);
app.use(
    cors({
      origin: [process.env.ORIGIN],
      credentials: true,
    })
  );
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/v1/user",userRouter)
app.use("/api/v1/profile",ProfileRouter)
app.use("/api/v1/mentorship",Mentorouter);
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
