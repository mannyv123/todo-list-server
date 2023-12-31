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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../../app"));
const MONGO_TEST = process.env.MONGO_TEST;
if (!MONGO_TEST) {
    throw new Error("No MongoDB test connection url provided.");
}
/* Connecting to the database before each test. */
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(MONGO_TEST);
}));
/* Closing database connection after each test. */
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("Task Controller", () => {
    it("should create a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/tasks/").send({
            task: "Task 99",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.task).toBe("Task 99");
    }));
    it("should get all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).get("/api/tasks/");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    it("should update task completion", () => __awaiter(void 0, void 0, void 0, function* () {
        const allTasks = yield (0, supertest_1.default)(app_1.default).get("/api/tasks/");
        const taskId = allTasks.body[0]._id;
        const res = yield (0, supertest_1.default)(app_1.default).put(`/api/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    }));
    it("should delete a single task", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTask = yield (0, supertest_1.default)(app_1.default).post("/api/tasks/").send({
            task: "Task 100",
        });
        const taskId = newTask.body._id;
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/api/tasks/${taskId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(1);
    }));
    it("should delete all tasks", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete("/api/tasks/deleteAll");
        expect(res.statusCode).toBe(200);
    }));
});
