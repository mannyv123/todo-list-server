import express, { Express } from "express";
import mongoose from "mongoose";
import tasksRouter from "./tasksRouter";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO;
const app: Express = express();

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

app.use("/tasks", tasksRouter);
