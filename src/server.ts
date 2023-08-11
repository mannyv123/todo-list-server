import express, { Express } from "express";
import mongoose from "mongoose";
import tasksRouter from "./routes/tasksRouter";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();

const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO;

//Middleware
app.use(express.json());
app.use(cors());

//Function to connect to DB and start server
async function startServer() {
    if (!MONGO) {
        throw new Error("No MongoDB connection url provided.");
    }

    try {
        await mongoose.connect(MONGO);
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Express server listening on port: ${PORT}`);
        });
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
    }
}

startServer();

//Routes
app.use("/api/tasks", tasksRouter);
