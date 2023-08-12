import express, { Router } from "express";
import * as taskController from "../controllers/taskController";
const router: Router = express.Router();

router.get("/", taskController.getTasks); //get all tasks
router.post("/", taskController.createTask); //create new task
router.put("/:id", taskController.updateTask); //update completion status of single task
router.delete("/deleteAll", taskController.deleteAllTasks); //delete all tasks
router.delete("/:id", taskController.deleteSingleTask); //delete single task

export default router;
