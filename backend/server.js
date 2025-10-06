import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import soundRoute from "./routes/soundRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sound", soundRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
