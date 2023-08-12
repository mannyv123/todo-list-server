import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO;

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
