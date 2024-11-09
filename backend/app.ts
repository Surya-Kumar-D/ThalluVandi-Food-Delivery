import express, {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import itemsRouter from "./routes/itemsRoutes.ts";
import usersRouter from "./routes/usersRoutes.ts";
import cors from "cors";
import AppError from "./utils/appError.ts";

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use(cors());
const errorHandler: ErrorRequestHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

// Use the error handler

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/users", usersRouter);
app.use(errorHandler);
export default app;
