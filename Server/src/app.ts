import express from "express";
import cors from "cors";
import v1Router from "./routes/routes";
import cookieParser from "cookie-parser";
import ApiError from "./utils/ApiError";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import httpStatus from "http-status";
import path from "path";
import fs from "fs";
const app = express();

app.use(
  cors({
    origin: [
      "https://placement-quiz-practice-portal.netlify.app",
      "https://placement-quiz-practice-admin.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", v1Router);

app.get("/", (_req, res) => {
  res.send("community api route");
});

app.use((req) => {
  throw new ApiError(
    httpStatus.NOT_FOUND,
    `${req.method} ${req.originalUrl} not found`
  );
});

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

app.use("/uploads", express.static(uploadsPath));

app.use(globalErrorHandler);


export default app;
