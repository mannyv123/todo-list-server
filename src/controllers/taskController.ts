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

export const createTask = async (req: Request, res: Response) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ message: "Missing task information" });
    }

    try {
        const newTask = new Task({
            task,
            completed: false,
        });

        await newTask.save();

        res.status(201).json({ message: `New task created: ${newTask}` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error creating new task: ${err}` });
    }
};
