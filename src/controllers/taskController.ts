import { Request, Response } from "express";
import Task from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ task: "asc" });
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Server error: ${err}` });
    }
};
