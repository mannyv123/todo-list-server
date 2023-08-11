import express, { Express } from "express";
const PORT = process.env.PORT || 3001;
const app: Express = express();

import tasksRouter from "./tasksRouter";
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});
