import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import log from "@config/winston";
import AppError from "@utils/appError.util";
import hpp from "hpp";
import errorhandler from "@middleware/error/errorhandler";
import dbConnection from "@src/database/connection";
dotenv.config();

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

dbConnection();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  hpp({
    whitelist: ["", ""],
  })
);
app.use("/api", limiter);
app.use(morgan("combined", { stream: log }));
app.use("/assets", express.static("assets"));
app.get("*", (req: Request, res: Response, next: NextFunction) =>
  next(new AppError(`Cant find ${req.originalUrl}`, 404))
);
app.use((err: AppError, req: Request, res: Response) => {
  errorhandler(err, req, res);
});

export default app;
