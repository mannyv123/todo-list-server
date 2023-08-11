import express, { Router } from "express";
import * as taskController from "../controllers/taskController";
const router: Router = express.Router();

router.get("/", taskController.getTasks);
router.post("/", taskController.createTask);
router.delete("/deleteAll", taskController.deleteAllTasks);

export default router;
