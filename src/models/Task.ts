import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
