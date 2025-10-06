import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🎶 NivaBand 888 backend is live!" });
});

app.use("/api/generate", generateRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ NivaBand 888 running on ${PORT}`));
