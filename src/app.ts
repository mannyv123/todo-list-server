import express, { Express } from "express";
import tasksRouter from "./routes/tasksRouter";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/tasks", tasksRouter);

export default app;
