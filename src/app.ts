import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./app/modules/User/user.routes";
import { AdminRoutes } from "./app/modules/Admin/admin.routes";

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

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", AdminRoutes);
export default app;