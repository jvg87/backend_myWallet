import "dotenv/config";
import express from "express";
import "express-async-errors";
import { errorMiddleware } from "../middleware/errorMiddleware";
import { router } from "../routes/routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorMiddleware);

export { app };
