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
    it("should get all tasks", async () => {
        const res = await request(app).get("/api/tasks/");
        expect(res.statusCode).toBe(200);
    });
});
