import { Request, Response } from "express";
import Task from "../models/Task";

interface TaskRequest {
    task: string;
}

//Get all tasks
export const getTasks = async (_req: Request, res: Response) => {
    try {
        const tasks = await Task.find().sort({ task: "asc" });
        res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Server error: ${err}` });
    }
};

//Create a single new task
export const createTask = async (req: Request, res: Response) => {
    const { task } = req.body as TaskRequest;

    if (!task) {
        return res.status(400).json({ message: "Missing task information" });
    }

    try {
        const newTask = new Task({
            task,
            completed: false,
        });

        await newTask.save();

        res.status(201).json(newTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error creating new task: ${err}` });
    }
};

//Delete all tasks
export const deleteAllTasks = async (_req: Request, res: Response) => {
    try {
        const result = await Task.deleteMany();
        res.status(200).json({ message: `Successfully deleted ${result.deletedCount} task(s)` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error deleting tasks: ${err}` });
    }
};

//Update completion status of a single task
export const updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;

    if (!taskId) {
        return res.status(400).json({ message: "Task ID not provided" });
    }

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { completed: !task.completed } }, //toggle the "completed" field
            { new: true } //return the updated document
        );

        res.status(200).json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error updating task: ${err}` });
    }
};
