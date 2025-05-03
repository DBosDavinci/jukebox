import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes";
import genreRoutes from "./routes/genreRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
