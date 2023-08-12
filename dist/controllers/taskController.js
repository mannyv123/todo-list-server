"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.deleteAllTasks = exports.deleteSingleTask = exports.createTask = exports.getTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
//Get all tasks
const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find().sort({ task: "asc" });
        res.status(200).json(tasks);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Server error: ${err}` });
    }
});
exports.getTasks = getTasks;
//Create a single new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: "Missing task information" });
    }
    try {
        const newTask = new Task_1.default({
            task,
            completed: false,
        });
        yield newTask.save();
        res.status(201).json(newTask);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error creating new task: ${err}` });
    }
});
exports.createTask = createTask;
//Delete single task
const deleteSingleTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({ message: "Task ID not provided" });
    }
    try {
        const result = yield Task_1.default.deleteOne({ _id: taskId });
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error deleting task: ${err}` });
    }
});
exports.deleteSingleTask = deleteSingleTask;
//Delete all tasks
const deleteAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Task_1.default.deleteMany();
        res.status(200).json({ message: `Successfully deleted ${result.deletedCount} task(s)` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error deleting tasks: ${err}` });
    }
});
exports.deleteAllTasks = deleteAllTasks;
//Update completion status of a single task
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({ message: "Task ID not provided" });
    }
    try {
        const task = yield Task_1.default.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = yield Task_1.default.findByIdAndUpdate(taskId, { $set: { completed: !task.completed } }, //toggle the "completed" field
        { new: true } //return the updated document
        );
        res.status(200).json(updatedTask);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error updating task: ${err}` });
    }
});
exports.updateTask = updateTask;
