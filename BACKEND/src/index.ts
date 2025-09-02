import express from "express";
import cors from "cors";
import { shortnerRouter } from "./routes/shortner.routes.js";

export const app = express();

app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, 
}));


app.use("/process", shortnerRouter);

app.listen(8000, () => {
  console.log("🚀 Express running at http://localhost:8000");
});
