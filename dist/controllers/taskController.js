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
exports.deleteAllTasks = exports.createTask = exports.getTasks = void 0;
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
        res.status(201).json({ message: `New task created: ${newTask}` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error creating new task: ${err}` });
    }
});
exports.createTask = createTask;
//Delete all tasks
const deleteAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Task_1.default.deleteMany();
        res.json({ message: `Successfully deleted ${result.deletedCount} tasks(s)` });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Error deleting tasks: ${err}` });
    }
});
exports.deleteAllTasks = deleteAllTasks;
