"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
const tasksRouter_1 = __importDefault(require("./tasksRouter"));
app.use("/tasks", tasksRouter_1.default);
app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
});
