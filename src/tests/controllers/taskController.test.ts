import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";

const MONGO_TEST = process.env.MONGO_TEST;

if (!MONGO_TEST) {
    throw new Error("No MongoDB test connection url provided.");
}

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(MONGO_TEST);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Task Controller", () => {
    it("should create a new task", async () => {
        const res = await request(app).post("/api/tasks/").send({
            task: "Task 99",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.task).toBe("Task 99");
    });

    it("should get all tasks", async () => {
        const res = await request(app).get("/api/tasks/");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should update task completion", async () => {
        const allTasks = await request(app).get("/api/tasks/");
        const taskId = allTasks.body[0]._id;
        const res = await request(app).put(`/api/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });

    it("should delete a single task", async () => {
        const newTask = await request(app).post("/api/tasks/").send({
            task: "Task 100",
        });
        const taskId = newTask.body._id;
        const res = await request(app).delete(`/api/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(1);
    });

    it("should delete all tasks", async () => {
        const res = await request(app).delete("/api/tasks/deleteAll");
        expect(res.statusCode).toBe(200);
    });
});
