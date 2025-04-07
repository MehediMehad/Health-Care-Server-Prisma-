import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./app/modules/User/user.routes";

const app: Application = express();

app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded HTML form data
app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow requests from frontend
    credentials: true, // 👉 Allow sending cookies/credentials
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello from the Health Care Server!",
  });
});

app.use("/api/v1/user", userRoute);
export default app;