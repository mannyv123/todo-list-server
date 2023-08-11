import express, { Router } from "express";
import * as taskController from "../controllers/taskController";
const router: Router = express.Router();

router.get("/", taskController.getTasks);

export default router;
