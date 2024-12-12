import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";
import { ProfileRouter } from "./routes/profile.controller.js";
import connectDB from "./utils/Db.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ||8000;
app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/v1/user",userRouter)
app.use("/api/v1",ProfileRouter)
connectDB()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
