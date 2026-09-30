import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoute from "./routes/auth";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", authRoute);

connectDB();
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
